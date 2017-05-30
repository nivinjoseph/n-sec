import * as uuid from "uuid";


// public
export class Uuid
{
    private constructor() { }
    
    
    public static Create(): string
    {
        return uuid.v4();
    }
}