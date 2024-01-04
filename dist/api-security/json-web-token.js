import { given } from "@nivinjoseph/n-defensive";
import { InvalidOperationException } from "@nivinjoseph/n-exception";
import { Hmac } from "./../crypto/hmac.js";
import { AlgType } from "./alg-type.js";
import { Claim } from "./claim.js";
import { InvalidTokenException } from "./invalid-token-exception.js";
// import { DigitalSignature } from "./../crypto/digital-signature.js";
import { ExpiredTokenException } from "./expired-token-exception.js";
// public
export class JsonWebToken {
    get issuer() { return this._issuer; }
    get algType() { return this._algType; }
    get key() { return this._key; }
    get canGenerateToken() { return this._isfullKey; }
    get expiry() { return this._expiry; }
    get isExpired() { return this._expiry <= Date.now(); }
    get claims() { return this._claims; }
    constructor(issuer, algType, key, isFullKey, expiry, claims) {
        given(issuer, "issuer").ensureHasValue().ensureIsString();
        given(algType, "algType").ensureHasValue().ensureIsEnum(AlgType);
        given(key, "key").ensureHasValue().ensureIsString();
        given(isFullKey, "isFullKey").ensureHasValue().ensureIsBoolean();
        given(expiry, "expiry").ensureHasValue().ensureIsNumber();
        given(claims, "claims").ensureHasValue().ensureIsArray()
            .ensure(t => t.isNotEmpty, "cannot be empty");
        this._issuer = issuer.trim();
        this._algType = algType;
        this._key = key.trim();
        this._isfullKey = isFullKey;
        this._expiry = expiry;
        this._claims = [...claims];
    }
    static fromClaims(issuer, algType, key, expiry, claims) {
        return new JsonWebToken(issuer, algType, key, true, expiry, claims);
    }
    static fromToken(issuer, algType, key, token) {
        given(issuer, "issuer").ensureHasValue();
        given(algType, "algType").ensureHasValue().ensureIsEnum(AlgType);
        given(key, "key").ensureHasValue();
        given(token, "token").ensureHasValue();
        issuer = issuer.trim();
        key = key.trim();
        token = token.trim();
        const tokenSplitted = token.split(".");
        if (tokenSplitted.length !== 3)
            throw new InvalidTokenException(token, "format is incorrect");
        const headerString = tokenSplitted[0];
        const bodyString = tokenSplitted[1];
        const signature = tokenSplitted[2];
        const header = JsonWebToken._toObject(headerString);
        const body = JsonWebToken._toObject(bodyString);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (header.iss === undefined || header.iss === null)
            throw new InvalidTokenException(token, "iss was not present");
        if (header.iss !== issuer)
            throw new InvalidTokenException(token, `iss was expected to be '${issuer}' but instead was '${header.iss}'`);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (header.alg === undefined || header.alg === null)
            throw new InvalidTokenException(token, "alg was not present");
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (header.alg !== algType)
            throw new InvalidTokenException(token, `alg was expected to be '${algType}' but instead was '${header.alg}'`);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (header.exp === undefined || header.exp === null)
            throw new InvalidTokenException(token, "exp was not present");
        if (typeof header.exp !== "number")
            throw new InvalidTokenException(token, `exp value '${header.exp}' is invalid`);
        if (header.exp <= Date.now())
            throw new ExpiredTokenException(token);
        // if (algType === AlgType.hmac)
        // {
        //     let computedSignature = await Hmac.create(key, headerString + "." + bodyString);
        //     if (computedSignature !== signature)
        //         throw new InvalidTokenException(token, "signature could not be verified");    
        // }   
        // else
        // {
        //     let verification = await DigitalSignature.verify(key, headerString + "." + bodyString, signature);
        //     if (!verification)
        //         throw new InvalidTokenException(token, "signature could not be verified");  
        // }    
        const computedSignature = Hmac.create(key, headerString + "." + bodyString);
        if (computedSignature !== signature)
            throw new InvalidTokenException(token, "signature could not be verified");
        const claims = new Array();
        for (const item in body)
            claims.push(new Claim(item, body[item]));
        return new JsonWebToken(issuer, algType, key, false, header.exp, claims);
    }
    static _toObject(hex) {
        const json = Buffer.from(hex.toLowerCase(), "hex").toString("utf8");
        const obj = JSON.parse(json);
        return obj;
    }
    generateToken() {
        if (!this._isfullKey)
            throw new InvalidOperationException("generating token using an instance created from token");
        const header = {
            iss: this._issuer,
            alg: this._algType,
            exp: this._expiry
        };
        const body = {};
        this._claims.forEach(t => body[t.type] = t.value);
        const headerAndBody = this._toHex(header) + "." + this._toHex(body);
        // let signature = this._algType === AlgType.hmac
        //     ? await Hmac.create(this._key, headerAndBody)
        //     : await DigitalSignature.sign(this._key, headerAndBody);
        const signature = Hmac.create(this._key, headerAndBody);
        const token = headerAndBody + "." + signature;
        return token;
    }
    _toHex(obj) {
        const json = JSON.stringify(obj);
        const hex = Buffer.from(json, "utf8").toString("hex");
        return hex.toUpperCase();
    }
}
//# sourceMappingURL=json-web-token.js.map