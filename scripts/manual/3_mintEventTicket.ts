import { toNano, Address, beginCell, Cell } from '@ton/core';
import { TonA } from '../../wrappers/TonA';
import { NetworkProvider } from '@ton/blueprint';
import { EventNftCollection } from '../../build/TonA/tact_EventNftCollection';
import { encodeOffChainContent } from './contentHelper';

export async function run(provider: NetworkProvider) {
    
    const tonaOwnerAddress = Address.parse('UQA-hAveGp4YVY6HK05bAsO9lSxQ36tiPO5qWsPdDdS_WYjB');
    const tonaAddress = Address.parse('EQCcGod9cXbiIXUvqVneGJeluzGBY4pHX3a1HpDVVsdEr2_c');

    const eventCollectionAddress = Address.parse('EQD_-jeVGKbFprZSDyEU9jutJqZEOs7XMadMZ5k4nlUbPBsl');

    const eventCollection = provider.open(EventNftCollection.fromAddress(eventCollectionAddress))
    console.log(eventCollection.address)

    const organizerAddress = tonaOwnerAddress;
    const ticketPrice = toNano('0.001')
    const ticketContentLink = 'https://raw.githubusercontent.com/TonA-Ticket-Event-Service/images/refs/heads/main/event.json'

    const ticketContentOnchainData = encodeOffChainContent(ticketContentLink)

    const createEventResult = await eventCollection.send(
        provider.sender(),
        {
            value: toNano('0.1'), 
        },
        {
            $$type: 'Mint',
            to: tonaOwnerAddress,
            individual_content: ticketContentOnchainData,
        }
    );
    
}