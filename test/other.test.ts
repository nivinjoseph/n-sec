import * as Assert from "assert";

suite("Other", () =>
{
    test("encoding decoding", () =>
    {
        let text = "moonlight43iuj90/;msdnnksdkdkdk[[[][][";
        let encodedText = Buffer.from(text, "utf8").toString("base64");
        Assert.notStrictEqual(encodedText, text);
        
        let decodedText = Buffer.from(encodedText, "base64").toString("utf8");
        Assert.notStrictEqual(decodedText, encodedText);
        Assert.strictEqual(decodedText, text);
    });
});