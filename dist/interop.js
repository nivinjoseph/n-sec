"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChildProcess = require("child_process");
const security_core_configuration_1 = require("./security-core-configuration");
const n_defensive_1 = require("n-defensive");
require("n-ext");
class Interop {
    constructor() { }
    static executeCommand(command, ...params) {
        n_defensive_1.given(command, "command").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        command = command.trim();
        if (params.length > 0)
            command = command + "::" + params.join(",");
        return new Promise((resolve, reject) => {
            ChildProcess.exec(`dotnet ${security_core_configuration_1.SecurityCoreConfiguration.coreExePath} ${command}`, (error, stdout, stderr) => {
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
exports.Interop = Interop;
//# sourceMappingURL=interop.js.map