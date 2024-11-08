import { toNano, Address } from '@ton/core';
import { TonA } from '../wrappers/TonA';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    //tona owner address: EQA-hAveGp4YVY6HK05bAsO9lSxQ36tiPO5qWsPdDdS_WdUE
    const tonaOwnerAddress = Address.parse('UQA-hAveGp4YVY6HK05bAsO9lSxQ36tiPO5qWsPdDdS_WYjB')
    const tonA = provider.open(await TonA.fromInit(tonaOwnerAddress));

    console.log(tonaOwnerAddress)

    // await tonA.send(
    //     provider.sender(),
    //     {
    //         value: toNano('0.05'),
    //     },
    //     {
    //         $$type: 'Deploy',
    //         queryId: 0n,
    //     }
    // );

    // await provider.waitForDeploy(tonA.address);

    // run methods on `tonA`
}