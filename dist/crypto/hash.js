"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interop_1 = require("./interop");
// public
class Hash {
    constructor() { }
    static create(value) {
        return interop_1.Interop.executeCommand("Hash.Create", value);
    }
    static createUsingSalt(value, salt) {
        return interop_1.Interop.executeCommand("Hash.CreateUsingSalt", value, salt);
    }
}
exports.Hash = Hash;
//# sourceMappingURL=hash.js.map