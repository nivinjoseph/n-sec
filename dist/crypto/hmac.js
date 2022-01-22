"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hmac = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const Crypto = require("crypto");
class Hmac {
    constructor() { }
    static create(key, value) {
        n_defensive_1.given(key, "key").ensureHasValue().ensureIsString();
        n_defensive_1.given(value, "value").ensureHasValue().ensureIsString();
        key = key.trim();
        value = value.trim();
        const hmac = Crypto.createHmac("sha256", Buffer.from(key, "hex"));
        hmac.update(value, "utf8");
        return hmac.digest("hex").toUpperCase();
    }
}
exports.Hmac = Hmac;
//# sourceMappingURL=hmac.js.map