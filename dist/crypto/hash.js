import { given } from "@nivinjoseph/n-defensive";
import { createHash } from "node:crypto";
// public
export class Hash {
    constructor() { }
    static create(value) {
        given(value, "value").ensureHasValue().ensureIsString();
        value = value.trim();
        const hash = createHash("sha512");
        hash.update(value, "utf8");
        return hash.digest("hex").toUpperCase();
    }
    static createUsingSalt(value, salt) {
        given(value, "value").ensureHasValue().ensureIsString();
        given(salt, "salt").ensureHasValue().ensureIsString();
        value = value.trim();
        salt = salt.trim();
        const reverse = (val) => {
            let rev = "";
            for (let i = 0; i < val.length; i++)
                rev = val[i] + rev;
            return rev;
        };
        const valueReverse = reverse(value);
        const saltReverse = reverse(salt);
        // const saltedValue = "{1}{0}{2}{1}{3}{1}{2}".format(value, salt, valueReverse, saltReverse);
        const saltedValue = `${salt}${value}${valueReverse}${salt}${saltReverse}${salt}${valueReverse}`;
        return Hash.create(saltedValue);
    }
}
//# sourceMappingURL=hash.js.map