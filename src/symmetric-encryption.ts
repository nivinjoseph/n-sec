import * as ChildProcess from "child_process";
import "n-ext";

export class SymmetricEncryption
{
    private constructor() { }


    public static generateKey(): Promise<string>
    {
        return new Promise((resolve, reject) =>
        {

            ChildProcess.exec(
                // "dotnet ./src/security-core/bin/Debug/netcoreapp2.0/security-core.dll SymmetricEncryption.GenerateKey",
                "dotnet ./src/security-core/bin/Release/netcoreapp2.0/publish/security-core.dll SymmetricEncryption.GenerateKey",
                
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