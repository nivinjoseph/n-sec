import { given } from "@nivinjoseph/n-defensive";
import { createHash, timingSafeEqual } from "node:crypto";


// public
export class CryptoUtils
{
    private constructor() { }


    public static timingSafeEquals(value1: string, value2: string): boolean
    {
        given(value1, "value1").ensureHasValue().ensureIsString();
        given(value2, "value2").ensureHasValue().ensureIsString();

        const buffer1 = Buffer.from(value1, "utf8");
        const buffer2 = Buffer.from(value2, "utf8");

        if (buffer1.length !== buffer2.length)
            return false;

        return timingSafeEqual(buffer1, buffer2);
    }

    /**
     * Like `timingSafeEquals`, but does not leak the length of the values through timing.
     * Both values are hashed to fixed-length digests before comparison, so use this
     * when the length of the expected value is itself confidential (e.g. passphrases).
     */
    public static timingSafeEqualsHashed(value1: string, value2: string): boolean
    {
        given(value1, "value1").ensureHasValue().ensureIsString();
        given(value2, "value2").ensureHasValue().ensureIsString();

        const digest1 = createHash("sha256").update(value1, "utf8").digest();
        const digest2 = createHash("sha256").update(value2, "utf8").digest();

        return timingSafeEqual(digest1, digest2);
    }
}
