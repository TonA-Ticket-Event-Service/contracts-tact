import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type CreateEventNftCollection = {
    $$type: 'CreateEventNftCollection';
    event_id: bigint;
    organizer_address: Address;
    collection_content: Cell;
    ticket_price: bigint;
    royalty_numerator: bigint;
    royalty_denominator: bigint;
}

export function storeCreateEventNftCollection(src: CreateEventNftCollection) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3353008081, 32);
        b_0.storeUint(src.event_id, 64);
        b_0.storeAddress(src.organizer_address);
        b_0.storeRef(src.collection_content);
        b_0.storeCoins(src.ticket_price);
        b_0.storeUint(src.royalty_numerator, 16);
        b_0.storeUint(src.royalty_denominator, 16);
    };
}

export function loadCreateEventNftCollection(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3353008081) { throw Error('Invalid prefix'); }
    let _event_id = sc_0.loadUintBig(64);
    let _organizer_address = sc_0.loadAddress();
    let _collection_content = sc_0.loadRef();
    let _ticket_price = sc_0.loadCoins();
    let _royalty_numerator = sc_0.loadUintBig(16);
    let _royalty_denominator = sc_0.loadUintBig(16);
    return { $$type: 'CreateEventNftCollection' as const, event_id: _event_id, organizer_address: _organizer_address, collection_content: _collection_content, ticket_price: _ticket_price, royalty_numerator: _royalty_numerator, royalty_denominator: _royalty_denominator };
}

function loadTupleCreateEventNftCollection(source: TupleReader) {
    let _event_id = source.readBigNumber();
    let _organizer_address = source.readAddress();
    let _collection_content = source.readCell();
    let _ticket_price = source.readBigNumber();
    let _royalty_numerator = source.readBigNumber();
    let _royalty_denominator = source.readBigNumber();
    return { $$type: 'CreateEventNftCollection' as const, event_id: _event_id, organizer_address: _organizer_address, collection_content: _collection_content, ticket_price: _ticket_price, royalty_numerator: _royalty_numerator, royalty_denominator: _royalty_denominator };
}

function loadGetterTupleCreateEventNftCollection(source: TupleReader) {
    let _event_id = source.readBigNumber();
    let _organizer_address = source.readAddress();
    let _collection_content = source.readCell();
    let _ticket_price = source.readBigNumber();
    let _royalty_numerator = source.readBigNumber();
    let _royalty_denominator = source.readBigNumber();
    return { $$type: 'CreateEventNftCollection' as const, event_id: _event_id, organizer_address: _organizer_address, collection_content: _collection_content, ticket_price: _ticket_price, royalty_numerator: _royalty_numerator, royalty_denominator: _royalty_denominator };
}

function storeTupleCreateEventNftCollection(source: CreateEventNftCollection) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.event_id);
    builder.writeAddress(source.organizer_address);
    builder.writeCell(source.collection_content);
    builder.writeNumber(source.ticket_price);
    builder.writeNumber(source.royalty_numerator);
    builder.writeNumber(source.royalty_denominator);
    return builder.build();
}

function dictValueParserCreateEventNftCollection(): DictionaryValue<CreateEventNftCollection> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateEventNftCollection(src)).endCell());
        },
        parse: (src) => {
            return loadCreateEventNftCollection(src.loadRef().beginParse());
        }
    }
}

export type SetTicketPrice = {
    $$type: 'SetTicketPrice';
    ticket_price: bigint;
}

export function storeSetTicketPrice(src: SetTicketPrice) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1580888975, 32);
        b_0.storeCoins(src.ticket_price);
    };
}

export function loadSetTicketPrice(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1580888975) { throw Error('Invalid prefix'); }
    let _ticket_price = sc_0.loadCoins();
    return { $$type: 'SetTicketPrice' as const, ticket_price: _ticket_price };
}

function loadTupleSetTicketPrice(source: TupleReader) {
    let _ticket_price = source.readBigNumber();
    return { $$type: 'SetTicketPrice' as const, ticket_price: _ticket_price };
}

