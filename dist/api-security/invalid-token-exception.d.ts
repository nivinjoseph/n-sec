import { Exception } from "n-exception";
import "n-ext";
export declare class InvalidTokenException extends Exception {
    private readonly _token;
    private readonly _reason;
    readonly token: string;
    readonly reason: string;
    constructor(token: string, reason: string);
}
