import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/ton_a.tact',
    options: {
        debug: true,
    },
};
