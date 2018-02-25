import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";
import * as Crypto from "crypto";


// public
export class Hash
{
    private constructor() { }
    

    public static create(value: string): Promise<string>
    {
        given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        
        value = value.trim();
        
        const hash = Crypto.createHash("sha512");
        hash.update(value, "utf8");
        return Promise.resolve(hash.digest("hex").toUpperCase());
    }
    
    public static createUsingSalt(value: string, salt: string): Promise<string>
    {
        given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        given(salt, "salt").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());

        value = value.trim();
        salt = salt.trim();
        
        const reverse = (val: string) =>
        {
            let rev = "";
            for (let i = 0; i < val.length; i++)
                rev = val[i] + rev;
            return rev;
        };
        
        const valueReverse = reverse(value);
        const saltReverse = reverse(salt);

        const saltedValue = "{1}{0}{2}{1}{3}{1}{2}".format(value, salt, valueReverse, saltReverse);
        
        return Hash.create(saltedValue);
    }
}