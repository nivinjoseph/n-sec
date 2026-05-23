export declare class SymmetricEncryption {
    private constructor();
    /**
     * Generates a cryptographically random 256-bit key suitable for use with
     * {@link encrypt} and {@link decrypt}.
     *
     * @returns A 64-character uppercase hex string (32 bytes) sourced from the
     *   platform CSPRNG via Node's `crypto.randomBytes`.
     */
    static generateKey(): string;
    /**
     * Encrypts a UTF-8 string using AES-256-GCM with a fresh random 96-bit IV.
     *
     * The result is an authenticated ciphertext: any bit-flip, truncation, or
     * substitution will cause {@link decrypt} to throw a {@link CryptoException}.
     *
     * @param key - A 64-character hex string (32 bytes) as produced by
     *   {@link generateKey}. Case-insensitive.
     * @param value - The plaintext to encrypt. Interpreted as UTF-8.
     * @param aad - Optional Additional Authenticated Data. When supplied, its
     *   UTF-8 bytes are bound into the auth tag but not stored in the output;
     *   the exact same `aad` must be passed to {@link decrypt}, otherwise
     *   decryption will fail. Use this to bind a ciphertext to its context
     *   (e.g. `` `user:${userId}` ``) so a valid ciphertext from one record
     *   cannot be substituted into another.
     * @returns An uppercase hex string in the form `IV.CIPHERTEXT.TAG`, where
     *   `IV` is 24 hex chars (12 bytes), `TAG` is 32 hex chars (16 bytes), and
     *   `CIPHERTEXT` is the encrypted payload.
     * @throws {CryptoException} If `key` is not exactly 64 hex characters.
     */
    static encrypt(key: string, value: string, aad?: string): string;
    /**
     * Decrypts a ciphertext produced by {@link encrypt} and returns the
     * original UTF-8 plaintext. Integrity is verified via the GCM auth tag
     * before the plaintext is returned — if verification fails, nothing is
     * returned.
     *
     * @param key - The same 64-character hex key that was used to encrypt.
     *   Case-insensitive.
     * @param value - The ciphertext string in `IV.CIPHERTEXT.TAG` form as
     *   produced by {@link encrypt}.
     * @param aad - The same Additional Authenticated Data that was supplied
     *   to {@link encrypt}, or omitted if none was supplied. Any mismatch
     *   (wrong value, supplied here but not at encrypt, or vice versa) will
     *   cause the auth tag check to fail.
     * @returns The original plaintext decoded as UTF-8.
     * @throws {CryptoException} If `key` is not exactly 64 hex characters,
     *   if `value` is not in the expected `IV.CIPHERTEXT.TAG` format with
     *   correct component lengths, or if the auth tag verification fails
     *   (wrong key, tampered ciphertext, or mismatched `aad`).
     */
    static decrypt(key: string, value: string, aad?: string): string;
    private static _decodeKey;
}
//# sourceMappingURL=symmetric-encryption.d.ts.map