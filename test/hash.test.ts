import * as Assert from "assert";
import { Hash } from "./../src/index";
import "@nivinjoseph/n-ext";
// import { CryptoException } from "./../src/crypto-exception";

suite("Hash", () =>
{
    suite("create", () =>
    {
        test("must return a string value that is not null, empty, whitespace or same as input when called with a valid input", () =>
        {
            let input = "hello world";
            let hash = Hash.create(input);
            Assert.ok(hash !== null && !hash.isEmptyOrWhiteSpace());
            Assert.notStrictEqual(hash, input);
        });
        
        test("multiple invocations with the same input must return the same output", () =>
        {
            let input = "hello world";
            let hash1 = Hash.create(input);
            let hash2 = Hash.create(input);
            Assert.strictEqual(hash1, hash2);
        });
        
        test("multiple invocations with the different inputs must return different outputs", () =>
        {
            let input1 = "hello world";
            let hash1 = Hash.create(input1);
            let input2 = "goodbye world";
            let hash2 = Hash.create(input2);
            Assert.notStrictEqual(hash1, hash2);
        });
        
        
        // test("successfully create a hash twice with different values", async () =>
        // {
        //     let hash1 = await Hash.create("hello world");
        //     let hash2 = await Hash.create("hello world2");
        //     Assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
        //     Assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
        //     Assert.notStrictEqual(hash1, hash2);
        // });
        
        // test("should throw CryptoException when value is null", async () =>
        // {
        //     try
        //     {
        //         await Hash.create(null);
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when value is undefined", async () =>
        // {
        //     try
        //     {
        //         await Hash.create(undefined);
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when value is empty string", async () =>
        // {
        //     try
        //     {
        //         await Hash.create("");
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
    });
    
    suite("createUsingSalt", () =>
    {
        test("must return a string value that is not null, empty, whitespace or same as input or salt when called with a valid input and salt", () =>
        {
            let input = "hello world";
            let salt = "salt";
            let hash = Hash.createUsingSalt(input, salt);
            Assert.ok(hash !== null && !hash.isEmptyOrWhiteSpace());
            Assert.notStrictEqual(hash, input);
            Assert.notStrictEqual(hash, salt);
        });

        test("multiple invocations with the same input and salt must return the same output", () =>
        {
            let input = "hello world";
            let salt = "salt";
            let hash1 = Hash.createUsingSalt(input, salt);
            let hash2 = Hash.createUsingSalt(input, salt);
            Assert.strictEqual(hash1, hash2);
        });

        test("multiple invocations with different inputs and different salts must return different outputs", () =>
        {
            let input1 = "hello world";
            let salt1 = "salt-1";
            let hash1 = Hash.createUsingSalt(input1, salt1);
            
            let input2 = "goodbye world";
            let salt2 = "salt-2";
            let hash2 = Hash.createUsingSalt(input2, salt2);
            
            Assert.notStrictEqual(hash1, hash2);
        });
        
        test("multiple invocations with different inputs and the same salt must return different outputs", () =>
        {
            let input1 = "hello world";
            let salt1 = "salt-1";
            let hash1 = Hash.createUsingSalt(input1, salt1);

            let input2 = "goodbye world";
            let hash2 = Hash.createUsingSalt(input2, salt1);

            Assert.notStrictEqual(hash1, hash2);
        });
        
        test("multiple invocations with the same input and different salts must return different outputs", () =>
        {
            let input = "hello world";
            let salt1 = "salt-1";
            let hash1 = Hash.createUsingSalt(input, salt1);

            let salt2 = "salt-2";
            let hash2 = Hash.createUsingSalt(input, salt2);

            Assert.notStrictEqual(hash1, hash2);
        });
        
        
        
        
        
        // test("successfully create a hash", async () =>
        // {
        //     let hash = await Hash.createUsingSalt("hello world", "some-salt");
        //     Assert.ok(hash !== null && !hash.isEmptyOrWhiteSpace());
        //     Assert.notStrictEqual("hello world", hash);
        // });

        // test("successfully create a hash twice with same values and same salt", async () =>
        // {
        //     let hash1 = await Hash.createUsingSalt("hello world", "some-salt");
        //     let hash2 = await Hash.createUsingSalt("hello world", "some-salt");
        //     Assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
        //     Assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
        //     Assert.strictEqual(hash1, hash2);
        // });
        
        // test("successfully create a hash twice with same values and different salt", async () =>
        // {
        //     let hash1 = await Hash.createUsingSalt("hello world", "some-salt");
        //     let hash2 = await Hash.createUsingSalt("hello world", "some-other-salt");
        //     Assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
        //     Assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
        //     Assert.notStrictEqual(hash1, hash2);
        // });
        
        // test("successfully create a hash twice with different values same salt", async () =>
        // {
        //     let hash1 = await Hash.createUsingSalt("hello world", "some-salt");
        //     let hash2 = await Hash.createUsingSalt("hello world2", "some-salt");
        //     Assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
        //     Assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
        //     Assert.notStrictEqual(hash1, hash2);
        // });
        
        // test("should throw CryptoException when value is null", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt(null, "some-salt");
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when value is undefined", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt(undefined, "some-salt");
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when salt is null", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt("hello", null);
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when salt is undefined", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt("hello", undefined);
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when salt is empty string", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt("hello", "");
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
        
        // test("should throw CryptoException when value is empty string", async () =>
        // {
        //     try
        //     {
        //         await Hash.createUsingSalt("", "too-much-salt");
        //     }
        //     catch (exception)
        //     {
        //         Assert.ok(exception instanceof CryptoException);
        //         Assert.strictEqual(exception.message, "Parameter count mismatch.");
        //         return;
        //     }
        //     Assert.ok(false);
        // });
    });
});