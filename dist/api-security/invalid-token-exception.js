"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenException = void 0;
const n_exception_1 = require("@nivinjoseph/n-exception");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
class InvalidTokenException extends n_exception_1.Exception {
    constructor(token, reason) {
        n_defensive_1.given(token, "token").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(reason, "reason").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        token = token.trim();
        super(`Token '${token}' is invalid because ${reason}.`);
        this._token = token;
        this._reason = reason;
    }
    get token() { return this._token; }
    get reason() { return this._reason; }
}
exports.InvalidTokenException = InvalidTokenException;
//# sourceMappingURL=invalid-token-exception.js.map