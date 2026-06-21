import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDQPGEIBBEFPFSFLIWLHT6AQ2ZJSXPQNKMOC5LD5GXISRHUEL7LLD55Y",
  }
} as const


export interface Visit {
  dentist: string;
  procedure: string;
  tooth: string;
  visit_date: u64;
}

export type DataKey = {tag: "Access", values: readonly [string, string]} | {tag: "Visits", values: readonly [string]};

export const DentalError = {
  1: {message:"NotAuthorized"},
  2: {message:"VisitNotFound"}
}

export interface Client {
  /**
   * Construct and simulate a add_visit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  add_visit: ({patient, dentist, procedure, tooth, visit_date}: {patient: string, dentist: string, procedure: string, tooth: string, visit_date: u64}, options?: MethodOptions) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_visit transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_visit: ({patient, caller, index}: {patient: string, caller: string, index: u32}, options?: MethodOptions) => Promise<AssembledTransaction<Result<Visit>>>

  /**
   * Construct and simulate a has_access transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  has_access: ({patient, dentist}: {patient: string, dentist: string}, options?: MethodOptions) => Promise<AssembledTransaction<boolean>>

  /**
   * Construct and simulate a visit_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  visit_count: ({patient, caller}: {patient: string, caller: string}, options?: MethodOptions) => Promise<AssembledTransaction<Result<u32>>>

  /**
   * Construct and simulate a grant_access transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  grant_access: ({patient, dentist}: {patient: string, dentist: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a revoke_access transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  revoke_access: ({patient, dentist}: {patient: string, dentist: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAABVZpc2l0AAAAAAAABAAAAAAAAAAHZGVudGlzdAAAAAATAAAAAAAAAAlwcm9jZWR1cmUAAAAAAAARAAAAAAAAAAV0b290aAAAAAAAABEAAAAAAAAACnZpc2l0X2RhdGUAAAAAAAY=",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAgAAAAEAAAAAAAAABkFjY2VzcwAAAAAAAgAAABMAAAATAAAAAQAAAAAAAAAGVmlzaXRzAAAAAAABAAAAEw==",
        "AAAABAAAAAAAAAAAAAAAC0RlbnRhbEVycm9yAAAAAAIAAAAAAAAADU5vdEF1dGhvcml6ZWQAAAAAAAABAAAAAAAAAA1WaXNpdE5vdEZvdW5kAAAAAAAAAg==",
        "AAAAAAAAAAAAAAAJYWRkX3Zpc2l0AAAAAAAABQAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAdkZW50aXN0AAAAABMAAAAAAAAACXByb2NlZHVyZQAAAAAAABEAAAAAAAAABXRvb3RoAAAAAAAAEQAAAAAAAAAKdmlzaXRfZGF0ZQAAAAAABgAAAAEAAAPpAAAAAgAAB9AAAAALRGVudGFsRXJyb3IA",
        "AAAAAAAAAAAAAAAJZ2V0X3Zpc2l0AAAAAAAAAwAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAABWluZGV4AAAAAAAABAAAAAEAAAPpAAAH0AAAAAVWaXNpdAAAAAAAB9AAAAALRGVudGFsRXJyb3IA",
        "AAAAAAAAAAAAAAAKaGFzX2FjY2VzcwAAAAAAAgAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAdkZW50aXN0AAAAABMAAAABAAAAAQ==",
        "AAAAAAAAAAAAAAALdmlzaXRfY291bnQAAAAAAgAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAZjYWxsZXIAAAAAABMAAAABAAAD6QAAAAQAAAfQAAAAC0RlbnRhbEVycm9yAA==",
        "AAAAAAAAAAAAAAAMZ3JhbnRfYWNjZXNzAAAAAgAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAdkZW50aXN0AAAAABMAAAAA",
        "AAAAAAAAAAAAAAANcmV2b2tlX2FjY2VzcwAAAAAAAAIAAAAAAAAAB3BhdGllbnQAAAAAEwAAAAAAAAAHZGVudGlzdAAAAAATAAAAAA==" ]),
      options
    )
  }
  public readonly fromJSON = {
    add_visit: this.txFromJSON<Result<void>>,
        get_visit: this.txFromJSON<Result<Visit>>,
        has_access: this.txFromJSON<boolean>,
        visit_count: this.txFromJSON<Result<u32>>,
        grant_access: this.txFromJSON<null>,
        revoke_access: this.txFromJSON<null>
  }
}