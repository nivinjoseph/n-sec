import { given } from "@nivinjoseph/n-defensive";
export class SecurityToken {
    get scheme() { return this._scheme; }
    get token() { return this._token; }
    constructor(scheme, token) {
        given(scheme, "scheme").ensureHasValue().ensureIsString()
            .ensure(t => !t.contains(" "), "cannot contain space");
        this._scheme = scheme;
        given(token, "token").ensureHasValue().ensureIsString()
            .ensure(t => !t.contains(" "), "cannot contain space");
        this._token = token;
    }
    toString() {
        return `${this._scheme} ${this._token}`;
    }
}
//# sourceMappingURL=security-token.js.map