export declare class Hmac {
    private constructor();
    static create(key: string, value: string): Promise<string>;
}
