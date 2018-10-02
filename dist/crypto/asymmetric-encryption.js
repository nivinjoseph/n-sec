"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ursa = require("ursa");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
class AsymmetricEncryption {
    constructor() { }
    static generateKeyPair() {
        const key = ursa.generatePrivateKey();
        return Promise.resolve(key.toPrivatePem().toString("hex").toUpperCase());
    }
    static getPublicKey(keyPair) {
        n_defensive_1.given(keyPair, "keyPair").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        keyPair = keyPair.trim();
        const key = ursa.createPrivateKey(Buffer.from(keyPair, "hex"));
        return Promise.resolve(key.toPublicPem().toString("hex").toUpperCase());
    }
    static encrypt(keyPairOrPublicKey, value) {
        n_defensive_1.given(keyPairOrPublicKey, "keyPairOrPublicKey").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        keyPairOrPublicKey = keyPairOrPublicKey.trim();
        value = value.trim();
        const buf = Buffer.from(keyPairOrPublicKey, "hex");
        let key;
        try {
            key = ursa.createPublicKey(buf);
        }
        catch (error) {
            key = ursa.createPrivateKey(buf);
        }
        const encrypted = key.encrypt(Buffer.from(value, "utf8"), "utf8", "hex", ursa.RSA_PKCS1_PADDING);
        return Promise.resolve(encrypted.toUpperCase());
    }
    static decrypt(keyPair, value) {
        n_defensive_1.given(keyPair, "keyPair").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        keyPair = keyPair.trim();
        value = value.trim();
        const key = ursa.createPrivateKey(Buffer.from(keyPair, "hex"));
        const decrypted = key.decrypt(Buffer.from(value, "hex"), "hex", "utf8", ursa.RSA_PKCS1_PADDING);
        return Promise.resolve(decrypted);
    }
}
exports.AsymmetricEncryption = AsymmetricEncryption;
//# sourceMappingURL=asymmetric-encryption.js.map