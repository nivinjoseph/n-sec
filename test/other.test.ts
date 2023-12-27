import assert from "node:assert";
import { describe, test } from "node:test";

await describe("Other", async () =>
{
    await test("encoding decoding", () =>
    {
        const text = "moonlight43iuj90/;msdnnksdkdkdk[[[][][";
        const encodedText = Buffer.from(text, "utf8").toString("base64");
        assert.notStrictEqual(encodedText, text);

        const decodedText = Buffer.from(encodedText, "base64").toString("utf8");
        assert.notStrictEqual(decodedText, encodedText);
        assert.strictEqual(decodedText, text);
    });
});