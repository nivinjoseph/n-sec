import { Exception } from "n-exception";
import { given } from "n-defensive";
import "n-ext";


// public
export class InvalidTokenException extends Exception
{ 
    private readonly _token: string;
    private readonly _reason: string;
    
    
    public get token(): string { return this._token; }
    public get reason(): string { return this._reason; }
    
    
    public constructor(token: string, reason: string)
    {
        given(token, "token").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        given(reason, "reason").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        
        token = token.trim();
        super(`Token '${token}' is invalid because ${reason}.`);
        this._token = token;   
        this._reason = reason;
    }
}