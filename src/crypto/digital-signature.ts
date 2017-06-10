import { Interop } from "./interop";


// public
export class DigitalSignature
{
    private constructor() { }
    
    
    public static sign(keyPair: string, value: string): Promise<string>
    {
        return Interop.executeCommand("DigitalSignature.Sign", keyPair, value);
    }
    
    public static async verify(publicKey: string, value: string, signature: string): Promise<boolean>
    {
        let result = await Interop.executeCommand("DigitalSignature.Verify", publicKey, value, signature);
        return result.trim().toLowerCase() === "true";
    }
}