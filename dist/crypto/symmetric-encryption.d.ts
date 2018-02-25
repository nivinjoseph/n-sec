import "@nivinjoseph/n-ext";
export declare class SymmetricEncryption {
    private constructor();
    static generateKey(): Promise<string>;
    static encrypt(key: string, value: string): Promise<string>;
    static decrypt(key: string, value: string): Promise<string>;
}
