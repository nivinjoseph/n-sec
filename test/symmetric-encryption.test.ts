import assert from "node:assert";
import { describe, test } from "node:test";
import { CryptoException, SymmetricEncryption } from "./../src/index.js";
import "@nivinjoseph/n-ext";


await describe("SymmetricEncryption", async () =>
{
    await describe("generateKey", async () =>
    {
        await test("must return string value that is not null, empty or whitespace", () =>
        {
            const key = SymmetricEncryption.generateKey();
            console.log("key", key);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            assert.ok(key !== null && !key.isEmptyOrWhiteSpace());
        });


        await test("consecutive calls must yield unique values", () =>
        {
            const key1 = SymmetricEncryption.generateKey();
            const key2 = SymmetricEncryption.generateKey();
            assert.notStrictEqual(key1, key2);
        });
    });

    await describe("encrypt", async () =>
    {
        await test("must return cipher text value when called with key and plain text value", () =>
        {
            const key = "E25B269440F88601C453CD171D76EDDC11D8CF33230742DF8CAD5873D28F78B2";
            const value = "password";
            const encrypted = SymmetricEncryption.encrypt(key, value);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            assert.ok(encrypted !== null);
            assert.notStrictEqual(encrypted, value);
        });

        // await test("encrypt with key as null throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt(null, "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         return;
        //     }
        //     assert.ok(false);

        // });

        // await test("encrypt with key as undefined throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt(undefined, "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         return;
        //     }
        //     assert.ok(false);
        // }); 

        // await test("encrypt", async () =>
        // {
        //     let key = await SymmetricEncryption.generateKey();
        //     let value = "password";
        //     let encrypted = await SymmetricEncryption.encrypt(key, value);
        //     assert.ok(encrypted !== null);
        //     assert.notStrictEqual(value, encrypted);
        // });

        // await test("encrypt with key as null throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt(null, "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);

        // });

        // await test("encrypt with value as null throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.encrypt(key, null);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("encrypt with value as undefined throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.encrypt(key, undefined);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("encrypt with value as empty string throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.encrypt(key, "");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("encrypt with key as empty string throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt("", "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("encrypt with invalid key as empty string throws CryptoException", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.encrypt("hello", "password");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         return;
        //     }
        //     assert.ok(false);
        // });
    });

    await describe("decrypt", async () =>
    {
        await test("must return plain text value when called with key and cipher text value", () =>
        {
            const key = SymmetricEncryption.generateKey();
            const value = "password";
            const encrypted = SymmetricEncryption.encrypt(key, value);
            const decrypted = SymmetricEncryption.decrypt(key, encrypted);
            assert.strictEqual(decrypted, value);
        });

        await test("round-trips successfully when the same aad is supplied to encrypt and decrypt", () =>
        {
            const key = SymmetricEncryption.generateKey();
            const value = "password";
            const aad = "user:42|purpose:session";
            const encrypted = SymmetricEncryption.encrypt(key, value, aad);
            const decrypted = SymmetricEncryption.decrypt(key, encrypted, aad);
            assert.strictEqual(decrypted, value);
        });

        await test("throws CryptoException when decrypting with a different aad than was used to encrypt", () =>
        {
            const key = SymmetricEncryption.generateKey();
            const encrypted = SymmetricEncryption.encrypt(key, "password", "user:42");
            assert.throws(
                () => SymmetricEncryption.decrypt(key, encrypted, "user:99"),
                CryptoException
            );
        });

        await test("throws CryptoException when decrypting without aad a ciphertext that was encrypted with aad", () =>
        {
            const key = SymmetricEncryption.generateKey();
            const encrypted = SymmetricEncryption.encrypt(key, "password", "user:42");
            assert.throws(
                () => SymmetricEncryption.decrypt(key, encrypted),
                CryptoException
            );
        });

        await test("throws CryptoException when decrypting with aad a ciphertext that was encrypted without aad", () =>
        {
            const key = SymmetricEncryption.generateKey();
            const encrypted = SymmetricEncryption.encrypt(key, "password");
            assert.throws(
                () => SymmetricEncryption.decrypt(key, encrypted, "user:42"),
                CryptoException
            );
        });

        // await test("decrypt with a valid encryption key", async () =>
        // {
        //     let key = await SymmetricEncryption.generateKey();
        //     let encryption = await SymmetricEncryption.encrypt(key, "password");
        //     let decryption = await SymmetricEncryption.decrypt(key, encryption);
        //     assert.strictEqual(decryption, "password");
        // });

        // await test("decrypt with an invalid encryption key", async () =>
        // {
        //     let key = await SymmetricEncryption.generateKey();
        //     let key2 = await SymmetricEncryption.generateKey();
        //     let encryption = await SymmetricEncryption.encrypt(key, "password");
        //     let decryption = await SymmetricEncryption.decrypt(key2, encryption);
        //     assert.notStrictEqual(decryption, "password");
        // });

        // await test("throws an CryptoException when key is null", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.decrypt(null, "encryption");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //     }
        // });

        // await test("throws an CryptoException when value is null", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.decrypt(key, null);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //     }
        // });

        // await test("throws an CryptoException when value is empty string", async () =>
        // {
        //     try
        //     {
        //         let key = await SymmetricEncryption.generateKey();
        //         await SymmetricEncryption.decrypt(key, "");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //     }
        // });

        // await test("throws an CryptoException when key and value is empty string", async () =>
        // {
        //     try
        //     {
        //         await SymmetricEncryption.decrypt("", "");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //     }
        // });
    });
});