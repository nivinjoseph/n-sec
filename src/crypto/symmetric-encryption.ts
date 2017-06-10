import { Interop } from "./interop";


// public
export class SymmetricEncryption
{
    private constructor() { }

    
    public static generateKey(): Promise<string>
    {
        return Interop.executeCommand("SymmetricEncryption.GenerateKey");
    }
    
    public static encrypt(key: string, value: string): Promise<string>
    {
        return Interop.executeCommand("SymmetricEncryption.Encrypt", key, value);
    }
    
    public static decrypt(key: string, value: string): Promise<string>
    {
        return Interop.executeCommand("SymmetricEncryption.Decrypt", key, value);
    }
}