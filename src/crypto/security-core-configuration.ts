export class SecurityCoreConfiguration
{
    private static _coreExePath = "./node_modules/n-sec/src/security-core/bin/Release/netcoreapp2.0/publish/security-core.dll";
    
    
    public static get coreExePath(): string { return SecurityCoreConfiguration._coreExePath; }
    public static set coreExePath(value: string) { SecurityCoreConfiguration._coreExePath = value; }
    
    
    private constructor() { }
    
}