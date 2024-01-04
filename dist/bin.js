#!/usr/bin/env node
// import { given } from "@nivinjoseph/n-defensive";
import { TypeHelper } from "@nivinjoseph/n-util";
import { SymmetricEncryption } from "./crypto/symmetric-encryption.js";
var SupportedCommands;
(function (SupportedCommands) {
    SupportedCommands["generateSymmetricKey"] = "generate-symmetric-key";
})(SupportedCommands || (SupportedCommands = {}));
const supportedCommandsString = JSON.stringify(TypeHelper.enumTypeToTuples(SupportedCommands).map(t => t[1]));
async function executeCommand(command) {
    // given(command, "command").ensureHasValue().ensureIsString();
    switch (command) {
        case SupportedCommands.generateSymmetricKey:
            {
                const key = await SymmetricEncryption.generateKey();
                console.log("SYMMETRIC KEY => ", key);
                break;
            }
        default:
            console.error(`Unknown command '${command}'. Supported commands are ${supportedCommandsString}.`);
    }
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