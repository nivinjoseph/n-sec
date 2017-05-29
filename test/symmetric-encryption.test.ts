import * as assert from "assert";
import { SecurityCoreConfiguration } from "./../src/security-core-configuration";
import { SymmetricEncryption } from "./../src/index";

suite("SymmetricEncryption", () =>
{
    suiteSetup(() =>
    {
        SecurityCoreConfiguration.coreExePath = "./src/security-core/bin/Debug/netcoreapp2.0/security-core.dll";
    });
    
    
    test("generateKey", async () =>
    {
        let key1 = await SymmetricEncryption.generateKey();
        let key2 = await SymmetricEncryption.generateKey();
        assert.ok(key1 !== null);
        assert.ok(key2 !== null);
        assert.notStrictEqual(key1, key2);
    });
});