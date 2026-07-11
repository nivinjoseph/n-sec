export declare class CryptoUtils {
    private constructor();
    static timingSafeEquals(value1: string, value2: string): boolean;
    /**
     * Like `timingSafeEquals`, but does not leak the length of the values through timing.
     * Both values are hashed to fixed-length digests before comparison, so use this
     * when the length of the expected value is itself confidential (e.g. passphrases).
     */
    static timingSafeEqualsHashed(value1: string, value2: string): boolean;
}
//# sourceMappingURL=crypto-utils.d.ts.map