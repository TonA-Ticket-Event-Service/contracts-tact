import { beginCell, contractAddress, toNano, TonClient4, WalletContractV5R1, internal, fromNano } from "@ton/ton";
import { NetworkProvider } from "@ton/blueprint";
import { Address } from "@ton/core";
import { mnemonicToPrivateKey } from "@ton/crypto"
import { TonA } from '../wrappers/TonA';
import dotenv from 'dotenv';

dotenv.config();

// $ npx blueprint run
export async function run(provider: NetworkProvider) {
    const ticketType = 0n;
    const tonaOwnerAddress = Address.parse('UQA-hAveGp4YVY6HK05bAsO9lSxQ36tiPO5qWsPdDdS_WYjB')
    const tonA = provider.open(await TonA.fromInit(ticketType, tonaOwnerAddress));

    console.log(tonaOwnerAddress)

    await tonA.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tonA.address);
}