function loadGetterTupleSetTicketPrice(source: TupleReader) {
    let _ticket_price = source.readBigNumber();
    return { $$type: 'SetTicketPrice' as const, ticket_price: _ticket_price };
}

function storeTupleSetTicketPrice(source: SetTicketPrice) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.ticket_price);
    return builder.build();
}

function dictValueParserSetTicketPrice(): DictionaryValue<SetTicketPrice> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetTicketPrice(src)).endCell());
        },
        parse: (src) => {
            return loadSetTicketPrice(src.loadRef().beginParse());
        }
    }
}

export type Mint = {
    $$type: 'Mint';
    to: Address;
    individual_content: Cell | null;
}

export function storeMint(src: Mint) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3118798242, 32);
        b_0.storeAddress(src.to);
        if (src.individual_content !== null && src.individual_content !== undefined) { b_0.storeBit(true).storeRef(src.individual_content); } else { b_0.storeBit(false); }
    };
}

export function loadMint(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3118798242) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _individual_content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Mint' as const, to: _to, individual_content: _individual_content };
}

function loadTupleMint(source: TupleReader) {
    let _to = source.readAddress();
    let _individual_content = source.readCellOpt();
    return { $$type: 'Mint' as const, to: _to, individual_content: _individual_content };
}

function loadGetterTupleMint(source: TupleReader) {
    let _to = source.readAddress();
    let _individual_content = source.readCellOpt();
    return { $$type: 'Mint' as const, to: _to, individual_content: _individual_content };
}

function storeTupleMint(source: Mint) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMint(src)).endCell());
        },
        parse: (src) => {
            return loadMint(src.loadRef().beginParse());
        }
    }
}

export type EventNftCollection$Data = {
    $$type: 'EventNftCollection$Data';
    next_item_index: bigint;
    event_id: bigint;
    tona_address: Address;
    organizer_address: Address | null;
    ticket_price: bigint | null;
    collection_content: Cell | null;
    royalty_params: RoyaltyParams | null;
}

export function storeEventNftCollection$Data(src: EventNftCollection$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.next_item_index, 32);
        b_0.storeUint(src.event_id, 256);
        b_0.storeAddress(src.tona_address);
        b_0.storeAddress(src.organizer_address);
        let b_1 = new Builder();
        if (src.ticket_price !== null && src.ticket_price !== undefined) { b_1.storeBit(true).storeInt(src.ticket_price, 257); } else { b_1.storeBit(false); }
        if (src.collection_content !== null && src.collection_content !== undefined) { b_1.storeBit(true).storeRef(src.collection_content); } else { b_1.storeBit(false); }
        let b_2 = new Builder();
        if (src.royalty_params !== null && src.royalty_params !== undefined) { b_2.storeBit(true); b_2.store(storeRoyaltyParams(src.royalty_params)); } else { b_2.storeBit(false); }
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadEventNftCollection$Data(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadUintBig(32);
    let _event_id = sc_0.loadUintBig(256);
    let _tona_address = sc_0.loadAddress();
    let _organizer_address = sc_0.loadMaybeAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _ticket_price = sc_1.loadBit() ? sc_1.loadIntBig(257) : null;
    let _collection_content = sc_1.loadBit() ? sc_1.loadRef() : null;
    let sc_2 = sc_1.loadRef().beginParse();
    let _royalty_params = sc_2.loadBit() ? loadRoyaltyParams(sc_2) : null;
    return { $$type: 'EventNftCollection$Data' as const, next_item_index: _next_item_index, event_id: _event_id, tona_address: _tona_address, organizer_address: _organizer_address, ticket_price: _ticket_price, collection_content: _collection_content, royalty_params: _royalty_params };
}

function loadTupleEventNftCollection$Data(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _event_id = source.readBigNumber();
    let _tona_address = source.readAddress();
    let _organizer_address = source.readAddressOpt();
    let _ticket_price = source.readBigNumberOpt();
    let _collection_content = source.readCellOpt();
    const _royalty_params_p = source.readTupleOpt();
    const _royalty_params = _royalty_params_p ? loadTupleRoyaltyParams(_royalty_params_p) : null;
    return { $$type: 'EventNftCollection$Data' as const, next_item_index: _next_item_index, event_id: _event_id, tona_address: _tona_address, organizer_address: _organizer_address, ticket_price: _ticket_price, collection_content: _collection_content, royalty_params: _royalty_params };
}

