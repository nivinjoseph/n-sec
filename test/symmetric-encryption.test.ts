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
        let key = await SymmetricEncryption.generateKey();
        console.log("generate key", key);
        assert.ok(key !== null);
    });
});