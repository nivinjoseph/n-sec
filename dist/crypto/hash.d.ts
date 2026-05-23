export declare class Hash {
    private constructor();
    static create(value: string): string;
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
    static createUsingSalt(value: string, salt: string): string;
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
    static createForPassword(password: string, salt: string): string;
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
    static verifyPassword(password: string, salt: string, expectedHash: string): boolean;
}
//# sourceMappingURL=hash.d.ts.map