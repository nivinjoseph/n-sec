import { Exception } from "@nivinjoseph/n-exception";
import "@nivinjoseph/n-ext";
export declare class InvalidTokenException extends Exception {
    private readonly _token;
    private readonly _reason;
    readonly token: string;
    readonly reason: string;
    constructor(token: string, reason: string);
}