function loadGetterTupleEventNftCollection$Data(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _event_id = source.readBigNumber();
    let _tona_address = source.readAddress();
    let _organizer_address = source.readAddressOpt();
    let _ticket_price = source.readBigNumberOpt();
    let _collection_content = source.readCellOpt();
    const _royalty_params_p = source.readTupleOpt();
    const _royalty_params = _royalty_params_p ? loadTupleRoyaltyParams(_royalty_params_p) : null;
    return { $$type: 'EventNftCollection$Data' as const, next_item_index: _next_item_index, event_id: _event_id, tona_address: _tona_address, organizer_address: _organizer_address, ticket_price: _ticket_price, collection_content: _collection_content, royalty_params: _royalty_params };
}

function storeTupleEventNftCollection$Data(source: EventNftCollection$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeNumber(source.event_id);
    builder.writeAddress(source.tona_address);
    builder.writeAddress(source.organizer_address);
    builder.writeNumber(source.ticket_price);
    builder.writeCell(source.collection_content);
    if (source.royalty_params !== null && source.royalty_params !== undefined) {
        builder.writeTuple(storeTupleRoyaltyParams(source.royalty_params));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserEventNftCollection$Data(): DictionaryValue<EventNftCollection$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEventNftCollection$Data(src)).endCell());
        },
        parse: (src) => {
            return loadEventNftCollection$Data(src.loadRef().beginParse());
        }
    }
}

export type TicketNftItem$Data = {
    $$type: 'TicketNftItem$Data';
    collection_address: Address;
    item_index: bigint;
    is_initialized: boolean;
    owner: Address | null;
    individual_content: Cell | null;
}

export function storeTicketNftItem$Data(src: TicketNftItem$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.collection_address);
        b_0.storeInt(src.item_index, 257);
        b_0.storeBit(src.is_initialized);
        b_0.storeAddress(src.owner);
        if (src.individual_content !== null && src.individual_content !== undefined) { b_0.storeBit(true).storeRef(src.individual_content); } else { b_0.storeBit(false); }
    };
}

export function loadTicketNftItem$Data(slice: Slice) {
    let sc_0 = slice;
    let _collection_address = sc_0.loadAddress();
    let _item_index = sc_0.loadIntBig(257);
    let _is_initialized = sc_0.loadBit();
    let _owner = sc_0.loadMaybeAddress();
    let _individual_content = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TicketNftItem$Data' as const, collection_address: _collection_address, item_index: _item_index, is_initialized: _is_initialized, owner: _owner, individual_content: _individual_content };
}

function loadTupleTicketNftItem$Data(source: TupleReader) {
    let _collection_address = source.readAddress();
    let _item_index = source.readBigNumber();
    let _is_initialized = source.readBoolean();
    let _owner = source.readAddressOpt();
    let _individual_content = source.readCellOpt();
    return { $$type: 'TicketNftItem$Data' as const, collection_address: _collection_address, item_index: _item_index, is_initialized: _is_initialized, owner: _owner, individual_content: _individual_content };
}

function loadGetterTupleTicketNftItem$Data(source: TupleReader) {
    let _collection_address = source.readAddress();
    let _item_index = source.readBigNumber();
    let _is_initialized = source.readBoolean();
    let _owner = source.readAddressOpt();
    let _individual_content = source.readCellOpt();
    return { $$type: 'TicketNftItem$Data' as const, collection_address: _collection_address, item_index: _item_index, is_initialized: _is_initialized, owner: _owner, individual_content: _individual_content };
}

