import { given } from "@nivinjoseph/n-defensive";
// public
export class Claim {
    get type() { return this._type; }
    get value() { return this._value; }
    constructor(type, value) {
        given(type, "type").ensureHasValue().ensureIsString();
        this._type = type.trim();
        this._value = value;
    }
    equals(claim) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (claim == null)
            return false;
        if (claim === this)
            return true;
        return this.type === claim.type && this.value === claim.value;
    }
}
//# sourceMappingURL=claim.js.map