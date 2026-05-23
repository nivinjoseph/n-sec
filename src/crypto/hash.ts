import { given } from "@nivinjoseph/n-defensive";
import { createHash, scryptSync, timingSafeEqual } from "node:crypto";


// public
export class Hash
{
    private constructor() { }


    public static create(value: string): string
    {
        given(value, "value").ensureHasValue().ensureIsString();
        value = value.trim();

        const hash = createHash("sha512");
        hash.update(value, "utf8");
        return hash.digest("hex").toUpperCase();
    }

    /**
     * @deprecated Unsafe for password storage. Uses a single round of
     *   SHA-512, which a GPU can compute at billions of hashes/second —
     *   leaked hashes can be brute-forced rapidly against any wordlist.
     *   Additionally trims leading/trailing whitespace from both `value`
     *   and `salt`, so inputs differing only in whitespace collide.
     *
     *   For password hashing, use {@link createForPassword} +
     *   {@link verifyPassword} instead.
     */
    public static createUsingSalt(value: string, salt: string): string
    {
        given(value, "value").ensureHasValue().ensureIsString();
        given(salt, "salt").ensureHasValue().ensureIsString();

        value = value.trim();
        salt = salt.trim();

        const reverse = (val: string): string =>
        {
            let rev = "";
            for (let i = 0; i < val.length; i++)
                rev = val[i] + rev;
            return rev;
        };

        const valueReverse = reverse(value);
        const saltReverse = reverse(salt);

        // const saltedValue = "{1}{0}{2}{1}{3}{1}{2}".format(value, salt, valueReverse, saltReverse);

        const saltedValue = `${salt}${value}${valueReverse}${salt}${saltReverse}${salt}${valueReverse}`;

        return Hash.create(saltedValue);
    }

    /**
     * Derives a 64-byte hash from `password` and `salt` using scrypt with
     * parameters N=2^15, r=8, p=1 (RFC 7914 recommended defaults). Suitable
     * for password storage: slow and memory-hard, so leaked hashes resist
     * GPU brute-force attacks far better than a plain SHA-512.
     *
     * Inputs are NOT trimmed — the exact bytes of `password` and `salt` are
     * hashed. Two passwords differing only in whitespace produce different
     * outputs.
     *
     * @param password - The password to hash. Hashed as UTF-8.
     * @param salt - A per-user random value (recommended: ≥16 random bytes,
     *   e.g. `randomBytes(16).toString("hex")`). Must be stored alongside
     *   the hash so the same value can be passed on verification.
     * @returns A 128-character uppercase hex string (64 bytes).
     */
    public static createForPassword(password: string, salt: string): string
    {
        given(password, "password").ensureHasValue().ensureIsString();
        given(salt, "salt").ensureHasValue().ensureIsString();

        const derived = scryptSync(password, salt, 64, {
            N: 1 << 15,
            r: 8,
            p: 1,
            maxmem: 64 * 1024 * 1024
        });
        return derived.toString("hex").toUpperCase();
    }

    /**
     * Verifies a password against a hash previously produced by
     * {@link createForPassword}. The comparison is constant-time, so
     * timing cannot be used to learn how many leading bytes matched.
     *
     * @param password - The candidate password to verify. Hashed as UTF-8.
     * @param salt - The same salt that was passed to
     *   {@link createForPassword} when the stored hash was created.
     * @param expectedHash - The previously-stored hash (hex string, any case).
     * @returns `true` if the candidate matches; `false` if it doesn't,
     *   if `expectedHash` is not valid hex, or if lengths differ.
     */
    public static verifyPassword(password: string, salt: string, expectedHash: string): boolean
    {
        given(password, "password").ensureHasValue().ensureIsString();
        given(salt, "salt").ensureHasValue().ensureIsString();
        given(expectedHash, "expectedHash").ensureHasValue().ensureIsString();

        const computed = Buffer.from(Hash.createForPassword(password, salt), "hex");
        const expected = Buffer.from(expectedHash, "hex");
        if (computed.length !== expected.length)
            return false;
        return timingSafeEqual(computed, expected);
    }
}