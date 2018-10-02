"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
const Crypto = require("crypto");
class Hmac {
    constructor() { }
    static create(key, value) {
        n_defensive_1.given(key, "key").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        value = value.trim();
        const hmac = Crypto.createHmac("sha256", Buffer.from(key, "hex"));
        hmac.update(value, "utf8");
        return Promise.resolve(hmac.digest("hex").toUpperCase());
    }
}
exports.Hmac = Hmac;
//# sourceMappingURL=hmac.js.map