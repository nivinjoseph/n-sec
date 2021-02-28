"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonWebToken = void 0;
const claim_1 = require("./claim");
const n_exception_1 = require("@nivinjoseph/n-exception");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
const invalid_token_exception_1 = require("./invalid-token-exception");
const hmac_1 = require("./../crypto/hmac");
const expired_token_exception_1 = require("./expired-token-exception");
class JsonWebToken {
    constructor(issuer, algType, key, isFullKey, expiry, claims) {
        n_defensive_1.given(issuer, "issuer").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(algType, "algType").ensureHasValue().ensure(t => t === 1 || t === 2);
        n_defensive_1.given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
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
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._isfullKey)
                throw new n_exception_1.InvalidOperationException("generating token using an instance created from token");
            let header = {
                iss: this._issuer,
                alg: this._algType,
                exp: this._expiry
            };
            let body = {};
            this._claims.forEach(t => body[t.type] = t.value);
            let headerAndBody = this.toHex(header) + "." + this.toHex(body);
            let signature = yield hmac_1.Hmac.create(this._key, headerAndBody);
            let token = headerAndBody + "." + signature;
            return token;
        });
    }
    static fromClaims(issuer, algType, key, expiry, claims) {
        return new JsonWebToken(issuer, algType, key, true, expiry, claims);
    }
    static fromToken(issuer, algType, key, token) {
        return __awaiter(this, void 0, void 0, function* () {
            n_defensive_1.given(issuer, "issuer").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
            n_defensive_1.given(algType, "algType").ensureHasValue().ensure(t => t === 1 || t === 2);
            n_defensive_1.given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
            n_defensive_1.given(token, "token").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
            issuer = issuer.trim();
            key = key.trim();
            token = token.trim();
            let tokenSplitted = token.split(".");
            if (tokenSplitted.length !== 3)
                throw new invalid_token_exception_1.InvalidTokenException(token, "format is incorrect");
            let headerString = tokenSplitted[0];
            let bodyString = tokenSplitted[1];
            let signature = tokenSplitted[2];
            let header = JsonWebToken.toObject(headerString);
            let body = JsonWebToken.toObject(bodyString);
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
            let computedSignature = yield hmac_1.Hmac.create(key, headerString + "." + bodyString);
            if (computedSignature !== signature)
                throw new invalid_token_exception_1.InvalidTokenException(token, "signature could not be verified");
            let claims = new Array();
            for (let item in body)
                claims.push(new claim_1.Claim(item, body[item]));
            return new JsonWebToken(issuer, algType, key, false, header.exp, claims);
        });
    }
    toHex(obj) {
        let json = JSON.stringify(obj);
        let hex = Buffer.from(json, "utf8").toString("hex");
        return hex.toUpperCase();
    }
    static toObject(hex) {
        let json = Buffer.from(hex.toLowerCase(), "hex").toString("utf8");
        let obj = JSON.parse(json);
        return obj;
    }
}
exports.JsonWebToken = JsonWebToken;
//# sourceMappingURL=json-web-token.js.map