function storeTupleTicketNftItem$Data(source: TicketNftItem$Data) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.collection_address);
    builder.writeNumber(source.item_index);
    builder.writeBoolean(source.is_initialized);
    builder.writeAddress(source.owner);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserTicketNftItem$Data(): DictionaryValue<TicketNftItem$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTicketNftItem$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTicketNftItem$Data(src.loadRef().beginParse());
        }
    }
}

export type LogEventMintRecord = {
    $$type: 'LogEventMintRecord';
    minter: Address;
    item_id: bigint;
    generate_number: bigint;
}

export function storeLogEventMintRecord(src: LogEventMintRecord) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2743565669, 32);
        b_0.storeAddress(src.minter);
        b_0.storeInt(src.item_id, 257);
        b_0.storeInt(src.generate_number, 257);
    };
}

export function loadLogEventMintRecord(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2743565669) { throw Error('Invalid prefix'); }
    let _minter = sc_0.loadAddress();
    let _item_id = sc_0.loadIntBig(257);
    let _generate_number = sc_0.loadIntBig(257);
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadTupleLogEventMintRecord(source: TupleReader) {
    let _minter = source.readAddress();
    let _item_id = source.readBigNumber();
    let _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function loadGetterTupleLogEventMintRecord(source: TupleReader) {
    let _minter = source.readAddress();
    let _item_id = source.readBigNumber();
    let _generate_number = source.readBigNumber();
    return { $$type: 'LogEventMintRecord' as const, minter: _minter, item_id: _item_id, generate_number: _generate_number };
}

function storeTupleLogEventMintRecord(source: LogEventMintRecord) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.minter);
    builder.writeNumber(source.item_id);
    builder.writeNumber(source.generate_number);
    return builder.build();
}

function dictValueParserLogEventMintRecord(): DictionaryValue<LogEventMintRecord> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLogEventMintRecord(src)).endCell());
        },
        parse: (src) => {
            return loadLogEventMintRecord(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadGetterTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _collection_content = sc_0.loadRef();
    let _owner_address = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadGetterTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address | null;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Slice;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadMaybeAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddressOpt();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'Transfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Slice;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadGetterTupleOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'OwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadGetterTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    query_id: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function loadGetterTupleGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, query_id: _query_id };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    query_id: bigint;
    index_id: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeInt(src.index_id, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_id = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function loadGetterTupleReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_id = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, query_id: _query_id, index_id: _index_id, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index_id);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address;
    individual_content: Cell;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.individual_content);
    };
}

export function loadGetNftData(slice: Slice) {
    let sc_0 = slice;
    let _is_initialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadAddress();
    let _individual_content = sc_0.loadRef();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadGetterTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddress();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function storeTupleGetNftData(source: GetNftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type CreateEvent = {
    $$type: 'CreateEvent';
    organizer_address: Address;
    ticket_price: bigint;
    event_content: Cell;
}

export function storeCreateEvent(src: CreateEvent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(742344259, 32);
        b_0.storeAddress(src.organizer_address);
        b_0.storeCoins(src.ticket_price);
        b_0.storeRef(src.event_content);
    };
}

export function loadCreateEvent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 742344259) { throw Error('Invalid prefix'); }
    let _organizer_address = sc_0.loadAddress();
    let _ticket_price = sc_0.loadCoins();
    let _event_content = sc_0.loadRef();
    return { $$type: 'CreateEvent' as const, organizer_address: _organizer_address, ticket_price: _ticket_price, event_content: _event_content };
}

function loadTupleCreateEvent(source: TupleReader) {
    let _organizer_address = source.readAddress();
    let _ticket_price = source.readBigNumber();
    let _event_content = source.readCell();
    return { $$type: 'CreateEvent' as const, organizer_address: _organizer_address, ticket_price: _ticket_price, event_content: _event_content };
}

function loadGetterTupleCreateEvent(source: TupleReader) {
    let _organizer_address = source.readAddress();
    let _ticket_price = source.readBigNumber();
    let _event_content = source.readCell();
    return { $$type: 'CreateEvent' as const, organizer_address: _organizer_address, ticket_price: _ticket_price, event_content: _event_content };
}

