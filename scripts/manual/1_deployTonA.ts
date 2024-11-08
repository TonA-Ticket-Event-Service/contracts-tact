import { beginCell, contractAddress, toNano, TonClient4, WalletContractV5R1, internal, fromNano } from "@ton/ton";
import { mnemonicToWalletKey } from "@ton/core";
import { TonA } from '../../wrappers/TonA';
import dotenv from 'dotenv';

dotenv.config();

const mnemonic = process.env.MNEMONIC;

// $ npx run 
export async function deployTonA() {
    
    const walletKey = await mnemonicToWalletKey(mnemonic);
    console.log(walletKey)
    
    



    // const tonA = provider.open(await TonA.fromInit(''));
    
}

deployTonA()
