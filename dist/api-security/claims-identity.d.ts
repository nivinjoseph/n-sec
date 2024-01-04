import { Claim } from "./claim.js";
export declare class ClaimsIdentity {
    private readonly _claims;
    get claims(): ReadonlyArray<Claim>;
    constructor(claims: ReadonlyArray<Claim>);
    hasClaim(claim: Claim): boolean;
}
//# sourceMappingURL=claims-identity.d.ts.map