function storeTupleCreateEvent(source: CreateEvent) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.organizer_address);
    builder.writeNumber(source.ticket_price);
    builder.writeCell(source.event_content);
    return builder.build();
}

function dictValueParserCreateEvent(): DictionaryValue<CreateEvent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCreateEvent(src)).endCell());
        },
        parse: (src) => {
            return loadCreateEvent(src.loadRef().beginParse());
        }
    }
}

export type SetRoyaltyNumerator = {
    $$type: 'SetRoyaltyNumerator';
    royalty_numerator: bigint;
}

export function storeSetRoyaltyNumerator(src: SetRoyaltyNumerator) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1290792962, 32);
        b_0.storeUint(src.royalty_numerator, 16);
    };
}

export function loadSetRoyaltyNumerator(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1290792962) { throw Error('Invalid prefix'); }
    let _royalty_numerator = sc_0.loadUintBig(16);
    return { $$type: 'SetRoyaltyNumerator' as const, royalty_numerator: _royalty_numerator };
}

function loadTupleSetRoyaltyNumerator(source: TupleReader) {
    let _royalty_numerator = source.readBigNumber();
    return { $$type: 'SetRoyaltyNumerator' as const, royalty_numerator: _royalty_numerator };
}

function loadGetterTupleSetRoyaltyNumerator(source: TupleReader) {
    let _royalty_numerator = source.readBigNumber();
    return { $$type: 'SetRoyaltyNumerator' as const, royalty_numerator: _royalty_numerator };
}

function storeTupleSetRoyaltyNumerator(source: SetRoyaltyNumerator) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.royalty_numerator);
    return builder.build();
}

function dictValueParserSetRoyaltyNumerator(): DictionaryValue<SetRoyaltyNumerator> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetRoyaltyNumerator(src)).endCell());
        },
        parse: (src) => {
            return loadSetRoyaltyNumerator(src.loadRef().beginParse());
        }
    }
}

export type SetEventCreationFee = {
    $$type: 'SetEventCreationFee';
    event_creation_fee: bigint;
}

export function storeSetEventCreationFee(src: SetEventCreationFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(501883838, 32);
        b_0.storeCoins(src.event_creation_fee);
    };
}

export function loadSetEventCreationFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 501883838) { throw Error('Invalid prefix'); }
    let _event_creation_fee = sc_0.loadCoins();
    return { $$type: 'SetEventCreationFee' as const, event_creation_fee: _event_creation_fee };
}

function loadTupleSetEventCreationFee(source: TupleReader) {
    let _event_creation_fee = source.readBigNumber();
    return { $$type: 'SetEventCreationFee' as const, event_creation_fee: _event_creation_fee };
}

function loadGetterTupleSetEventCreationFee(source: TupleReader) {
    let _event_creation_fee = source.readBigNumber();
    return { $$type: 'SetEventCreationFee' as const, event_creation_fee: _event_creation_fee };
}

function storeTupleSetEventCreationFee(source: SetEventCreationFee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.event_creation_fee);
    return builder.build();
}

function dictValueParserSetEventCreationFee(): DictionaryValue<SetEventCreationFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetEventCreationFee(src)).endCell());
        },
        parse: (src) => {
            return loadSetEventCreationFee(src.loadRef().beginParse());
        }
    }
}

export type TransferOwnership = {
    $$type: 'TransferOwnership';
    new_tona_owner_address: Address;
}

export function storeTransferOwnership(src: TransferOwnership) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2111977325, 32);
        b_0.storeAddress(src.new_tona_owner_address);
    };
}

export function loadTransferOwnership(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2111977325) { throw Error('Invalid prefix'); }
    let _new_tona_owner_address = sc_0.loadAddress();
    return { $$type: 'TransferOwnership' as const, new_tona_owner_address: _new_tona_owner_address };
}

function loadTupleTransferOwnership(source: TupleReader) {
    let _new_tona_owner_address = source.readAddress();
    return { $$type: 'TransferOwnership' as const, new_tona_owner_address: _new_tona_owner_address };
}

