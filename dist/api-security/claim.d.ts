export declare class Claim {
    private readonly _type;
    private readonly _value;
    get type(): string;
    get value(): any;
    constructor(type: string, value: any);
    equals(claim: Claim): boolean;
}
