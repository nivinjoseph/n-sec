"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_exception_1 = require("@nivinjoseph/n-exception");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
class ExpiredTokenException extends n_exception_1.Exception {
    constructor(token) {
        n_defensive_1.given(token, "token").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        token = token.trim();
        super(`Token '${token}' is expired.`);
        this._token = token;
    }
    get token() { return this._token; }
}
exports.ExpiredTokenException = ExpiredTokenException;
//# sourceMappingURL=expired-token-exception.js.map