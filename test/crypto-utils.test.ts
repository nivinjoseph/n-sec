import { describe, test } from "node:test";
import assert from "node:assert";
import { CryptoUtils } from "./../src/index.js";


await describe("CryptoUtils", async () =>
{
    await describe("timingSafeEquals", async () =>
    {
        await test("must return true when both values are the same", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEquals("hello world", "hello world"), true);
        });

        await test("must return false when values differ", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEquals("hello world", "goodbye world"), false);
        });

        await test("must return false when values have the same length but differ", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEquals("hello world", "hello worlD"), false);
        });

        await test("must return false when values have different lengths", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEquals("hello", "hello world"), false);
        });

        await test("must throw when a value is empty", () =>
        {
            assert.throws(() => CryptoUtils.timingSafeEquals("", "hello world"));
            assert.throws(() => CryptoUtils.timingSafeEquals("hello world", ""));
        });

        await test("must be case sensitive", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEquals("ABC", "abc"), false);
        });

        await test("must handle multi-byte characters", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEquals("héllo wörld", "héllo wörld"), true);
            assert.strictEqual(CryptoUtils.timingSafeEquals("héllo wörld", "hello world"), false);
        });
    });

    await describe("timingSafeEqualsHashed", async () =>
    {
        await test("must return true when both values are the same", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEqualsHashed("hello world", "hello world"), true);
        });

        await test("must return false when values differ", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEqualsHashed("hello world", "goodbye world"), false);
        });

        await test("must return false when values have the same length but differ", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEqualsHashed("hello world", "hello worlD"), false);
        });

        await test("must return false when values have different lengths", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEqualsHashed("hello", "hello world"), false);
        });

        await test("must throw when a value is empty", () =>
        {
            assert.throws(() => CryptoUtils.timingSafeEqualsHashed("", "hello world"));
            assert.throws(() => CryptoUtils.timingSafeEqualsHashed("hello world", ""));
        });

        await test("must be case sensitive", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEqualsHashed("ABC", "abc"), false);
        });

        await test("must handle multi-byte characters", () =>
        {
            assert.strictEqual(CryptoUtils.timingSafeEqualsHashed("héllo wörld", "héllo wörld"), true);
            assert.strictEqual(CryptoUtils.timingSafeEqualsHashed("héllo wörld", "hello world"), false);
        });
    });
});
