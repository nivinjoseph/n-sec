import { describe, test } from "node:test";
import assert from "node:assert";
import { JsonWebToken } from "./../src/api-security/json-web-token.js";
import { Claim } from "../src/api-security/claim.js";
import { SymmetricEncryption } from "../src/index.js";
import { InvalidTokenException } from "../src/api-security/invalid-token-exception.js";
import { ExpiredTokenException } from "../src/api-security/expired-token-exception.js";


await describe("Json Web Token ", async () =>
{
    await describe("Hmac", async () =>
    {

        await test("should successfully create a token using hmac with one claim", async () =>
        {
            const claim = new Claim("this_claim", "ThisValue");
            const key = await SymmetricEncryption.generateKey();
            const time = Date.now();
            const token = JsonWebToken.fromClaims("issuer1", 1, key, time + 10000000, [claim]).generateToken();
            const jwt = JsonWebToken.fromToken("issuer1", 1, key, token);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            assert.ok(jwt !== null || jwt !== undefined);
            assert.strictEqual(jwt.issuer, "issuer1");
            assert.strictEqual(jwt.algType, 1);
            assert.strictEqual(jwt.expiry, time + 10000000);
            assert.deepStrictEqual(jwt.claims, [claim]);
        });

        await test("should successfully create a token using hmac with 2 claims", async () =>
        {
            const claim1 = new Claim("this_claim", "ThisValue");
            const claim2 = new Claim("that_claim", "ThatValue");
            const key = await SymmetricEncryption.generateKey();
            const time = Date.now();
            const token = JsonWebToken.fromClaims("issuer1", 1, key, time + 10000000, [claim1, claim2]).generateToken();
            const jwt = JsonWebToken.fromToken("issuer1", 1, key, token);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            assert.ok(jwt !== null || jwt !== undefined);
            assert.strictEqual(jwt.issuer, "issuer1");
            assert.strictEqual(jwt.algType, 1);
            assert.strictEqual(jwt.expiry, time + 10000000);
            assert.deepStrictEqual(jwt.claims, [claim1, claim2]);
        });

        await test("should successfully create a token using hmac with 2 claims", async () =>
        {
            const claim1 = new Claim("this_claim", "ThisValue");
            const claim2 = new Claim("that_claim", "ThatValue");
            const key = await SymmetricEncryption.generateKey();
            const time = Date.now();
            const token = JsonWebToken.fromClaims("issuer1", 1, key, time + 10000000, [claim1, claim2]).generateToken();
            const jwt = JsonWebToken.fromToken("issuer1", 1, key, token);
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            assert.ok(jwt !== null || jwt !== undefined);
            assert.strictEqual(jwt.issuer, "issuer1");
            assert.strictEqual(jwt.algType, 1);
            assert.strictEqual(jwt.expiry, time + 10000000);
            assert.deepStrictEqual(jwt.claims, [claim1, claim2]);
        });

        await test("should throw an exception when getting JWT with a different issuer that what was user to generate token", async () =>
        {
            const claim1 = new Claim("this_claim", "ThisValue");
            const claim2 = new Claim("that_claim", "ThatValue");
            const key = await SymmetricEncryption.generateKey();
            const time = Date.now();
            const token = JsonWebToken.fromClaims("issuer1", 1, key, time + 10000000, [claim1, claim2]).generateToken();
            try
            {
                JsonWebToken.fromToken("notTheIssuer", 1, key, token);
            }
            catch (exp)
            {
                assert.ok(exp instanceof InvalidTokenException);
                assert.equal(exp.message, `Token '${token}' is invalid because iss was expected to be 'notTheIssuer' but instead was 'issuer1'.`);
                return;
            }
            assert.ok(false);
        });

        await test("should throw an exception when getting JWT when the token is expired", async () =>
        {
            const claim1 = new Claim("this_claim", "ThisValue");
            const claim2 = new Claim("that_claim", "ThatValue");
            const key = await SymmetricEncryption.generateKey();
            const time = Date.now();
            const token = JsonWebToken.fromClaims("issuer1", 1, key, time, [claim1, claim2]).generateToken();
            try
            {
                JsonWebToken.fromToken("issuer1", 1, key, token);
            }
            catch (exp)
            {
                assert.ok(exp instanceof ExpiredTokenException);
                assert.equal(exp.message, `Token '${token}' is expired.`);
                return;
            }
            assert.ok(false);
        });

        // TODO: right now we only support one alg type. When we support others, we should uncomment this test
        // await test("should throw an exception when getting JWT algorithm given is different than what was used for the token generation", async () =>
        // {
        //     let claim1 = new Claim("this_claim", "ThisValue");
        //     let claim2 = new Claim("that_claim", "ThatValue");
        //     let key = await SymmetricEncryption.generateKey();
        //     let time = Date.now();
        //     let token = JsonWebToken.fromClaims("issuer1", 1, key, time + 1000000, [claim1, claim2]).generateToken();
        //     try
        //     {
        //         JsonWebToken.fromToken("issuer1", 2, key, token);
        //     }
        //     catch (exp)
        //     {
        //         console.log(exp);
        //         assert.ok(exp instanceof InvalidTokenException);
        //         assert.equal(exp.message, `Token '${token}' is invalid because alg was expected to be '${2}' but instead was '${1}'.`);
        //         return;
        //     }
        //     assert.ok(false);
        // });

        await test("should throw an exception when getting JWT key given is different than what was used for the token generation", async () =>
        {
            const claim1 = new Claim("this_claim", "ThisValue");
            const claim2 = new Claim("that_claim", "ThatValue");
            const key = await SymmetricEncryption.generateKey();
            const key2 = await SymmetricEncryption.generateKey();
            const time = Date.now();
            const token = JsonWebToken.fromClaims("issuer1", 1, key, time + 1000000, [claim1, claim2]).generateToken();
            try
            {
                JsonWebToken.fromToken("issuer1", 1, key2, token);
            }
            catch (exp)
            {
                assert.ok(exp instanceof InvalidTokenException);
                assert.equal(exp.message, `Token '${token}' is invalid because signature could not be verified.`);
                return;
            }
            assert.ok(false);
        });

        await test("should throw an exception when getting JWT when the token is tampered with", async () =>
        {
            const claim1 = new Claim("this_claim", "ThisValue");
            const claim2 = new Claim("that_claim", "ThatValue");
            const key = await SymmetricEncryption.generateKey();
            const time = Date.now();
            let token = JsonWebToken.fromClaims("issuer1", 1, key, time + 1000000, [claim1, claim2]).generateToken();
            token = token + "someStuff";
            try
            {
                JsonWebToken.fromToken("issuer1", 1, key, token);
            }
            catch (exp)
            {
                assert.ok(exp instanceof InvalidTokenException);
                assert.equal(exp.message, `Token '${token}' is invalid because signature could not be verified.`);
                return;
            }
            assert.ok(false);
        });
    });

    // await describe("digital Signature", () =>
    // {
    //     await test("should successfully create a token using keyPair using digital Signature with one claim and get jwt using keyPair", async () =>
    //     {
    //         let keyPair = await AsymmetricEncryption.generateKeyPair();
    //         let claim = new Claim("this_claim", "ThisValue");
    //         let time = Date.now();
    //         let token = await JsonWebToken.fromClaims("issuer1", 2, keyPair, time + 10000000, [claim]).generateToken();
    //         let jwt = await JsonWebToken.fromToken("issuer1", 2, keyPair, token);
    //         assert.ok(jwt !== null || jwt !== undefined);
    //         assert.strictEqual(jwt.issuer, "issuer1");
    //         assert.strictEqual(jwt.algType, 2);
    //         assert.strictEqual(jwt.expiry, time + 10000000);
    //         assert.deepStrictEqual(jwt.claims, [claim]);
    //     });

    //     await test("should successfully create a token using keyPair using digital Signature with one claim and get jwt using public key", async () =>
    //     {
    //         let keyPair = await AsymmetricEncryption.generateKeyPair();
    //         let pubKey = await AsymmetricEncryption.getPublicKey(keyPair);
    //         let claim = new Claim("this_claim", "ThisValue");
    //         let time = Date.now();
    //         let token = await JsonWebToken.fromClaims("issuer1", 2, keyPair, time + 10000000, [claim]).generateToken();
    //         let jwt = await JsonWebToken.fromToken("issuer1", 2, pubKey, token);
    //         assert.ok(jwt !== null || jwt !== undefined);
    //         assert.strictEqual(jwt.issuer, "issuer1");
    //         assert.strictEqual(jwt.algType, 2);
    //         assert.strictEqual(jwt.expiry, time + 10000000);
    //         assert.deepStrictEqual(jwt.claims, [claim]);
    //     });

    //     await test("should throw an exception when getting JWT with a different issuer that what was user to generate token", async () =>
    //     {
    //         let keyPair = await AsymmetricEncryption.generateKeyPair();
    //         let pubKey = await AsymmetricEncryption.getPublicKey(keyPair);
    //         let claim = new Claim("this_claim", "ThisValue");
    //         let time = Date.now();
    //         let token = await JsonWebToken.fromClaims("issuer1", 2, keyPair, time + 10000000, [claim]).generateToken();
    //         try
    //         {
    //             await JsonWebToken.fromToken("notTheIssuer", 1, pubKey, token);
    //         }
    //         catch (exp)
    //         {
    //             assert.ok(exp instanceof InvalidTokenException);
    //             assert.equal(exp.message, `Token '${token}' is invalid because iss was expected to be 'notTheIssuer' but instead was 'issuer1'.`);
    //             return;
    //         }
    //         assert.ok(false);
    //     });

    //     await test("should throw an exception when getting JWT algorithm given is different than what was used for the token generation", async () =>
    //     {
    //         let claim1 = new Claim("this_claim", "ThisValue");
    //         let claim2 = new Claim("that_claim", "ThatValue");
    //         let keyPair = await AsymmetricEncryption.generateKeyPair();
    //         let pubKey = await AsymmetricEncryption.getPublicKey(keyPair);
    //         let time = Date.now();
    //         let token = await JsonWebToken.fromClaims("issuer1", 2, keyPair, time + 1000000, [claim1, claim2]).generateToken();
    //         try
    //         {
    //             await JsonWebToken.fromToken("issuer1", 1, pubKey, token);
    //         }
    //         catch (exp)
    //         {
    //             assert.ok(exp instanceof InvalidTokenException);
    //             assert.equal(exp.message, `Token '${token}' is invalid because alg was expected to be '${1}' but instead was '${2}'.`);
    //             return;
    //         }
    //         assert.ok(false);
    //     });

    //     await test("should throw an exception when getting JWT algorithm given is different than what was used for the token generation", async () =>
    //     {
    //         let claim1 = new Claim("this_claim", "ThisValue");
    //         let claim2 = new Claim("that_claim", "ThatValue");
    //         let keyPair = await AsymmetricEncryption.generateKeyPair();
    //         let pubKey = await AsymmetricEncryption.getPublicKey(keyPair);
    //         let time = Date.now();
    //         let token = await JsonWebToken.fromClaims("issuer1", 2, keyPair, time, [claim1, claim2]).generateToken();
    //         try
    //         {
    //             await JsonWebToken.fromToken("issuer1", 2, pubKey, token);
    //         }
    //         catch (exp)
    //         {
    //             assert.ok(exp instanceof ExpiredTokenException);
    //             assert.equal(exp.message, `Token '${token}' is expired.`);
    //             return;
    //         }
    //         assert.ok(false);
    //     });

    //     await test("should throw an exception when getting JWT key given is different than what was used for the token generation", async () =>
    //     {
    //         let claim1 = new Claim("this_claim", "ThisValue");
    //         let claim2 = new Claim("that_claim", "ThatValue");
    //         let key = await AsymmetricEncryption.generateKeyPair();
    //         let key2 = await AsymmetricEncryption.generateKeyPair();
    //         let time = Date.now();
    //         let token = await JsonWebToken.fromClaims("issuer1", 2, key, time + 1000000, [claim1, claim2]).generateToken();
    //         try
    //         {
    //             await JsonWebToken.fromToken("issuer1", 2, key2, token);
    //         }
    //         catch (exp)
    //         {
    //             assert.ok(exp instanceof InvalidTokenException);
    //             assert.equal(exp.message, `Token '${token}' is invalid because signature could not be verified.`);
    //             return;
    //         }
    //         assert.ok(false);
    //     });


    //     await test("should throw an exception when getting JWT when the token is tampered with", async () =>
    //     {
    //         let claim1 = new Claim("this_claim", "ThisValue");
    //         let claim2 = new Claim("that_claim", "ThatValue");
    //         let key = await AsymmetricEncryption.generateKeyPair();
    //         let time = Date.now();
    //         let token = await JsonWebToken.fromClaims("issuer1", 2, key, time + 1000000, [claim1, claim2]).generateToken();
    //         token = token + "a6df467";
    //         try
    //         {
    //             await JsonWebToken.fromToken("issuer1", 2, key, token);
    //         }
    //         catch (exp)
    //         {
    //             assert.ok(exp instanceof InvalidTokenException);
    //             assert.equal(exp.message, `Token '${token}' is invalid because signature could not be verified.`);
    //             return;
    //         }
    //         assert.ok(false);
    //     });
    // });

});