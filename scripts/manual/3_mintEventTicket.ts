import { toNano } from '@ton/core';
import { TonA } from '../../wrappers/TonA';
import { NetworkProvider } from '@ton/blueprint';

export async function run() {
       
    const tonA = provider.open(await TonA.fromInit(''));
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
