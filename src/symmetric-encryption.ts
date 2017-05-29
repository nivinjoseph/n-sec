import * as ChildProcess from "child_process";
import "n-ext";
import { SecurityCoreConfiguration } from "./security-core-configuration";

export class SymmetricEncryption
{
    private constructor() { }


    public static generateKey(): Promise<string>
    {
        return new Promise((resolve, reject) =>
        {

            ChildProcess.exec(
                `dotnet ${SecurityCoreConfiguration.coreExePath} SymmetricEncryption.GenerateKey`,
                
                (error, stdout, stderr) =>
                {
                    if (error)
                    {
                        reject(error);
                        return;
                    }
                    
                    if (stderr)
                    {
                        reject(stderr);
                        return;
                    }
                    
                    resolve(stdout);
                });
        });
    }
}