"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Claim = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class Claim {
    constructor(type, value) {
        n_defensive_1.given(type, "type").ensureHasValue();
        this._type = type.trim();
        this._value = value;
    }
    get type() { return this._type; }
    get value() { return this._value; }
    equals(claim) {
        if (claim == null)
            return false;
        if (claim === this)
            return true;
        return this.type === claim.type && this.value === claim.value;
    }
}
exports.Claim = Claim;
//# sourceMappingURL=claim.js.map