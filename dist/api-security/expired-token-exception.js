"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_exception_1 = require("n-exception");
const n_defensive_1 = require("n-defensive");
require("n-ext");
// public
class ExpiredTokenException extends n_exception_1.Exception {
    get token() { return this._token; }
    constructor(token) {
        n_defensive_1.given(token, "token").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        token = token.trim();
        super(`Token '${token}' is expired.`);
        this._token = token;
    }
}
exports.ExpiredTokenException = ExpiredTokenException;
//# sourceMappingURL=expired-token-exception.js.map