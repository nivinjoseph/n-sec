import * as assert from "assert";
import { SymmetricEncryption } from "./../src/index";

suite("SymmetricEncryption", () =>
{
    test("generateKey", async () =>
    {
        let key = await SymmetricEncryption.generateKey();
        console.log("generate key", key);
        assert.ok(key !== null);
    });
});