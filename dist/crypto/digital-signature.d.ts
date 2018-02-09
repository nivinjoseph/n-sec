import "@nivinjoseph/n-ext";
export declare class DigitalSignature {
    private constructor();
    static sign(keyPair: string, value: string): Promise<string>;
    static verify(keyPairOrPublicKey: string, value: string, signature: string): Promise<boolean>;
}
