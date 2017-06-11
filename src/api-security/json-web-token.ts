import { Claim } from "./claim";
import { given } from "n-defensive";
import "n-ext";
import { InvalidTokenException } from "./invalid-token-exception";
import { AlgType } from "./alg-type";
import { InvalidOperationException } from "n-exception";
import { Hmac } from "./../crypto/hmac";
import { DigitalSignature } from "./../crypto/digital-signature";
import { ExpiredTokenException } from "./expired-token-exception";


// public
export class JsonWebToken
{
    private readonly _issuer: string;
    private readonly _algType: AlgType;
    private readonly _key: string;
    private readonly _isfullKey: boolean;
    private readonly _expiry: number;
    private readonly _claims: Array<Claim>;

    
    public get issuer(): string { return this._issuer; }
    public get algType(): AlgType { return this._algType; }
    public get key(): string { return this._key; }
    public get canGenerateToken(): boolean { return this._isfullKey; }
    public get expiry(): number { return this._expiry; }
    public get isExpired(): boolean { return this._expiry <= Date.now(); }
    public get claims(): ReadonlyArray<Claim> { return this._claims; }
    
    
    private constructor(issuer: string, algType: AlgType, key: string, isFullKey: boolean, expiry: number,
        claims: Array<Claim>)
    {
        given(issuer, "issuer").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        given(algType, "algType").ensureHasValue().ensure(t => t === 1 || t === 2);
        given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        given(isFullKey, "isFullKey").ensureHasValue();
        given(expiry, "expiry").ensureHasValue();
        given(claims, "claims")
            .ensureHasValue()
            .ensure(t => t.length > 0);
        
        this._issuer = issuer.trim();
        this._algType = algType;
        this._key = key.trim();
        this._isfullKey = isFullKey;
        this._expiry = expiry;
        this._claims = [...claims];
    }
    
    public async generateToken(): Promise<string>
    {
        if (!this._isfullKey)
            throw new InvalidOperationException("generating token using an instance created from token");    
        
        let header: Header = {
            iss: this._issuer,
            alg: this._algType,
            exp: this._expiry
        };
        
        let body: any = {};
        this._claims.forEach(t => body[t.type] = t.value);
        
        let headerAndBody = this.toHex(header) + "." + this.toHex(body);
        
        let signature = this._algType === AlgType.hmac
            ? await Hmac.create(this._key, headerAndBody)
            : await DigitalSignature.sign(this._key, headerAndBody);
        
        let token = headerAndBody + "." + signature;
        return token;
    }
    
    
    public static fromClaims(issuer: string, algType: AlgType, key: string, expiry: number,
        claims: Array<Claim>): JsonWebToken
    {
        return new JsonWebToken(issuer, algType, key, true, expiry, claims);
    }
    
    public static async fromToken(issuer: string, algType: AlgType, key: string, token: string): Promise<JsonWebToken>
    {
        given(issuer, "issuer").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        given(algType, "algType").ensureHasValue().ensure(t => t === 1 || t === 2);
        given(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        given(token, "token").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        
        issuer = issuer.trim();
        key = key.trim();
        token = token.trim();
        
        let tokenSplitted = token.split(".");
        if (tokenSplitted.length !== 3)
            throw new InvalidTokenException(token, "format is incorrect");
        
        let headerString = tokenSplitted[0];
        let bodyString = tokenSplitted[1];
        let signature = tokenSplitted[2];
        
        let header: Header = JsonWebToken.toObject(headerString) as Header;
        let body: any = JsonWebToken.toObject(bodyString);
        
        if (header.iss === undefined || header.iss === null)
            throw new InvalidTokenException(token, "iss was not present");
        
        if (header.iss !== issuer)
            throw new InvalidTokenException(token,
                `iss was expected to be '${issuer}' but instead was '${header.iss}'`);    
        
        if (header.alg === undefined || header.alg === null)
            throw new InvalidTokenException(token, "alg was not present");
        
        if (header.alg !== algType)
            throw new InvalidTokenException(token,
                `alg was expected to be '${algType}' but instead was '${header.alg}'`);    
        
        if (header.exp === undefined || header.exp === null)
            throw new InvalidTokenException(token, "exp was not present");
        
        if (typeof (header.exp) !== "number")
            throw new InvalidTokenException(token, `exp value '${header.exp}' is invalid`);
        
        if (header.exp <= Date.now())
            throw new ExpiredTokenException(token);
        
        if (algType === AlgType.hmac)
        {
            let computedSignature = await Hmac.create(key, headerString + "." + bodyString);
            if (computedSignature !== signature)
                throw new InvalidTokenException(token, "signature could not be verified");    
        }   
        else
        {
            let verification = await DigitalSignature.verify(key, headerString + "." + bodyString, signature);
            if (!verification)
                throw new InvalidTokenException(token, "signature could not be verified");  
        }    
        
        let claims = new Array<Claim>();
        for (let item in body)
            claims.push(new Claim(item, body[item]));    
        
        return new JsonWebToken(issuer, algType, key, false, header.exp, claims);
    }
    
    private toHex(obj: object): string
    {
        let json = JSON.stringify(obj);
        let hex = Buffer.from(json, "utf8").toString("hex");
        return hex.toUpperCase();
    }
    
    private static toObject(hex: string): object
    {
        let json = Buffer.from(hex.toLowerCase(), "hex").toString("utf8");
        let obj = JSON.parse(json);
        return obj;
    }
}


interface Header
{
    iss: string;
    alg: AlgType;
    exp: number;
}