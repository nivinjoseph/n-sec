import { Exception } from "@nivinjoseph/n-exception";
import { given } from "@nivinjoseph/n-defensive";
// public
export class InvalidTokenException extends Exception {
    get token() { return this._token; }
    get reason() { return this._reason; }
    constructor(token, reason) {
        given(token, "token").ensureHasValue().ensureIsString();
        given(reason, "reason").ensureHasValue().ensureIsString();
        token = token.trim();
        super(`Token '${token}' is invalid because ${reason}.`);
        this._token = token;
        this._reason = reason;
    }
}
//# sourceMappingURL=invalid-token-exception.js.map