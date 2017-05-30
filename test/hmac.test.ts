import * as assert from "assert";
import { SecurityCoreConfiguration } from "./../src/security-core-configuration";
import { Hmac, SymmetricEncryption } from "./../src/index";
import { CryptoException } from "./../src/crypto-exception";

suite("Hmac", () =>
{
    suiteSetup(() =>
    {
        SecurityCoreConfiguration.coreExePath = "./src/security-core/bin/Debug/netcoreapp2.0/security-core.dll";
    });
    
    suite("create", () =>
    {
        test("should create a Hmac for a given value", async () =>
        {
            let key = await SymmetricEncryption.generateKey();
            let hmac = await Hmac.create(key, "some-string");
            assert.ok(hmac !== null && !hmac.isEmptyOrWhiteSpace());
            assert.notStrictEqual(hmac, "some-string");
        });
        
        test("should create same Hmacs for a given value and key", async () =>
        {
            let key = await SymmetricEncryption.generateKey();
            let hmac1 = await Hmac.create(key, "some-string");
            let hmac2 = await Hmac.create(key, "some-string");
            assert.ok(hmac1 !== null && !hmac1.isEmptyOrWhiteSpace());
            assert.ok(hmac2 !== null && !hmac2.isEmptyOrWhiteSpace());
            assert.notStrictEqual(hmac1, "some-string");
            assert.notStrictEqual(hmac2, "some-string");
            assert.strictEqual(hmac1, hmac2);
        });
        
        test("should throw CryptoException when key is null", async () =>
        {
            try
            {
                await Hmac.create(null, "some-string");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when value is null", async () =>
        {
            try
            {
                let key = await SymmetricEncryption.generateKey();
                await Hmac.create(key, null);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when key is undefined", async () =>
        {
            try
            {
                await Hmac.create(undefined, "some-string");
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
                let key = await SymmetricEncryption.generateKey();
                await Hmac.create(key, undefined);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when invalid key", async () =>
        {
            try
            {
                await Hmac.create("key", "hello world");
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