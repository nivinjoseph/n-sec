import "@nivinjoseph/n-ext";
export declare class Hash {
    private constructor();
    static create(value: string): Promise<string>;
    static createUsingSalt(value: string, salt: string): Promise<string>;
}
