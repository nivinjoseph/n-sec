import { given } from "@nivinjoseph/n-defensive";
// public
export class ClaimsIdentity {
    get claims() { return this._claims; }
    constructor(claims) {
        given(claims, "claims").ensureHasValue().ensureIsArray();
        this._claims = [...claims];
    }
    hasClaim(claim) {
        return this._claims.some(t => t.equals(claim));
    }
}
//# sourceMappingURL=claims-identity.js.map