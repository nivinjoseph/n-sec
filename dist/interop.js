"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProcess = require("child_process");
const security_core_configuration_1 = require("./security-core-configuration");
const n_defensive_1 = require("n-defensive");
require("n-ext");
const crypto_exception_1 = require("./crypto-exception");
class Interop {
    constructor() { }
    static executeCommand(command, ...params) {
        n_defensive_1.given(command, "command").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        command = command.trim();
        if (params.length > 0)
            command = command + "::" + Buffer.from(params.join(","), "utf8").toString("base64");
        return new Promise((resolve, reject) => {
            ChildProcess.exec(`dotnet ${security_core_configuration_1.SecurityCoreConfiguration.coreExePath} ${command}`, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (stderr) {
                    reject(new crypto_exception_1.CryptoException(stderr));
                    return;
                }
                resolve(stdout);
            });
        });
    }
}
exports.Interop = Interop;
//# sourceMappingURL=interop.js.map