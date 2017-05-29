using System;
using System.Security.Cryptography;

namespace SecurityCore
{
    internal static class DigitalSignature
    {
        public static string Create(string keyPair, byte[] value)
        {
            if(string.IsNullOrWhiteSpace(keyPair))
                throw new ArgumentNullException("keyPair");

            if(value == null)
                throw new ArgumentNullException("value");

            var hasher = new SHA512Managed();
            var hashBytes = hasher.ComputeHash(value);

            var cipher = new RSACryptoServiceProvider();

            try
            {
                cipher.FromXmlString(CryptoHelpers.ToXml(keyPair));

                var sigFormatter = new RSAPKCS1SignatureFormatter(cipher);
                sigFormatter.SetHashAlgorithm("SHA512");

                var signature = sigFormatter.CreateSignature(hashBytes);
                return CryptoHelpers.ToHex(signature);
            }
            catch(Exception ex)
            {
                throw new CryptoException("Invalid key.", ex);
            }
        }

        public static bool Verify(string publicKey, byte[] value, string signature)
        {
            if(string.IsNullOrWhiteSpace(publicKey))
                throw new ArgumentNullException("publicKey");

            if(value == null)
                throw new ArgumentNullException("value");

            if (string.IsNullOrWhiteSpace(signature))
                throw new ArgumentNullException("signature");

            var hasher = new SHA512Managed();
            var hashBytes = hasher.ComputeHash(value);

            var cipher = new RSACryptoServiceProvider();
            RSAPKCS1SignatureDeformatter sigDeformatter;

            try
            {
                cipher.FromXmlString(CryptoHelpers.ToXml(publicKey));
                sigDeformatter = new RSAPKCS1SignatureDeformatter(cipher);
                sigDeformatter.SetHashAlgorithm("SHA512");
            }
            catch
            {
                throw new CryptoException("Invalid key.");
            }

            try
            {
                return sigDeformatter.VerifySignature(hashBytes, CryptoHelpers.FromHex(signature));
            }
            catch
            {
                throw new CryptoException("Invalid signature");
            }
        }
    }
}