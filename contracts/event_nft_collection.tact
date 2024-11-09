import "./message.tact";
import "@stdlib/deploy";

const minTonsForStorage: Int = ton("0.02");
const gasConsumption: Int = ton("0.02");

message CreateEventNftCollection {
    event_id: Int as uint64;
    organizer_address: Address;
    collection_content: Cell;
    ticket_price: Int as coins;
    royalty_numerator: Int as uint16;
    royalty_denominator: Int as uint16;
}

message SetTicketPrice {
    ticket_price: Int as coins;
}

message Mint {
    to: Address;
    individual_content: Cell?;
}

contract EventNftCollection {
    next_item_index: Int as uint32 = 0;

    event_id: Int as uint256;
    tona_address: Address;
    organizer_address: Address?;
    ticket_price: Int?;
    collection_content: Cell?;
    royalty_params: RoyaltyParams?;

    init(event_id: Int, tona_address: Address){
        self.event_id = event_id;
        self.tona_address = tona_address;
    }

    receive(msg: CreateEventNftCollection) {
        require(sender() == self.tona_address, "not tona");
        self.event_id = msg.event_id;
        self.organizer_address = msg.organizer_address;
        self.collection_content = msg.collection_content; 
        self.ticket_price = msg.ticket_price;
        self.royalty_params = RoyaltyParams {
            numerator: msg.royalty_numerator,
            denominator: msg.royalty_denominator, 
            destination: self.tona_address
        };
        // Refund unused gas to the sender
        let ctx: Context = context(); // Get the context with sender information
        let msgValue: Int = self.msgValue(ctx.value);
        send(SendParameters{
            to: ctx.sender,
            value: msgValue,
            mode: SendPayGasSeparately,
            body: beginCell().endCell()
        });
    }

    receive(msg: SetTicketPrice) {
        require(sender() == self.organizer_address, "not organizer");
        self.ticket_price = msg.ticket_price;
    }

    receive(msg: Mint){
        let ctx: Context = context(); // get sender Info
        let msgValue: Int = ctx.value;
        let tonBalanceBeforeMsg: Int = myBalance() - msgValue;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        msgValue = msgValue - (storageFee + gasConsumption);
        
        // charge ticket price to organizer
        let ticketPrice: Int = self.ticket_price!!;
        if (ticketPrice > 0) {
            require(msgValue >= ticketPrice, "insufficient funds for ticket price");
            send(SendParameters{
                to: self.organizer_address!!,
                value: ticketPrice,
                bounce: true,
                mode: SendPayGasSeparately,
                body: beginCell().endCell()
            });
            msgValue = msgValue - ticketPrice;
        }
        // mint ticket
        let individual_content: Cell = self.collection_content!!;  // Initializing with a default value
        if (msg.individual_content != null) {
            individual_content = msg.individual_content!!;
        }
        self.mint(msg.to, msgValue, individual_content);

        emit(LogEventMintRecord{ minter: sender(), item_id: self.next_item_index, generate_number: nativeRandom() }.toCell());
    }

    // ===== Private Methods ===== //
    fun mint(sender: Address, msgValue: Int, individual_content: Cell) {
        require(self.next_item_index >= 0, "non-sequential NFTs");
        let nft_init: StateInit = self.getTicketNftItemInit(self.next_item_index);
        send(SendParameters{
                to: contractAddress(nft_init), 
                value: msgValue, 
                bounce: false,
                mode: SendIgnoreErrors,
                body: Transfer {
                    query_id: 0,
                    new_owner: sender,
                    response_destination: self.organizer_address,
                    custom_payload: individual_content,
                    forward_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                code: nft_init.code,
                data: nft_init.data
            });
        // dump(self.next_item_index); // Reference at: https://tact-by-example.org/03-emit
        self.next_item_index = self.next_item_index + 1;
    }

    receive(msg: GetRoyaltyParams) {   
        let ctx: Context = context(); // get sender Info
        send(SendParameters{
            to: ctx.sender,
            value: 0,
            mode: 64, 
            bounce: false,
            body: ReportRoyaltyParams {
                query_id: msg.query_id,
                numerator:  (self.royalty_params!!).numerator,
                denominator: (self.royalty_params!!).denominator,
                destination: self.tona_address
            }.toCell()
        });
    }

    fun msgValue(value: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - value;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        return value - (storageFee + gasConsumption);
    }

    // ------------------ Get Function  ------------------ //
    get fun get_collection_data(): CollectionData {     
        return CollectionData{
            next_item_index: self.next_item_index, 
            collection_content: self.collection_content!!,
            owner_address: self.organizer_address!!
        };
    }

    get fun get_nft_address_by_index(item_index: Int): Address?{      
        let initCode: StateInit = self.getTicketNftItemInit(item_index);
        return contractAddress(initCode);
    }

    get fun getTicketNftItemInit(item_index: Int): StateInit {
        return initOf TicketNftItem(myAddress(), item_index);
    }
    
    get fun get_nft_content(index: Int, individual_content: Cell): Cell { 
        let b: StringBuilder = beginString();
        let ic: String = individual_content.asSlice().asString();
        b.append(ic);
        return b.toCell();
    }

    get fun royalty_params(): RoyaltyParams {
        return self.royalty_params!!;
    }

    get fun mint_fee(): Int {
        return self.ticket_price!! + minTonsForStorage + 3 * gasConsumption;
    }
}

contract TicketNftItem {
    collection_address: Address;
    item_index: Int; 
    is_initialized: Bool;

    owner: Address?;
    individual_content: Cell?;

    init(collection_address: Address, item_index: Int){
        require(sender() == collection_address, "not from collection");
        self.collection_address = collection_address;
        self.item_index = item_index;
        self.is_initialized = false;
    }

    receive(msg: Transfer){
        let ctx: Context = context(); // Reference: https://docs.tact-lang.org/language/ref/common#context
        let msgValue: Int = self.msgValue(ctx.value);
        
        if (self.is_initialized == false) {  // Initial Transfer, aka the "Minting" of the NFT
            require(ctx.sender == self.collection_address, "initialized tx need from collection");
            self.is_initialized = true;
            self.owner = msg.new_owner;
            self.individual_content = msg.custom_payload;
            send(SendParameters{
                to: msg.response_destination!!,
                value: msgValue,
                mode: SendPayGasSeparately,
                body: Excesses { query_id: msg.query_id }.toCell()
            });
        } else {
            require(ctx.sender == self.owner!!, "not owner");
            self.owner = msg.new_owner;  // change current owner to the new_owner
            if (msg.forward_amount > 0) {
                send(SendParameters{
                    to: msg.new_owner,
                    value: msg.forward_amount,
                    mode:  SendPayGasSeparately, 
                    bounce: true,
                    body: OwnershipAssigned{
                        query_id: msg.query_id,
                        prev_owner: ctx.sender,
                        forward_payload: msg.forward_payload
                    }.toCell()
                }); 
            }

            msgValue = msgValue - ctx.readForwardFee(); 
            if (msg.response_destination != null) { 
                send(SendParameters{ 
                    to: msg.response_destination!!,
                    value: msgValue - msg.forward_amount,
                    mode: SendPayGasSeparately,
                    bounce: true,
                    body: Excesses { query_id: msg.query_id }.toCell()
                });
            } 
        }
    }

    receive(msg: GetStaticData){ 
        let ctx: Context = context();
        send(SendParameters {
            to: ctx.sender,
            value: 0,
            mode: 64,  // (return msg amount except gas fees) 
            bounce: true,
            body: ReportStaticData{
                query_id: msg.query_id,
                index_id: self.item_index,
                collection: self.collection_address
            }.toCell()
        });
    }

    fun msgValue(value: Int): Int {
        let tonBalanceBeforeMsg: Int = myBalance() - value;
        let storageFee: Int = minTonsForStorage - min(tonBalanceBeforeMsg, minTonsForStorage);
        return value - (storageFee + gasConsumption);
    }

    // --------- Get Function  --------- //
    get fun get_nft_data(): GetNftData {
        return GetNftData {
            is_initialized: self.is_initialized, 
            index: self.item_index, 
            collection_address: self.collection_address, 
            owner_address: self.owner!!,
            individual_content: self.individual_content!!
        };
    }
}
