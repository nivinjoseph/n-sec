import * as assert from "assert";
import { SecurityCoreConfiguration } from "./../src/security-core-configuration";
import { AsymmetricEncryption, DigitalSignature } from "./../src/index";
import { CryptoException } from "./../src/crypto-exception";


suite("digitalSignature", () =>
{
    suiteSetup(() =>
    {
        SecurityCoreConfiguration.coreExePath = "./src/security-core/bin/Debug/netcoreapp2.0/security-core.dll";
    });
    
    suite("sign", () =>
    { 
        test("successfully sign using valid KeyPair and value", async () =>
        {
            let KeyPair = await AsymmetricEncryption.generateKeyPair();
            let signature = await DigitalSignature.sign(KeyPair, "password");
            assert.ok(signature !== null && !signature.isEmptyOrWhiteSpace());
            assert.notStrictEqual("password", signature);
        });
        
        test("should throw CryptoException when KeyPair is null", async () =>
        {
            try
            {
                await DigitalSignature.sign(null, "hello");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when KeyPair is undefined", async () =>
        {
            try
            {
                await DigitalSignature.sign(undefined, "hello");
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
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            try
            {
                await DigitalSignature.sign(keyPair, null);
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
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            try
            {
                await DigitalSignature.sign(keyPair, undefined);
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
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            try
            {
                await DigitalSignature.sign(keyPair, "");
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when keyPair is empty string", async () =>
        {
            try
            {
                await DigitalSignature.sign("", "password");
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
    
    suite("verify", () =>
    {
        test("successfully verify the signed", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            let signature = await DigitalSignature.sign(keyPair, "some-string");
            let verify = await DigitalSignature.verify(publicKey, "some-string", signature);
            assert.ok(verify);
        });
        
        test("un-verify modified signature", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            let signature = await DigitalSignature.sign(keyPair, "some-string");
            signature = signature + "aaaaaaaa";
            let verify = await DigitalSignature.verify(publicKey, "some-string", signature);
            assert.ok(!verify);
        });
        
        test("un-verify when wrong public key is given", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let signature = await DigitalSignature.sign(keyPair, "some-string");
            let keyPair2 = await AsymmetricEncryption.generateKeyPair();
            let publicKey2 = await AsymmetricEncryption.getPublicKey(keyPair2);
            let verify = await DigitalSignature.verify(publicKey2, "some-string", signature);
            assert.ok(!verify);
        });
        
        test("should throw CryptoException when public key is null", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let signature = await DigitalSignature.sign(keyPair, "some-string");
            try
            {
                await DigitalSignature.verify(null, "some-string", signature);
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
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let signature = await DigitalSignature.sign(keyPair, "some-string");
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            try
            {
                await DigitalSignature.verify(publicKey, null, signature);
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
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let signature = await DigitalSignature.sign(keyPair, "some-string");
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            try
            {
                await DigitalSignature.verify(publicKey, "", signature);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when signature is null", async () =>
        {
            let keyPair = await AsymmetricEncryption.generateKeyPair();
            let publicKey = await AsymmetricEncryption.getPublicKey(keyPair);
            try
            {
                await DigitalSignature.verify(publicKey, "some-string", null);
            }
            catch (exception)
            {
                assert.ok(exception instanceof CryptoException);
                assert.strictEqual(exception.message, "Parameter count mismatch.");
                return;
            }
            assert.ok(false);
        });
        
        test("should throw CryptoException when value, key pair and signature are all null", async () =>
        {
            try
            {
                await DigitalSignature.verify(null, null, null);
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