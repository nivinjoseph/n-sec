export declare class AsymmetricEncryption {
    private constructor();
    static generateKeyPair(): Promise<string>;
    static getPublicKey(keyPair: string): Promise<string>;
    static encrypt(keyPairOrPublicKey: string, value: string): Promise<string>;
    static decrypt(keyPair: string, value: string): Promise<string>;
}
