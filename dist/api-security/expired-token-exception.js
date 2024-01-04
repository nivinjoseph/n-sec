import { Exception } from "@nivinjoseph/n-exception";
import { given } from "@nivinjoseph/n-defensive";
// public
export class ExpiredTokenException extends Exception {
    get token() { return this._token; }
    constructor(token) {
        given(token, "token").ensureHasValue().ensureIsString();
        token = token.trim();
        super(`Token '${token}' is expired.`);
        this._token = token;
    }
}
//# sourceMappingURL=expired-token-exception.js.map