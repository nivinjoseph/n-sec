import { Interop } from "./interop";


// public
export class AsymmetricEncryption
{
    private constructor() { }
    
    
    public static generateKeyPair(): Promise<string>
    {
        return Interop.executeCommand("AsymmetricEncryption.GenerateKeyPair");
    }
    
    public static getPublicKey(keyPair: string): Promise<string>
    {
        return Interop.executeCommand("AsymmetricEncryption.GetPublicKey", keyPair);
    }
    
    public static encrypt(keyPairOrPublicKey: string, value: string): Promise<string>
    {
        return Interop.executeCommand("AsymmetricEncryption.Encrypt", keyPairOrPublicKey, value);
    }
    
    public static decrypt(keyPair: string, value: string): Promise<string>
    {
        return Interop.executeCommand("AsymmetricEncryption.Decrypt", keyPair, value);
    }
}