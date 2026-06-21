import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
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
};
export const DentalError = {
    1: { message: "NotAuthorized" },
    2: { message: "VisitNotFound" }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAABVZpc2l0AAAAAAAABAAAAAAAAAAHZGVudGlzdAAAAAATAAAAAAAAAAlwcm9jZWR1cmUAAAAAAAARAAAAAAAAAAV0b290aAAAAAAAABEAAAAAAAAACnZpc2l0X2RhdGUAAAAAAAY=",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAgAAAAEAAAAAAAAABkFjY2VzcwAAAAAAAgAAABMAAAATAAAAAQAAAAAAAAAGVmlzaXRzAAAAAAABAAAAEw==",
            "AAAABAAAAAAAAAAAAAAAC0RlbnRhbEVycm9yAAAAAAIAAAAAAAAADU5vdEF1dGhvcml6ZWQAAAAAAAABAAAAAAAAAA1WaXNpdE5vdEZvdW5kAAAAAAAAAg==",
            "AAAAAAAAAAAAAAAJYWRkX3Zpc2l0AAAAAAAABQAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAdkZW50aXN0AAAAABMAAAAAAAAACXByb2NlZHVyZQAAAAAAABEAAAAAAAAABXRvb3RoAAAAAAAAEQAAAAAAAAAKdmlzaXRfZGF0ZQAAAAAABgAAAAEAAAPpAAAAAgAAB9AAAAALRGVudGFsRXJyb3IA",
            "AAAAAAAAAAAAAAAJZ2V0X3Zpc2l0AAAAAAAAAwAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAZjYWxsZXIAAAAAABMAAAAAAAAABWluZGV4AAAAAAAABAAAAAEAAAPpAAAH0AAAAAVWaXNpdAAAAAAAB9AAAAALRGVudGFsRXJyb3IA",
            "AAAAAAAAAAAAAAAKaGFzX2FjY2VzcwAAAAAAAgAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAdkZW50aXN0AAAAABMAAAABAAAAAQ==",
            "AAAAAAAAAAAAAAALdmlzaXRfY291bnQAAAAAAgAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAZjYWxsZXIAAAAAABMAAAABAAAD6QAAAAQAAAfQAAAAC0RlbnRhbEVycm9yAA==",
            "AAAAAAAAAAAAAAAMZ3JhbnRfYWNjZXNzAAAAAgAAAAAAAAAHcGF0aWVudAAAAAATAAAAAAAAAAdkZW50aXN0AAAAABMAAAAA",
            "AAAAAAAAAAAAAAANcmV2b2tlX2FjY2VzcwAAAAAAAAIAAAAAAAAAB3BhdGllbnQAAAAAEwAAAAAAAAAHZGVudGlzdAAAAAATAAAAAA=="]), options);
        this.options = options;
    }
    fromJSON = {
        add_visit: (this.txFromJSON),
        get_visit: (this.txFromJSON),
        has_access: (this.txFromJSON),
        visit_count: (this.txFromJSON),
        grant_access: (this.txFromJSON),
        revoke_access: (this.txFromJSON)
    };
}
