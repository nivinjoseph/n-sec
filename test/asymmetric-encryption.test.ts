import * as assert from "assert";
import { SecurityCoreConfiguration } from "./../src/security-core-configuration";
import { AsymmetricEncryption } from "./../src/index";
import { CryptoException } from "./../src/crypto-exception";

suite("AsymmetricEncryption", () =>
{
    suiteSetup(() =>
    {
        SecurityCoreConfiguration.coreExePath = "./src/security-core/bin/Debug/netcoreapp2.0/security-core.dll";
    });
    
    suite("generateKeyPair", () =>
    { 
        test("generate a KeyPair", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            assert.ok(keyPair !== null);
        });
        
        test("generate 2 KeyPairs", async () =>
        {
            let keyPair1 = await AsymmetricEncryption.generateKeyPair();
            let keyPair2 = await AsymmetricEncryption.generateKeyPair();
            assert.ok(keyPair1 !== null);
            assert.ok(keyPair2 !== null);
            assert.notStrictEqual(keyPair1, keyPair2);
        });

        test("generate 3 KeyPairs", async () =>
        {
            let keyPair1 = await AsymmetricEncryption.generateKeyPair();
            let keyPair2 = await AsymmetricEncryption.generateKeyPair();
            let keyPair3 = await AsymmetricEncryption.generateKeyPair();
            assert.ok(keyPair1 !== null);
            assert.ok(keyPair2 !== null);
            assert.ok(keyPair3 !== null);
            assert.notStrictEqual(keyPair1, keyPair2);
            assert.notStrictEqual(keyPair1, keyPair3);
            assert.notStrictEqual(keyPair2, keyPair3);
        });
    });
    
    suite("getPublicKey", () =>
    {
        test("get 1 public key", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            assert.ok(publicKey !== null);
            assert.notStrictEqual(keyPair, publicKey);
        });
        
        test("get 2 public keys with same key pair", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey1 = await AsymmetricEncryption.getPublicKey(keyPair);
            let publicKey2 = await AsymmetricEncryption.getPublicKey(keyPair);
            assert.ok(publicKey1 !== null);
            assert.ok(publicKey2 !== null);
            assert.notStrictEqual(keyPair, publicKey1);
            assert.notStrictEqual(keyPair, publicKey2);
            assert.strictEqual(publicKey1, publicKey2);
        });
        
        test("throws CryptoException when key pair is null", async () =>
        {
            try
            {
                await AsymmetricEncryption.getPublicKey(null);
            } 
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("throws CryptoException when key pair is undefined", async () =>
        {
            try
            {
                await AsymmetricEncryption.getPublicKey(undefined);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("throws CryptoException when key pair is empty String", async () =>
        {
            try
            {
                await AsymmetricEncryption.getPublicKey("");
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
    
    suite("encrypt", () =>
    {
        test("encrypt a string with key pair", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let encrypt = await AsymmetricEncryption.encrypt(keyPair, "password");
            assert.ok(encrypt !== null && !encrypt.isEmptyOrWhiteSpace());
            assert.notStrictEqual(encrypt, "password");
        });
        
        test("encrypt a string with public Key", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            let encrypt = await AsymmetricEncryption.encrypt(publicKey, "password");
            assert.ok(encrypt !== null && !encrypt.isEmptyOrWhiteSpace());
            assert.notStrictEqual(encrypt, "password");
        });
        
        test("encrypt twice using the same key pair", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let encrypt1 = await AsymmetricEncryption.encrypt(keyPair, "password");
            let encrypt2 = await AsymmetricEncryption.encrypt(keyPair, "password");
            assert.ok(encrypt1 !== null && !encrypt1.isEmptyOrWhiteSpace());
            assert.ok(encrypt2 !== null && !encrypt2.isEmptyOrWhiteSpace());
            assert.notStrictEqual(encrypt1, "password");
            assert.notStrictEqual(encrypt2, "password");
            assert.strictEqual(encrypt2, encrypt1);
        });
        
        test("encrypt 2 strings using the same key pair", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let encrypt1 = await AsymmetricEncryption.encrypt(keyPair, "hello world");
            let encrypt2 = await AsymmetricEncryption.encrypt(keyPair, "password");
            assert.ok(encrypt1 !== null && !encrypt1.isEmptyOrWhiteSpace());
            assert.ok(encrypt2 !== null && !encrypt2.isEmptyOrWhiteSpace());
            assert.notStrictEqual(encrypt1, "hello world");
            assert.notStrictEqual(encrypt2, "password");
            assert.notStrictEqual(encrypt2, encrypt1);
        });
        
        test("throws CryptoException when key pair is null", async () =>
        {
            try
            {
                await AsymmetricEncryption.encrypt(null, "password");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("throws CryptoException when key pair is undefined", async () =>
        {
            try
            {
                await AsymmetricEncryption.encrypt(undefined, "password");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("throws CryptoException when key pair is empty string", async () =>
        {
            try
            {
                await AsymmetricEncryption.encrypt("", "password");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("throws CryptoException when key pair is empty string", async () =>
        {
            try
            {
                let keyPair = await AsymmetricEncryption.generateKeyPair();
                await AsymmetricEncryption.encrypt(keyPair, "");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("throws CryptoException when key pair and value are empty strings", async () =>
        {
            try
            {
                await AsymmetricEncryption.encrypt("", "");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("encrypt using public key and key pair", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let encrypt1 = await AsymmetricEncryption.encrypt(keyPair, "hello world");
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            let encrypt2 = await AsymmetricEncryption.encrypt(publicKey, "hello world");
            assert.ok(encrypt1 !== null && !encrypt1.isEmptyOrWhiteSpace());
            assert.ok(encrypt2 !== null && !encrypt2.isEmptyOrWhiteSpace());
            assert.notStrictEqual(encrypt1, "hello world");
            assert.notStrictEqual(encrypt2, "hello world");
            assert.notStrictEqual(encrypt1, encrypt2);
        });
    });
    
    suite("decrypt", () =>
    {
        test("decrypt using public key when encrypted by key pair", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            let encrypt = await AsymmetricEncryption.encrypt(keyPair, "password");
            let decrypt = await AsymmetricEncryption.decrypt(publicKey, encrypt);
            assert.ok(decrypt !== null && !decrypt.isEmptyOrWhiteSpace());
            assert.strictEqual(decrypt, "password");
        });
        
        test("decrypt using key pair when encrypted by public key", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            let encrypt = await AsymmetricEncryption.encrypt(publicKey, "password");
            let decrypt = await AsymmetricEncryption.decrypt(keyPair, encrypt);
            assert.ok(decrypt !== null && !decrypt.isEmptyOrWhiteSpace());
            assert.strictEqual(decrypt, "password");
        });
        
        test("decrypt using key pair when encrypted by key pair", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let encrypt = await AsymmetricEncryption.encrypt(keyPair, "password");
            let decrypt = await AsymmetricEncryption.decrypt(keyPair, encrypt);
            assert.notStrictEqual(decrypt, "password");
        });
        
        test("decrypt using public key when encrypted by public key", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            let encrypt = await AsymmetricEncryption.encrypt(publicKey, "password");
            let decrypt = await AsymmetricEncryption.decrypt(publicKey, encrypt);
            assert.notStrictEqual(decrypt, "password");
        });
        
        test("throws CryptoException when key is null", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let encrypt = await AsymmetricEncryption.encrypt(keyPair, "password");
            try
            {
                await AsymmetricEncryption.decrypt(null, encrypt);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("throws CryptoException when key is undefined", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let encrypt = await AsymmetricEncryption.encrypt(keyPair, "password");
            try
            {
                await AsymmetricEncryption.decrypt(undefined, encrypt);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("throws CryptoException when value is null", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            try
            {
                await AsymmetricEncryption.decrypt(publicKey, null);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });

        test("throws CryptoException when value is undefined", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            try
            {
                await AsymmetricEncryption.decrypt(publicKey, undefined);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("throws CryptoException when key and value is null", async () =>
        {
            try
            {
                await AsymmetricEncryption.decrypt(null, null);
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