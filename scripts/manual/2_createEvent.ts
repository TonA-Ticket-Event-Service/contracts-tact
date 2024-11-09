import { Cell, beginCell, contractAddress, toNano, TonClient4, WalletContractV5R1, internal, fromNano } from "@ton/ton";
import { NetworkProvider } from "@ton/blueprint";
import { Address } from "@ton/core";
import { mnemonicToPrivateKey } from "@ton/crypto"
import { TonA } from '../../wrappers/TonA';
import { encodeOffChainContent } from './contentHelper';
import dotenv from 'dotenv';

dotenv.config();


export async function run(provider: NetworkProvider) {
    
    const tonaOwnerAddress = Address.parse('UQA-hAveGp4YVY6HK05bAsO9lSxQ36tiPO5qWsPdDdS_WYjB');
    const tonaAddress = Address.parse('EQCcGod9cXbiIXUvqVneGJeluzGBY4pHX3a1HpDVVsdEr2_c');

    const tonA = provider.open(TonA.fromAddress(tonaAddress));

    const organizerAddress = tonaOwnerAddress;
    const ticketPrice = toNano('0.001')
    const eventContentLink = 'https://raw.githubusercontent.com/TonA-Ticket-Event-Service/images/refs/heads/main/event.json'

    const eventContentOnchainData = encodeOffChainContent(eventContentLink)

    // console.log()

    const createEventResult = await tonA.send(
        provider.sender(),
        {
            value: toNano('0.1'), 
        },
        {
            $$type: 'CreateEvent',
            organizer_address: organizerAddress,
            ticket_price: ticketPrice,
            event_content: eventContentOnchainData,
        }
    );

    // await provider.wait(tonA.address);
    
}
