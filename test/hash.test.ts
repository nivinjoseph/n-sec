import { describe, test } from "node:test";
import assert from "node:assert";
import { Hash } from "./../src/index.js";
import "@nivinjoseph/n-ext";
// import { CryptoException } from "./../src/crypto-exception";

await describe("Hash", async () =>
{
    await describe("create", async () =>
    {
        await test("must return a string value that is not null, empty, whitespace or same as input when called with a valid input", () =>
        {
            const input = "hello world";
            const hash = Hash.create(input);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            assert.ok(hash !== null && !hash.isEmptyOrWhiteSpace());
            assert.notStrictEqual(hash, input);
        });

        await test("multiple invocations with the same input must return the same output", () =>
        {
            const input = "hello world";
            const hash1 = Hash.create(input);
            const hash2 = Hash.create(input);
            assert.strictEqual(hash1, hash2);
        });

        await test("multiple invocations with the different inputs must return different outputs", () =>
        {
            const input1 = "hello world";
            const hash1 = Hash.create(input1);
            const input2 = "goodbye world";
            const hash2 = Hash.create(input2);
            assert.notStrictEqual(hash1, hash2);
        });


        // await test("successfully create a hash twice with different values", async () =>
        // {
        //     let hash1 = await Hash.create("hello world");
        //     let hash2 = await Hash.create("hello world2");
        //     assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
        //     assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
        //     assert.notStrictEqual(hash1, hash2);
        // });

        // await test("should throw CryptoException when value is null", async () =>
        // {
        //     try
        //     {
        //         await Hash.create(null);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("should throw CryptoException when value is undefined", async () =>
        // {
        //     try
        //     {
        //         await Hash.create(undefined);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("should throw CryptoException when value is empty string", async () =>
        // {
        //     try
        //     {
        //         await Hash.create("");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

    });

    await describe("createUsingSalt", async () =>
    {
        await test("must return a string value that is not null, empty, whitespace or same as input or salt when called with a valid input and salt", () =>
        {
            const input = "hello world";
            const salt = "salt";
            const hash = Hash.createUsingSalt(input, salt);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            assert.ok(hash !== null && !hash.isEmptyOrWhiteSpace());
            assert.notStrictEqual(hash, input);
            assert.notStrictEqual(hash, salt);
        });

        await test("multiple invocations with the same input and salt must return the same output", () =>
        {
            const input = "hello world";
            const salt = "salt";
            const hash1 = Hash.createUsingSalt(input, salt);
            const hash2 = Hash.createUsingSalt(input, salt);
            assert.strictEqual(hash1, hash2);
        });

        await test("multiple invocations with different inputs and different salts must return different outputs", () =>
        {
            const input1 = "hello world";
            const salt1 = "salt-1";
            const hash1 = Hash.createUsingSalt(input1, salt1);

            const input2 = "goodbye world";
            const salt2 = "salt-2";
            const hash2 = Hash.createUsingSalt(input2, salt2);

            assert.notStrictEqual(hash1, hash2);
        });

        await test("multiple invocations with different inputs and the same salt must return different outputs", () =>
        {
            const input1 = "hello world";
            const salt1 = "salt-1";
            const hash1 = Hash.createUsingSalt(input1, salt1);

            const input2 = "goodbye world";
            const hash2 = Hash.createUsingSalt(input2, salt1);

            assert.notStrictEqual(hash1, hash2);
        });

        await test("multiple invocations with the same input and different salts must return different outputs", () =>
        {
            const input = "hello world";
            const salt1 = "salt-1";
            const hash1 = Hash.createUsingSalt(input, salt1);

            const salt2 = "salt-2";
            const hash2 = Hash.createUsingSalt(input, salt2);

            assert.notStrictEqual(hash1, hash2);
        });

        await test("regex issue", () =>
        {
            let password = "YQAt3TPI7s1YXyClbQ2$&JdHOKZJ@z4!";
            password = password.trim();

            const createdAt = Date.now();
            const username = "defaultUser";

            const salt = (createdAt % 2) === 0
                ? `${username.base64Decode()}${createdAt}`
                : `${createdAt}${username.base64Decode()}`;

            Hash.createUsingSalt(password, salt);
        });




        // await test("successfully create a hash", async () =>
        // {
        //     let hash = await Hash.createUsingSalt("hello world", "some-salt");
        //     assert.ok(hash !== null && !hash.isEmptyOrWhiteSpace());
        //     assert.notStrictEqual("hello world", hash);
        // });

        // await test("successfully create a hash twice with same values and same salt", async () =>
        // {
        //     let hash1 = await Hash.createUsingSalt("hello world", "some-salt");
        //     let hash2 = await Hash.createUsingSalt("hello world", "some-salt");
        //     assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
        //     assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
        //     assert.strictEqual(hash1, hash2);
        // });

        // await test("successfully create a hash twice with same values and different salt", async () =>
        // {
        //     let hash1 = await Hash.createUsingSalt("hello world", "some-salt");
        //     let hash2 = await Hash.createUsingSalt("hello world", "some-other-salt");
        //     assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
        //     assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
        //     assert.notStrictEqual(hash1, hash2);
        // });

        // await test("successfully create a hash twice with different values same salt", async () =>
        // {
        //     let hash1 = await Hash.createUsingSalt("hello world", "some-salt");
        //     let hash2 = await Hash.createUsingSalt("hello world2", "some-salt");
        //     assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
        //     assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
        //     assert.notStrictEqual(hash1, hash2);
        // });

        // await test("should throw CryptoException when value is null", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt(null, "some-salt");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("should throw CryptoException when value is undefined", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt(undefined, "some-salt");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("should throw CryptoException when salt is null", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt("hello", null);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("should throw CryptoException when salt is undefined", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt("hello", undefined);
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("should throw CryptoException when salt is empty string", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt("hello", "");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });

        // await test("should throw CryptoException when value is empty string", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt("", "too-much-salt");
        //     }
        //     catch (exception)
        //     {
        //         assert.ok(exception instanceof CryptoException);
        //         assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     assert.ok(false);
        // });
    });
});