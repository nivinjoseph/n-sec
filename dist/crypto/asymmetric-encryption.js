"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interop_1 = require("./interop");
// public
class AsymmetricEncryption {
    constructor() { }
    static generateKeyPair() {
        return interop_1.Interop.executeCommand("AsymmetricEncryption.GenerateKeyPair");
    }
    static getPublicKey(keyPair) {
        return interop_1.Interop.executeCommand("AsymmetricEncryption.GetPublicKey", keyPair);
    }
    static encrypt(keyPairOrPublicKey, value) {
        return interop_1.Interop.executeCommand("AsymmetricEncryption.Encrypt", keyPairOrPublicKey, value);
    }
    static decrypt(keyPair, value) {
        return interop_1.Interop.executeCommand("AsymmetricEncryption.Decrypt", keyPair, value);
    }
}
exports.AsymmetricEncryption = AsymmetricEncryption;
//# sourceMappingURL=asymmetric-encryption.js.map