function loadGetterTupleTransferOwnership(source: TupleReader) {
    let _new_tona_owner_address = source.readAddress();
    return { $$type: 'TransferOwnership' as const, new_tona_owner_address: _new_tona_owner_address };
}

function storeTupleTransferOwnership(source: TransferOwnership) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.new_tona_owner_address);
    return builder.build();
}

function dictValueParserTransferOwnership(): DictionaryValue<TransferOwnership> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferOwnership(src)).endCell());
        },
        parse: (src) => {
            return loadTransferOwnership(src.loadRef().beginParse());
        }
    }
}

export type TonAState = {
    $$type: 'TonAState';
    tona_event_tickets_type: bigint;
    tona_owner_address: Address;
    total_events: bigint;
    event_creation_fee: bigint;
    royalty_numerator: bigint;
    royalty_denominator: bigint;
}

export function storeTonAState(src: TonAState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.tona_event_tickets_type, 64);
        b_0.storeAddress(src.tona_owner_address);
        b_0.storeUint(src.total_events, 64);
        b_0.storeCoins(src.event_creation_fee);
        b_0.storeUint(src.royalty_numerator, 16);
        b_0.storeUint(src.royalty_denominator, 16);
    };
}

export function loadTonAState(slice: Slice) {
    let sc_0 = slice;
    let _tona_event_tickets_type = sc_0.loadUintBig(64);
    let _tona_owner_address = sc_0.loadAddress();
    let _total_events = sc_0.loadUintBig(64);
    let _event_creation_fee = sc_0.loadCoins();
    let _royalty_numerator = sc_0.loadUintBig(16);
    let _royalty_denominator = sc_0.loadUintBig(16);
    return { $$type: 'TonAState' as const, tona_event_tickets_type: _tona_event_tickets_type, tona_owner_address: _tona_owner_address, total_events: _total_events, event_creation_fee: _event_creation_fee, royalty_numerator: _royalty_numerator, royalty_denominator: _royalty_denominator };
}

function loadTupleTonAState(source: TupleReader) {
    let _tona_event_tickets_type = source.readBigNumber();
    let _tona_owner_address = source.readAddress();
    let _total_events = source.readBigNumber();
    let _event_creation_fee = source.readBigNumber();
    let _royalty_numerator = source.readBigNumber();
    let _royalty_denominator = source.readBigNumber();
    return { $$type: 'TonAState' as const, tona_event_tickets_type: _tona_event_tickets_type, tona_owner_address: _tona_owner_address, total_events: _total_events, event_creation_fee: _event_creation_fee, royalty_numerator: _royalty_numerator, royalty_denominator: _royalty_denominator };
}

function loadGetterTupleTonAState(source: TupleReader) {
    let _tona_event_tickets_type = source.readBigNumber();
    let _tona_owner_address = source.readAddress();
    let _total_events = source.readBigNumber();
    let _event_creation_fee = source.readBigNumber();
    let _royalty_numerator = source.readBigNumber();
    let _royalty_denominator = source.readBigNumber();
    return { $$type: 'TonAState' as const, tona_event_tickets_type: _tona_event_tickets_type, tona_owner_address: _tona_owner_address, total_events: _total_events, event_creation_fee: _event_creation_fee, royalty_numerator: _royalty_numerator, royalty_denominator: _royalty_denominator };
}

function storeTupleTonAState(source: TonAState) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tona_event_tickets_type);
    builder.writeAddress(source.tona_owner_address);
    builder.writeNumber(source.total_events);
    builder.writeNumber(source.event_creation_fee);
    builder.writeNumber(source.royalty_numerator);
    builder.writeNumber(source.royalty_denominator);
    return builder.build();
}

function dictValueParserTonAState(): DictionaryValue<TonAState> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTonAState(src)).endCell());
        },
        parse: (src) => {
            return loadTonAState(src.loadRef().beginParse());
        }
    }
}

export type TonA$Data = {
    $$type: 'TonA$Data';
    tona_event_tickets_type: bigint;
    tona_owner_address: Address;
    total_events: bigint;
    event_creation_fee: bigint;
    royalty_numerator: bigint;
    royalty_denominator: bigint;
}

