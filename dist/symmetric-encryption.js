"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interop_1 = require("./interop");
// public
class SymmetricEncryption {
    constructor() { }
    static generateKey() {
        return interop_1.Interop.executeCommand("SymmetricEncryption.GenerateKey");
    }
}
exports.SymmetricEncryption = SymmetricEncryption;
//# sourceMappingURL=symmetric-encryption.js.map