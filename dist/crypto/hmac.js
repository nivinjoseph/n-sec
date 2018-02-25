"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interop_1 = require("./interop");
// public
class Hmac {
    constructor() { }
    static create(key, value) {
        return interop_1.Interop.executeCommand("Hmac.Create", key, value);
    }
}
exports.Hmac = Hmac;
//# sourceMappingURL=hmac.js.map