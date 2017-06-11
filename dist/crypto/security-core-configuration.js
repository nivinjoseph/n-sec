"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SecurityCoreConfiguration {
    constructor() { }
    static get coreExePath() { return SecurityCoreConfiguration._coreExePath; }
    static set coreExePath(value) { SecurityCoreConfiguration._coreExePath = value; }
}
SecurityCoreConfiguration._coreExePath = "./node_modules/n-sec/src/security-core/bin/Release/netcoreapp2.0/publish/security-core.dll";
exports.SecurityCoreConfiguration = SecurityCoreConfiguration;
//# sourceMappingURL=security-core-configuration.js.map