import * as assert from "assert";
import { SecurityCoreConfiguration } from "./../src/security-core-configuration";
import { Hash } from "./../src/index";
import { CryptoException } from "./../src/crypto-exception";

suite("Hash", () =>
{
    suiteSetup(() =>
    {
        SecurityCoreConfiguration.coreExePath = "./src/security-core/bin/Debug/netcoreapp2.0/security-core.dll";
    });
    
    suite("create", () =>
    {
        test("successfully create a hash", async () =>
        {
            let hash = await Hash.create("hello world");
            assert.ok(hash !== null && !hash.isEmptyOrWhiteSpace());
            assert.notStrictEqual("hello world", hash);
        });
        
        test("successfully create a hash twice with same values", async () =>
        {
            let hash1 = await Hash.create("hello world");
            let hash2 = await Hash.create("hello world");
            assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
            assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
            assert.strictEqual(hash1, hash2);
        });
        
        test("successfully create a hash twice with different values", async () =>
        {
            let hash1 = await Hash.create("hello world");
            let hash2 = await Hash.create("hello world2");
            assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
            assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
            assert.notStrictEqual(hash1, hash2);
        });
        
        test("should throw CryptoException when value is null", async () =>
        {
            try
            {
                await Hash.create(null);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when value is undefined", async () =>
        {
            try
            {
                await Hash.create(undefined);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when value is empty string", async () =>
        {
            try
            {
                await Hash.create("");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
    });
    
    suite("createUsingSalt", () =>
    {
        test("successfully create a hash", async () =>
        {
            let hash = await Hash.createUsingSalt("hello world", "some-salt");
            assert.ok(hash !== null && !hash.isEmptyOrWhiteSpace());
            assert.notStrictEqual("hello world", hash);
        });

        test("successfully create a hash twice with same values and same salt", async () =>
        {
            let hash1 = await Hash.createUsingSalt("hello world", "some-salt");
            let hash2 = await Hash.createUsingSalt("hello world", "some-salt");
            assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
            assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
            assert.strictEqual(hash1, hash2);
        });
        
        test("successfully create a hash twice with same values and different salt", async () =>
        {
            let hash1 = await Hash.createUsingSalt("hello world", "some-salt");
            let hash2 = await Hash.createUsingSalt("hello world", "some-other-salt");
            assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
            assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
            assert.notStrictEqual(hash1, hash2);
        });
        
        test("successfully create a hash twice with different values same salt", async () =>
        {
            let hash1 = await Hash.createUsingSalt("hello world", "some-salt");
            let hash2 = await Hash.createUsingSalt("hello world2", "some-salt");
            assert.ok(hash1 !== null && !hash1.isEmptyOrWhiteSpace());
            assert.ok(hash2 !== null && !hash2.isEmptyOrWhiteSpace());
            assert.notStrictEqual(hash1, hash2);
        });
        
        test("should throw CryptoException when value is null", async () =>
        {
            try
            {
                await Hash.createUsingSalt(null, "some-salt");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when value is undefined", async () =>
        {
            try
            {
                await Hash.createUsingSalt(undefined, "some-salt");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when salt is null", async () =>
        {
            try
            {
                await Hash.createUsingSalt("hello", null);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when salt is undefined", async () =>
        {
            try
            {
                await Hash.createUsingSalt("hello", undefined);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when salt is empty string", async () =>
        {
            try
            {
                await Hash.createUsingSalt("hello", "");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when value is empty string", async () =>
        {
            try
            {
                await Hash.createUsingSalt("", "too-much-salt");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
    });
});