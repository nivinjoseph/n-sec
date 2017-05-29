import { Interop } from "./interop";

// public
export class SymmetricEncryption
{
    private constructor() { }


    public static generateKey(): Promise<string>
    {
        return Interop.executeCommand("SymmetricEncryption.GenerateKey");
    }
}