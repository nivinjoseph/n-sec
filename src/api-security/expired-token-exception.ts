import { Exception } from "@nivinjoseph/n-exception";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


// public
export class ExpiredTokenException extends Exception
{
    private readonly _token: string;
    
    
    public get token(): string { return this._token; }
    
    
    public constructor(token: string)
    {
        given(token, "token").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        token = token.trim();
        super(`Token '${token}' is expired.`);
        this._token = token;
    }
}