import "@stdlib/deploy";
import "./event_nft_collection.tact";

message CreateEvent {
    organizer_address: Address;
    ticket_price: Int as coins;
    event_content: Cell;
}

message SetRoyaltyNumerator {
    royalty_numerator: Int as uint16;
}

message SetEventCreationFee {
    event_creation_fee: Int as coins;
}
message TransferOwnership {
    new_tona_owner_address: Address;
}

struct TonAState{
    tona_event_tickets_type: Int as uint64;
    tona_owner_address: Address;
    total_events: Int as uint64;
    event_creation_fee: Int as coins;
    royalty_numerator: Int as uint16;
    royalty_denominator: Int as uint16;
}

contract TonA with Deployable {
    tona_event_tickets_type: Int as uint64;
    tona_owner_address: Address;
    total_events: Int as uint64;
    event_creation_fee: Int as coins;
    royalty_numerator: Int as uint16;
    royalty_denominator: Int as uint16;

    init(tona_event_tickets_type: Int, tona_owner_address: Address) {
        self.tona_event_tickets_type = tona_event_tickets_type;
        self.total_events = 0;
        self.tona_owner_address = tona_owner_address;
        self.event_creation_fee = 1000000; // 0.001 TON
        self.royalty_numerator = 500;   // 5%
        self.royalty_denominator = 10000; // 100%
    }

    receive (msg: CreateEvent) {
        let ctx: Context = context(); // get sender Info
        let msgValue: Int = self.msgValue(ctx.value);
        let event_id = self.total_events;
        let nft_collection_init: StateInit = self.getEventNftCollectionInit(event_id);
        self.total_events = self.total_events + 1;
        if (self.event_creation_fee > 0) {
            // Ensure that msgValue is sufficient to cover the event creation fee
            require(msgValue >= self.event_creation_fee, "Insufficient funds for event creation fee");
            msgValue = msgValue - self.event_creation_fee;

            // Send event creation fee to tona_owner_address
            send(SendParameters{
                to: self.tona_owner_address,
                value: self.event_creation_fee,
                bounce: false,
                mode: SendPayGasSeparately,
                body: beginCell().endCell() // Empty body
            });
        }
        send(SendParameters{
                to: contractAddress(nft_collection_init), 
                value: msgValue,
                bounce: false,
                mode: SendIgnoreErrors,
                body: CreateEventNftCollection {
                    event_id: event_id,
                    organizer_address: msg.organizer_address,
                    collection_content: msg.event_content,
                    ticket_price: msg.ticket_price,
                    royalty_numerator: self.royalty_numerator,
                    royalty_denominator: self.royalty_denominator
                }.toCell(),
                code: nft_collection_init.code,
                data: nft_collection_init.data
            });

    }

    receive(msg: SetRoyaltyNumerator) {
        require(sender() == self.tona_owner_address, "not tona owner");
        let royalty_numerator = msg.royalty_numerator;
        require(royalty_numerator < self.royalty_denominator, "royalty numerator exceeds max");
        self.royalty_numerator = royalty_numerator
    }

    receive(msg: TransferOwnership) {
        require(sender() == self.tona_owner_address, "not tona owner");
        self.tona_owner_address = msg.new_tona_owner_address;
    }
    
    fun msgValue(value: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - value;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        return value - (storageFee + gasConsumption);
    }

    get fun get_nft_collection_address(event_id: Int): Address?{
        let initCode: StateInit = self.getEventNftCollectionInit(event_id);
        return contractAddress(initCode);
    }

    get fun getEventNftCollectionInit(event_id: Int): StateInit {
        return initOf EventNftCollection(event_id, myAddress());
    }

    get fun state(): TonAState {
        return TonAState{
            tona_event_tickets_type: self.tona_event_tickets_type,
            tona_owner_address: self.tona_owner_address,
            total_events: self.total_events,
            event_creation_fee: self.event_creation_fee,
            royalty_numerator: self.royalty_numerator,
            royalty_denominator: self.royalty_denominator
        }
    }

    get fun total_fee_for_create_event(): Int {
        return minTonsForStorage + gasConsumption + self.event_creation_fee;
    }

}
