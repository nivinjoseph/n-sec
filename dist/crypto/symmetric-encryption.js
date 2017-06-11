"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interop_1 = require("./interop");
// public
class SymmetricEncryption {
    constructor() { }
    static generateKey() {
        return interop_1.Interop.executeCommand("SymmetricEncryption.GenerateKey");
    }
    static encrypt(key, value) {
        return interop_1.Interop.executeCommand("SymmetricEncryption.Encrypt", key, value);
    }
    static decrypt(key, value) {
        return interop_1.Interop.executeCommand("SymmetricEncryption.Decrypt", key, value);
    }
}
exports.SymmetricEncryption = SymmetricEncryption;
//# sourceMappingURL=symmetric-encryption.js.map