export function storeTonA$Data(src: TonA$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.tona_event_tickets_type, 64);
        b_0.storeAddress(src.tona_owner_address);
        b_0.storeUint(src.total_events, 64);
        b_0.storeCoins(src.event_creation_fee);
        b_0.storeUint(src.royalty_numerator, 16);
        b_0.storeUint(src.royalty_denominator, 16);
    };
}

export function loadTonA$Data(slice: Slice) {
    let sc_0 = slice;
    let _tona_event_tickets_type = sc_0.loadUintBig(64);
    let _tona_owner_address = sc_0.loadAddress();
    let _total_events = sc_0.loadUintBig(64);
    let _event_creation_fee = sc_0.loadCoins();
    let _royalty_numerator = sc_0.loadUintBig(16);
    let _royalty_denominator = sc_0.loadUintBig(16);
    return { $$type: 'TonA$Data' as const, tona_event_tickets_type: _tona_event_tickets_type, tona_owner_address: _tona_owner_address, total_events: _total_events, event_creation_fee: _event_creation_fee, royalty_numerator: _royalty_numerator, royalty_denominator: _royalty_denominator };
}

function loadTupleTonA$Data(source: TupleReader) {
    let _tona_event_tickets_type = source.readBigNumber();
    let _tona_owner_address = source.readAddress();
    let _total_events = source.readBigNumber();
    let _event_creation_fee = source.readBigNumber();
    let _royalty_numerator = source.readBigNumber();
    let _royalty_denominator = source.readBigNumber();
    return { $$type: 'TonA$Data' as const, tona_event_tickets_type: _tona_event_tickets_type, tona_owner_address: _tona_owner_address, total_events: _total_events, event_creation_fee: _event_creation_fee, royalty_numerator: _royalty_numerator, royalty_denominator: _royalty_denominator };
}

function loadGetterTupleTonA$Data(source: TupleReader) {
    let _tona_event_tickets_type = source.readBigNumber();
    let _tona_owner_address = source.readAddress();
    let _total_events = source.readBigNumber();
    let _event_creation_fee = source.readBigNumber();
    let _royalty_numerator = source.readBigNumber();
    let _royalty_denominator = source.readBigNumber();
    return { $$type: 'TonA$Data' as const, tona_event_tickets_type: _tona_event_tickets_type, tona_owner_address: _tona_owner_address, total_events: _total_events, event_creation_fee: _event_creation_fee, royalty_numerator: _royalty_numerator, royalty_denominator: _royalty_denominator };
}

function storeTupleTonA$Data(source: TonA$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.tona_event_tickets_type);
    builder.writeAddress(source.tona_owner_address);
    builder.writeNumber(source.total_events);
    builder.writeNumber(source.event_creation_fee);
    builder.writeNumber(source.royalty_numerator);
    builder.writeNumber(source.royalty_denominator);
    return builder.build();
}

function dictValueParserTonA$Data(): DictionaryValue<TonA$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTonA$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTonA$Data(src.loadRef().beginParse());
        }
    }
}

 type EventNftCollection_init_args = {
    $$type: 'EventNftCollection_init_args';
    event_id: bigint;
    tona_address: Address;
}

function initEventNftCollection_init_args(src: EventNftCollection_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.event_id, 257);
        b_0.storeAddress(src.tona_address);
    };
}

async function EventNftCollection_init(event_id: bigint, tona_address: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initEventNftCollection_init_args({ $$type: 'EventNftCollection_init_args', event_id, tona_address })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const EventNftCollection_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    2683: { message: `insufficient funds for ticket price` },
    18909: { message: `not organizer` },
    20106: { message: `Insufficient funds for event creation fee` },
    24717: { message: `not tona` },
    27499: { message: `initialized tx need from collection` },
    40056: { message: `not tona owner` },
    49280: { message: `not owner` },
    49469: { message: `not from collection` },
    62134: { message: `royalty numerator exceeds max` },
    62742: { message: `non-sequential NFTs` },
}

