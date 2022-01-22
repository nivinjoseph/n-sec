"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonWebToken = void 0;
const claim_1 = require("./claim");
const n_exception_1 = require("@nivinjoseph/n-exception");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const invalid_token_exception_1 = require("./invalid-token-exception");
const alg_type_1 = require("./alg-type");
const hmac_1 = require("./../crypto/hmac");
const expired_token_exception_1 = require("./expired-token-exception");
class JsonWebToken {
    constructor(issuer, algType, key, isFullKey, expiry, claims) {
        n_defensive_1.given(issuer, "issuer").ensureHasValue();
        n_defensive_1.given(algType, "algType").ensureHasValue().ensureIsEnum(alg_type_1.AlgType);
        n_defensive_1.given(key, "key").ensureHasValue();
        n_defensive_1.given(isFullKey, "isFullKey").ensureHasValue();
        n_defensive_1.given(expiry, "expiry").ensureHasValue();
        n_defensive_1.given(claims, "claims")
            .ensureHasValue()
            .ensure(t => t.length > 0);
        this._issuer = issuer.trim();
        this._algType = algType;
        this._key = key.trim();
        this._isfullKey = isFullKey;
        this._expiry = expiry;
        this._claims = [...claims];
    }
    get issuer() { return this._issuer; }
    get algType() { return this._algType; }
    get key() { return this._key; }
    get canGenerateToken() { return this._isfullKey; }
    get expiry() { return this._expiry; }
    get isExpired() { return this._expiry <= Date.now(); }
    get claims() { return this._claims; }
    generateToken() {
        if (!this._isfullKey)
            throw new n_exception_1.InvalidOperationException("generating token using an instance created from token");
        const header = {
            iss: this._issuer,
            alg: this._algType,
            exp: this._expiry
        };
        const body = {};
        this._claims.forEach(t => body[t.type] = t.value);
        const headerAndBody = this.toHex(header) + "." + this.toHex(body);
        const signature = hmac_1.Hmac.create(this._key, headerAndBody);
        const token = headerAndBody + "." + signature;
        return token;
    }
    static fromClaims(issuer, algType, key, expiry, claims) {
        return new JsonWebToken(issuer, algType, key, true, expiry, claims);
    }
    static fromToken(issuer, algType, key, token) {
        n_defensive_1.given(issuer, "issuer").ensureHasValue();
        n_defensive_1.given(algType, "algType").ensureHasValue().ensureIsEnum(alg_type_1.AlgType);
        n_defensive_1.given(key, "key").ensureHasValue();
        n_defensive_1.given(token, "token").ensureHasValue();
        issuer = issuer.trim();
        key = key.trim();
        token = token.trim();
        const tokenSplitted = token.split(".");
        if (tokenSplitted.length !== 3)
            throw new invalid_token_exception_1.InvalidTokenException(token, "format is incorrect");
        const headerString = tokenSplitted[0];
        const bodyString = tokenSplitted[1];
        const signature = tokenSplitted[2];
        const header = JsonWebToken.toObject(headerString);
        const body = JsonWebToken.toObject(bodyString);
        if (header.iss === undefined || header.iss === null)
            throw new invalid_token_exception_1.InvalidTokenException(token, "iss was not present");
        if (header.iss !== issuer)
            throw new invalid_token_exception_1.InvalidTokenException(token, `iss was expected to be '${issuer}' but instead was '${header.iss}'`);
        if (header.alg === undefined || header.alg === null)
            throw new invalid_token_exception_1.InvalidTokenException(token, "alg was not present");
        if (header.alg !== algType)
            throw new invalid_token_exception_1.InvalidTokenException(token, `alg was expected to be '${algType}' but instead was '${header.alg}'`);
        if (header.exp === undefined || header.exp === null)
            throw new invalid_token_exception_1.InvalidTokenException(token, "exp was not present");
        if (typeof (header.exp) !== "number")
            throw new invalid_token_exception_1.InvalidTokenException(token, `exp value '${header.exp}' is invalid`);
        if (header.exp <= Date.now())
            throw new expired_token_exception_1.ExpiredTokenException(token);
        const computedSignature = hmac_1.Hmac.create(key, headerString + "." + bodyString);
        if (computedSignature !== signature)
            throw new invalid_token_exception_1.InvalidTokenException(token, "signature could not be verified");
        const claims = new Array();
        for (let item in body)
            claims.push(new claim_1.Claim(item, body[item]));
        return new JsonWebToken(issuer, algType, key, false, header.exp, claims);
    }
    toHex(obj) {
        const json = JSON.stringify(obj);
        const hex = Buffer.from(json, "utf8").toString("hex");
        return hex.toUpperCase();
    }
    static toObject(hex) {
        const json = Buffer.from(hex.toLowerCase(), "hex").toString("utf8");
        const obj = JSON.parse(json);
        return obj;
    }
}
exports.JsonWebToken = JsonWebToken;
//# sourceMappingURL=json-web-token.js.map