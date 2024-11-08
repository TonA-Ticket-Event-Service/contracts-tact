import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Dictionary, DictionaryValue, toNano, beginCell, Cell, Slice } from '@ton/core';
import { TonA } from '../wrappers/TonA';
import '@ton/test-utils';
import { EventNftCollection } from '../build/TonA/tact_EventNftCollection';
import { TicketNftItem } from '../build/TonA/tact_TicketNftItem';
import { buildOnchainMetadata } from './helper';

describe('TonA', () => {
    let blockchain: Blockchain;
    let tonaOwner: SandboxContract<TreasuryContract>;
    let organizer: SandboxContract<TreasuryContract>;
    let user: SandboxContract<TreasuryContract>;
    let tonA: SandboxContract<TonA>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        tonaOwner = await blockchain.treasury('tonaOwner');
        organizer = await blockchain.treasury('organizer');
        user = await blockchain.treasury('user');
        tonA = blockchain.openContract(await TonA.fromInit(tonaOwner.address));

        const deployResult = await tonA.send(
            tonaOwner.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: tonaOwner.address,
            to: tonA.address,
            deploy: true,
            success: true,
        });
    });

    it('should set royalty', async () => {
        const stateBefore = await tonA.getState();
        expect(stateBefore.royalty_numerator).toBe(500n);

        let newRoyalty = 700n

        const setRoyaltyResult = await tonA.send(
            tonaOwner.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'SetRoyaltyNumerator',
                royalty_numerator: newRoyalty,
            }
        );

        let stateAfter = await tonA.getState();
        expect(stateAfter.royalty_numerator).toBe(newRoyalty);
    })

    it('should transfer ownership', async () => {
        const stateBefore = await tonA.getState();
        expect(stateBefore.tona_owner_address).toEqualAddress(tonaOwner.address);

        let newTonaOwner = await blockchain.treasury('newTonaOwner');

        const setRoyaltyResult = await tonA.send(
            tonaOwner.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'TransferOwnership',
                new_tona_owner_address: newTonaOwner.address,
            }
        );

        let stateAfter = await tonA.getState();
        expect(stateAfter.tona_owner_address).toEqualAddress(newTonaOwner.address);
    })

    it.skip('should create a new event and check balances', async () => {
        const ticketPrice = toNano('1'); // Event ticket price
        const eventContent = beginCell().storeUint(1, 8).endCell(); // Sample event content

        const tonaOwnerBalanceBefore = await tonaOwner.getBalance()
        const organizerBalanceBefore = await organizer.getBalance()

        // Send CreateEvent message to TonA contract
        const createEventResult = await tonA.send(
            organizer.getSender(),
            {
                value: toNano('0.1'), 
            },
            {
                $$type: 'CreateEvent',
                organizer_address: organizer.address,
                ticket_price: ticketPrice,
                event_content: eventContent,
            }
        );

        const tonaOwnerBalanceAfter = await tonaOwner.getBalance()
        const organizerBalanceAfter = await organizer.getBalance()
        expect(tonaOwnerBalanceAfter).toBeGreaterThan(tonaOwnerBalanceBefore)
        expect(organizerBalanceAfter).toBeLessThan(organizerBalanceBefore)

        // console.log("tona owner: ", tonaOwnerBalanceBefore, " - ", tonaOwnerBalanceAfter)
        // console.log("organizer:  ",organizerBalanceBefore, " - ", organizerBalanceAfter)
        // console.log(createEventResult)
        // Check if event creation transaction is successful
        expect(createEventResult.transactions).toHaveTransaction({
            from: organizer.address,
            to: tonA.address,
            success: true,
        });

        // Validate that event count has increased
        const state = await tonA.getState();
        expect(state.total_events).toBe(1n);

        const eventId = 0n;
        const eventNftCollectionAddress = await tonA.getGetNftCollectionAddress(eventId);
        expect(eventNftCollectionAddress).not.toBeNull();

      
        const eventNftCollection = blockchain.openContract(await EventNftCollection.fromInit(eventId, tonA.address));

        const collectionData = await eventNftCollection.getGetCollectionData();
        console.log(collectionData)
        expect(collectionData.owner_address).toEqualAddress(organizer.address)
   
    })

    it('should create event and mint 3 NFT', async () => {
        const ticketPrice = toNano('1'); // Event ticket price
        const eventContent = beginCell().storeUint(1, 8).endCell(); // Sample event content
        
        const createEventResult = await tonA.send(
            organizer.getSender(),
            {
                value: toNano('0.1'), 
            },
            {
                $$type: 'CreateEvent',
                organizer_address: organizer.address,
                ticket_price: ticketPrice,
                event_content: eventContent,
            }
        );
        
        const eventId = 0n;
        const eventNftCollection = blockchain.openContract(await EventNftCollection.fromInit(eventId, tonA.address));
        const ticketContent = {
            "name": "TonA Ticket event",
            "description": "Event xyz",
            "image": "https://s.getgems.io/nft/b/c/62fba50217c3fe3cbaad9e7f/images/943e994f91227c3fdbccbc6d8635bfaab256fbb4",
            "content_url": "https://s.getgems.io/nft/b/c/62fba50217c3fe3cbaad9e7f/content/84f7f698b337de3bfd1bc4a8118cdfd8226bbadf",
        }

        const individualContent = buildOnchainMetadata(ticketContent)
        console.log(individualContent)
        const mintResult1 = await eventNftCollection.send(
            organizer.getSender(),
            {
                value: ticketPrice + toNano('0.5'),
            },
            {
                $$type: 'Mint',
                to: user.address,
                individual_content: individualContent,
            }
        );

        const mintResult2 = await eventNftCollection.send(
            organizer.getSender(),
            {
                value: ticketPrice + toNano('0.5'),
            },
            {
                $$type: 'Mint',
                to: user.address,
                individual_content: individualContent,
            }
        );

        const mintResult3 = await eventNftCollection.send(
            organizer.getSender(),
            {
                value: ticketPrice + toNano('0.5'),
            },
            {
                $$type: 'Mint',
                to: user.address,
                individual_content: individualContent,
            }
        );

        const tickerId = 0n;
        const ticketNft = blockchain.openContract(await TicketNftItem.fromInit(eventNftCollection.address, tickerId));
        let nftData = await ticketNft.getGetNftData()
        console.log("====================================")
        const cont = nftData.individual_content.toBoc()
        console.log(cont)
        const cells = Cell.fromBoc(cont)
        const wholeCell = cells[0].toString()
        console.log(wholeCell)
       
        const regex = /x{([0-9A-Fa-f]+)}/g;
    
        const matches = Array.from(wholeCell.matchAll(regex), (m: RegExpMatchArray) => m[1]);
        console.log(matches)
        let contentURL = Buffer.from(matches[1], 'hex').toString('utf-8')
        let image = Buffer.from(matches[2], 'hex').toString('utf-8')
        let name = Buffer.from(matches[4], 'hex').toString('utf-8')
        let description = Buffer.from(matches[6], 'hex').toString('utf-8')
        console.log(contentURL)
        console.log(image)
        console.log(name)
        console.log(description)
        
    })

  
});