const EventNftCollection_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CreateEventNftCollection","header":3353008081,"fields":[{"name":"event_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"organizer_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ticket_price","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"royalty_numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"royalty_denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"SetTicketPrice","header":1580888975,"fields":[{"name":"ticket_price","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Mint","header":3118798242,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"EventNftCollection$Data","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"event_id","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"tona_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"organizer_address","type":{"kind":"simple","type":"address","optional":true}},{"name":"ticket_price","type":{"kind":"simple","type":"int","optional":true,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":true}},{"name":"royalty_params","type":{"kind":"simple","type":"RoyaltyParams","optional":true}}]},
    {"name":"TicketNftItem$Data","header":null,"fields":[{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":true}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"LogEventMintRecord","header":2743565669,"fields":[{"name":"minter","type":{"kind":"simple","type":"address","optional":false}},{"name":"item_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"generate_number","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"next_item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Transfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":true}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"is_initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CreateEvent","header":742344259,"fields":[{"name":"organizer_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"ticket_price","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"event_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SetRoyaltyNumerator","header":1290792962,"fields":[{"name":"royalty_numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"SetEventCreationFee","header":501883838,"fields":[{"name":"event_creation_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TransferOwnership","header":2111977325,"fields":[{"name":"new_tona_owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TonAState","header":null,"fields":[{"name":"tona_event_tickets_type","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tona_owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"total_events","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"event_creation_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"royalty_numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"royalty_denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"TonA$Data","header":null,"fields":[{"name":"tona_event_tickets_type","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"tona_owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"total_events","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"event_creation_fee","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"royalty_numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"royalty_denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
]

const EventNftCollection_getters: ABIGetter[] = [
    {"name":"get_collection_data","arguments":[],"returnType":{"kind":"simple","type":"CollectionData","optional":false}},
    {"name":"get_nft_address_by_index","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"getTicketNftItemInit","arguments":[{"name":"item_index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"StateInit","optional":false}},
    {"name":"get_nft_content","arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"individual_content","type":{"kind":"simple","type":"cell","optional":false}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"royalty_params","arguments":[],"returnType":{"kind":"simple","type":"RoyaltyParams","optional":false}},
    {"name":"mint_fee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const EventNftCollection_getterMapping: { [key: string]: string } = {
    'get_collection_data': 'getGetCollectionData',
    'get_nft_address_by_index': 'getGetNftAddressByIndex',
    'getTicketNftItemInit': 'getGetTicketNftItemInit',
    'get_nft_content': 'getGetNftContent',
    'royalty_params': 'getRoyaltyParams',
    'mint_fee': 'getMintFee',
}

const EventNftCollection_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CreateEventNftCollection"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetTicketPrice"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Mint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetRoyaltyParams"}},
]

export class EventNftCollection implements Contract {
    
    static async init(event_id: bigint, tona_address: Address) {
        return await EventNftCollection_init(event_id, tona_address);
    }
    
    static async fromInit(event_id: bigint, tona_address: Address) {
        const init = await EventNftCollection_init(event_id, tona_address);
        const address = contractAddress(0, init);
        return new EventNftCollection(address, init);
    }
    
    static fromAddress(address: Address) {
        return new EventNftCollection(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  EventNftCollection_types,
        getters: EventNftCollection_getters,
        receivers: EventNftCollection_receivers,
        errors: EventNftCollection_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CreateEventNftCollection | SetTicketPrice | Mint | GetRoyaltyParams) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CreateEventNftCollection') {
            body = beginCell().store(storeCreateEventNftCollection(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetTicketPrice') {
            body = beginCell().store(storeSetTicketPrice(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Mint') {
            body = beginCell().store(storeMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetRoyaltyParams') {
            body = beginCell().store(storeGetRoyaltyParams(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadGetterTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getGetTicketNftItemInit(provider: ContractProvider, item_index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(item_index);
        let source = (await provider.get('getTicketNftItemInit', builder.build())).stack;
        const result = loadGetterTupleStateInit(source);
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadGetterTupleRoyaltyParams(source);
        return result;
    }
    
    async getMintFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('mint_fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}