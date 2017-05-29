export declare class AsymmetricEncryption {
    private constructor();
    static generateKeyPair(): Promise<string>;
    static getPublicKey(keyPair: string): Promise<string>;
    static encrypt(key: string, value: string): Promise<string>;
    static decrypt(key: string, value: string): Promise<string>;
}
