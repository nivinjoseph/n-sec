import { Interop } from "./interop";


// public
export class Hmac
{
    private constructor() { }
    
    
    public static create(key: string, value: string): Promise<string>
    {
        return Interop.executeCommand("Hmac.Create", key, value);
    }
}