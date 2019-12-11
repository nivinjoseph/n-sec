"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class ClaimsIdentity {
    constructor(claims) {
        n_defensive_1.given(claims, "claims").ensureHasValue();
        this._claims = [...claims];
    }
    get claims() { return this._claims; }
    hasClaim(claim) {
        return this._claims.some(t => t.equals(claim));
    }
}
exports.ClaimsIdentity = ClaimsIdentity;
//# sourceMappingURL=claims-identity.js.map