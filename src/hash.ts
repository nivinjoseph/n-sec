import { Interop } from "./interop";


// public
export class Hash
{
    private constructor() { }
    

    public static create(value: string): Promise<string>
    {
        return Interop.executeCommand("Hash.Create", value);
    }
    
    public static createUsingSalt(value: string, salt: string): Promise<string>
    {
        return Interop.executeCommand("Hash.CreateUsingSalt", value, salt);
    }
}