import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";
import * as Crypto from "crypto";


// public
export class Hmac
{
    private constructor() { }
    
    
    public static create(key: string, value: string): Promise<string>
    {
        given(key, "key").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        
        key = key.trim();
        value = value.trim();
        
        const hmac = Crypto.createHmac("sha512", Buffer.from(key, "hex"));
        
        hmac.update(value, "utf8");
        return Promise.resolve(hmac.digest("hex"));
    }
}