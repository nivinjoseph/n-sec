"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
// public
class Uuid {
    constructor() { }
    static Create() {
        return uuid.v4();
    }
}
exports.Uuid = Uuid;
//# sourceMappingURL=uuid.js.map