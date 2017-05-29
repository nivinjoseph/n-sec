"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProcess = require("child_process");
require("n-ext");
const security_core_configuration_1 = require("./security-core-configuration");
class SymmetricEncryption {
    constructor() { }
    static generateKey() {
        return new Promise((resolve, reject) => {
            ChildProcess.exec(`dotnet ${security_core_configuration_1.SecurityCoreConfiguration.coreExePath} SymmetricEncryption.GenerateKey`, (error, stdout, stderr) => {
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