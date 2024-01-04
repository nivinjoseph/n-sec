import { given } from "@nivinjoseph/n-defensive";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { CryptoException } from "./crypto-exception.js";
// public
export class SymmetricEncryption {
    constructor() { }
    static generateKey() {
        return new Promise((resolve, reject) => {
            randomBytes(32, (err, buf) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buf.toString("hex").toUpperCase());
            });
        });
    }
    static encrypt(key, value) {
        return new Promise((resolve, reject) => {
            given(key, "key").ensureHasValue().ensureIsString();
            given(value, "value").ensureHasValue().ensureIsString();
            key = key.trim();
            value = value.trim();
            randomBytes(16, (err, buf) => {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    const iv = buf;
                    const cipher = createCipheriv("AES-256-CBC", Buffer.from(key, "hex"), iv);
                    let encrypted = cipher.update(value, "utf8", "hex");
                    encrypted += cipher.final("hex");
                    const cipherText = `${encrypted}.${iv.toString("hex")}`;
                    resolve(cipherText.toUpperCase());
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    static decrypt(key, value) {
        given(key, "key").ensureHasValue().ensureIsString();
        given(value, "value").ensureHasValue().ensureIsString();
        key = key.trim();
        value = value.trim();
        const splitted = value.split(".");
        if (splitted.length !== 2)
            throw new CryptoException("Invalid value.");
        const iv = Buffer.from(splitted[1], "hex");
        const deCipher = createDecipheriv("AES-256-CBC", Buffer.from(key, "hex"), iv);
        let decrypted = deCipher.update(splitted[0], "hex", "utf8");
        decrypted += deCipher.final("utf8");
        return decrypted;
    }
}
//# sourceMappingURL=symmetric-encryption.js.map