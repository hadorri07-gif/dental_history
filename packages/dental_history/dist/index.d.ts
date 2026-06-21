import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions, Result } from "@stellar/stellar-sdk/contract";
import type { u32, u64 } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CDQPGEIBBEFPFSFLIWLHT6AQ2ZJSXPQNKMOC5LD5GXISRHUEL7LLD55Y";
    };
};
export interface Visit {
    dentist: string;
    procedure: string;
    tooth: string;
    visit_date: u64;
}
export type DataKey = {
    tag: "Access";
    values: readonly [string, string];
} | {
    tag: "Visits";
    values: readonly [string];
};
export declare const DentalError: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
};
export interface Client {
    /**
     * Construct and simulate a add_visit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    add_visit: ({ patient, dentist, procedure, tooth, visit_date }: {
        patient: string;
        dentist: string;
        procedure: string;
        tooth: string;
        visit_date: u64;
    }, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>;
    /**
     * Construct and simulate a get_visit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_visit: ({ patient, caller, index }: {
        patient: string;
        caller: string;
        index: u32;
    }, options?: MethodOptions) => Promise<AssembledTransaction<Result<Visit>>>;
    /**
     * Construct and simulate a has_access transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    has_access: ({ patient, dentist }: {
        patient: string;
        dentist: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<boolean>>;
    /**
     * Construct and simulate a visit_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    visit_count: ({ patient, caller }: {
        patient: string;
        caller: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<Result<u32>>>;
    /**
     * Construct and simulate a grant_access transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    grant_access: ({ patient, dentist }: {
        patient: string;
        dentist: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a revoke_access transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    revoke_access: ({ patient, dentist }: {
        patient: string;
        dentist: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions & Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
    }): Promise<AssembledTransaction<T>>;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        add_visit: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_visit: (json: string) => AssembledTransaction<Result<Visit, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        has_access: (json: string) => AssembledTransaction<boolean>;
        visit_count: (json: string) => AssembledTransaction<Result<number, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        grant_access: (json: string) => AssembledTransaction<null>;
        revoke_access: (json: string) => AssembledTransaction<null>;
    };
}
