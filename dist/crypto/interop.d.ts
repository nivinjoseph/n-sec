import "n-ext";
export declare class Interop {
    private constructor();
    static executeCommand(command: string, ...params: string[]): Promise<string>;
}
