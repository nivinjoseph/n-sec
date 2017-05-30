import * as assert from "assert";
import { SecurityCoreConfiguration } from "./../src/security-core-configuration";
import { SymmetricEncryption } from "./../src/index";
import { CryptoException } from "./../src/crypto-exception";


suite("SymmetricEncryption", () =>
{
    suiteSetup(() =>
    {
        SecurityCoreConfiguration.coreExePath = "./src/security-core/bin/Debug/netcoreapp2.0/security-core.dll";
    });
    
    suite("generateKey", () =>
    { 
        test("generate 2 Keys", async () =>
        {
            let key1 = await SymmetricEncryption.generateKey();
            let key2 = await SymmetricEncryption.generateKey();
            assert.ok(key1 !== null);
            assert.ok(key2 !== null);
            assert.notStrictEqual(key1, key2);
        });

        test("generate 3 Keys", async () =>
        {
            let key1 = await SymmetricEncryption.generateKey();
            let key2 = await SymmetricEncryption.generateKey();
            let key3 = await SymmetricEncryption.generateKey();
            assert.ok(key1 !== null);
            assert.ok(key2 !== null);
            assert.ok(key3 !== null);
            assert.notStrictEqual(key1, key2);
            assert.notStrictEqual(key1, key3);
            assert.notStrictEqual(key2, key3);
        });
    });    
    
    suite("encrypt", () =>
    { 
        test("encrypt successfully", async () =>
        {
            let value = "password";
            let encrypted = await SymmetricEncryption.encrypt("key", value);
            assert.ok(encrypted !== null);
            assert.notStrictEqual(value, encrypted);
        });

        test("encrypt with key as null throws CryptoException", async () =>
        {
            try
            {
                await SymmetricEncryption.encrypt(null, "password");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                return;
            }
            assert.ok(false);

        });

        test("encrypt with key as undefined throws CryptoException", async () =>
        {
            try
            {
                await SymmetricEncryption.encrypt(undefined, "password");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                return;
            }
            assert.ok(false);
        }); 
        
        test("encrypt", async () =>
        {
            let key = await SymmetricEncryption.generateKey();
            let value = "password";
            let encrypted = await SymmetricEncryption.encrypt(key, value);
            assert.ok(encrypted !== null);
            assert.notStrictEqual(value, encrypted);
        });

        test("encrypt with key as null throws CryptoException", async () =>
        {
            try
            {
                await SymmetricEncryption.encrypt(null, "password");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);

        });

        test("encrypt with value as null throws CryptoException", async () =>
        {
            try
            {
                let key = await SymmetricEncryption.generateKey();
                await SymmetricEncryption.encrypt(key, null);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("encrypt with value as undefined throws CryptoException", async () =>
        {
            try
            {
                let key = await SymmetricEncryption.generateKey();
                await SymmetricEncryption.encrypt(key, undefined);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("encrypt with value as empty string throws CryptoException", async () =>
        {
            try
            {
                let key = await SymmetricEncryption.generateKey();
                await SymmetricEncryption.encrypt(key, "");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("encrypt with key as empty string throws CryptoException", async () =>
        {
            try
            {
                await SymmetricEncryption.encrypt("", "password");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test.skip("encrypt with invalid key as empty string throws CryptoException", async () =>
        {
            try
            {
                await SymmetricEncryption.encrypt("hello", "password");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                return;
            }
            assert.ok(false);
        });
    });
    
    suite("decrypt", () =>
    {
        test("decrypt with a valid encryption key", async () =>
        {
            let key = await SymmetricEncryption.generateKey();
            let encryption = await SymmetricEncryption.encrypt(key, "password");
            let decryption = await SymmetricEncryption.decrypt(key, encryption);
            assert.strictEqual(decryption, "password");
        });
        
        test("decrypt with an invalid encryption key", async () =>
        {
            let key = await SymmetricEncryption.generateKey();
            let key2 = await SymmetricEncryption.generateKey();
            let encryption = await SymmetricEncryption.encrypt(key, "password");
            let decryption = await SymmetricEncryption.decrypt(key2, encryption);
            assert.notStrictEqual(decryption, "password");
        });
        
        test("throws an CryptoException when key is null", async () =>
        {
            try
            {
                await SymmetricEncryption.decrypt(null, "encryption");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
            }
        });
        
        test("throws an CryptoException when value is null", async () =>
        {
            try
            {
                let key = await SymmetricEncryption.generateKey();
                await SymmetricEncryption.decrypt(key, null);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
            }
        });
        
        test("throws an CryptoException when value is empty string", async () =>
        {
            try
            {
                let key = await SymmetricEncryption.generateKey();
                await SymmetricEncryption.decrypt(key, "");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
            }
        });
        
        test("throws an CryptoException when key and value is empty string", async () =>
        {
            try
            {
                await SymmetricEncryption.decrypt("", "");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
            }
        });
    });
});