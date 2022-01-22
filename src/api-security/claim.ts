import { given } from "@nivinjoseph/n-defensive";


// public
export class Claim
{
    private readonly _type: string;
    private readonly _value: any;
    
    
    public get type(): string { return this._type; }
    public get value(): any { return this._value; }
    
    
    public constructor(type: string, value: any)
    {
        given(type, "type").ensureHasValue();
        
        this._type = type.trim();
        this._value = value;
    }
    
    
    public equals(claim: Claim): boolean
    {
        if (claim == null)
            return false;

        if (claim === this)
            return true;

        return this.type === claim.type && this.value === claim.value;
    }
}