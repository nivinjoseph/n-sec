"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProcess = require("child_process");
require("n-ext");
class SymmetricEncryption {
    constructor() { }
    static generateKey() {
        return new Promise((resolve, reject) => {
            ChildProcess.exec(
            // "dotnet ./src/security-core/bin/Debug/netcoreapp2.0/security-core.dll SymmetricEncryption.GenerateKey",
            "dotnet ./src/security-core/bin/Release/netcoreapp2.0/publish/security-core.dll SymmetricEncryption.GenerateKey", (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (stderr) {
                    reject(stderr);
                    return;
                }
                resolve(stdout);
            });
        });
    }
}
exports.SymmetricEncryption = SymmetricEncryption;
//# sourceMappingURL=symmetric-encryption.js.map