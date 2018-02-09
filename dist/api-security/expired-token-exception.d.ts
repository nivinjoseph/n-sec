import { Exception } from "@nivinjoseph/n-exception";
import "@nivinjoseph/n-ext";
export declare class ExpiredTokenException extends Exception {
    private readonly _token;
    readonly token: string;
    constructor(token: string);
}
