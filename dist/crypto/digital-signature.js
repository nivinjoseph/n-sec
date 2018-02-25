"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ursa = require("ursa");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
const Crypto = require("crypto");
// public
class DigitalSignature {
    constructor() { }
    static sign(keyPair, value) {
        n_defensive_1.given(keyPair, "keyPair").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        keyPair = keyPair.trim();
        value = value.trim();
        const hash = Crypto.createHash("sha512");
        hash.update(value, "utf8");
        const key = ursa.createPrivateKey(Buffer.from(keyPair, "hex"));
        const signature = key.sign("sha512", hash.digest(), null, "hex");
        return Promise.resolve(signature.toUpperCase());
    }
    static verify(keyPairOrPublicKey, value, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            n_defensive_1.given(keyPairOrPublicKey, "keyPairOrPublicKey").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
            n_defensive_1.given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
            n_defensive_1.given(signature, "signature").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
            keyPairOrPublicKey = keyPairOrPublicKey.trim();
            value = value.trim();
            signature = signature.trim();
            const hash = Crypto.createHash("sha512");
            hash.update(value, "utf8");
            try {
                const buf = Buffer.from(keyPairOrPublicKey, "hex");
                let key;
                try {
                    key = ursa.createPublicKey(buf);
                }
                catch (error) {
                    key = ursa.createPrivateKey(buf);
                }
                const result = key.verify("sha512", hash.digest(), Buffer.from(signature, "hex"));
                return Promise.resolve(result);
            }
            catch (error) {
                return Promise.resolve(false);
            }
        });
    }
}
exports.DigitalSignature = DigitalSignature;
//# sourceMappingURL=digital-signature.js.map