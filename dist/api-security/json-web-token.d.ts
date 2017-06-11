import { Claim } from "./claim";
import "n-ext";
import { AlgType } from "./alg-type";
export declare class JsonWebToken {
    private readonly _issuer;
    private readonly _algType;
    private readonly _key;
    private readonly _isfullKey;
    private readonly _expiry;
    private readonly _claims;
    readonly issuer: string;
    readonly algType: AlgType;
    readonly key: string;
    readonly canGenerateToken: boolean;
    readonly expiry: number;
    readonly isExpired: boolean;
    readonly claims: ReadonlyArray<Claim>;
    private constructor(issuer, algType, key, isFullKey, expiry, claims);
    generateToken(): Promise<string>;
    static fromClaims(issuer: string, algType: AlgType, key: string, expiry: number, claims: Array<Claim>): JsonWebToken;
    static fromToken(issuer: string, algType: AlgType, key: string, token: string): Promise<JsonWebToken>;
    private toHex(obj);
    private static toObject(hex);
}
