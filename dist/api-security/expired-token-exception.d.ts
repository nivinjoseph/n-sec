import { Exception } from "n-exception";
import "n-ext";
export declare class ExpiredTokenException extends Exception {
    private readonly _token;
    readonly token: string;
    constructor(token: string);
}
