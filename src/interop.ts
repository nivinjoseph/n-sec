import * as ChildProcess from "child_process";
import { SecurityCoreConfiguration } from "./security-core-configuration";
import { given } from "n-defensive";
import "n-ext";
import { CryptoException } from "./crypto-exception";


export class Interop
{
    private constructor() { }
    
    
    public static executeCommand(command: string, ...params: string[]): Promise<string>
    {
        given(command, "command").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        
        command = command.trim();
        if (params.length > 0)
            command = command + "::" + Buffer.from(params.join(","), "utf8").toString("base64");   
        
        return new Promise((resolve, reject) =>
        {
            ChildProcess.exec(
                `dotnet ${SecurityCoreConfiguration.coreExePath} ${command}`,

                (error, stdout, stderr) =>
                {
                    if (error)
                    {
                        reject(error);
                        return;
                    }

                    if (stderr)
                    {
                        reject(new CryptoException(stderr));
                        return;
                    }

                    resolve(stdout);
                });
        });
    }
}