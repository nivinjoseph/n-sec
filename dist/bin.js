#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import { given } from "@nivinjoseph/n-defensive";
const n_util_1 = require("@nivinjoseph/n-util");
const symmetric_encryption_1 = require("./crypto/symmetric-encryption");
var SupportedCommands;
(function (SupportedCommands) {
    SupportedCommands["generateSymmetricKey"] = "generate-symmetric-key";
})(SupportedCommands || (SupportedCommands = {}));
const supportedCommandsString = JSON.stringify(n_util_1.TypeHelper.enumTypeToTuples(SupportedCommands).map(t => t[1]));
function executeCommand(command) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // given(command, "command").ensureHasValue().ensureIsString();
        switch (command) {
            case SupportedCommands.generateSymmetricKey:
                {
                    const key = yield symmetric_encryption_1.SymmetricEncryption.generateKey();
                    console.log("SYMMETRIC KEY => ", key);
                    break;
                }
            default:
                console.error(`Unknown command '${command}'. Supported commands are ${supportedCommandsString}.`);
        }
    });
}
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error(`Please enter a single command. Supported commands are ${supportedCommandsString}.`);
    process.exit(1); //an error occurred
}
const command = args[0];
executeCommand(command)
    .then(() => process.exit(0))
    .catch(e => {
    console.error("Error occurred");
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=bin.js.map