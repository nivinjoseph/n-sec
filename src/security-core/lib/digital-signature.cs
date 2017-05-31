using System;
using System.Security.Cryptography;
using System.Text;

namespace SecurityCore
{
    internal static class DigitalSignature
    {
        public static string Sign(string keyPair, string value)
        {
            if (string.IsNullOrWhiteSpace(keyPair))
                throw new ArgumentNullException("keyPair");

            if (value == null)
                throw new ArgumentNullException("value");

            return CreateInternal(keyPair, Encoding.UTF8.GetBytes(value));
        }
        
        public static bool Verify(string publicKey, string value, string signature)
        {
            if (string.IsNullOrWhiteSpace(publicKey))
                throw new ArgumentNullException("publicKey");

            if (value == null)
                throw new ArgumentNullException("value");

            if (string.IsNullOrWhiteSpace(signature))
                throw new ArgumentNullException("signature");

            return VerifyInternal(publicKey, Encoding.UTF8.GetBytes(value), signature);
        }
        
        
        private static string CreateInternal(string keyPair, byte[] value)
        {
            if(string.IsNullOrWhiteSpace(keyPair))
                throw new ArgumentNullException("keyPair");

            if(value == null)
                throw new ArgumentNullException("value");

            byte[] hashBytes;

            using(var hasher = new SHA512Managed())
            {
                hashBytes = hasher.ComputeHash(value);
            }
            
            using(var cipher = CreateCipher(keyPair))
            {
                var sigFormatter = new RSAPKCS1SignatureFormatter(cipher);
                sigFormatter.SetHashAlgorithm("SHA512");

                var signature = sigFormatter.CreateSignature(hashBytes);
                return CryptoHelpers.ToHex(signature);
            }
        }
        
        private static bool VerifyInternal(string publicKey, byte[] value, string signature)
        {
            if(string.IsNullOrWhiteSpace(publicKey))
                throw new ArgumentNullException("publicKey");

            if(value == null)
                throw new ArgumentNullException("value");

            if (string.IsNullOrWhiteSpace(signature))
                throw new ArgumentNullException("signature");

            byte[] hashBytes;
            using(var hasher = new SHA512Managed())
            {
                hashBytes = hasher.ComputeHash(value);
            }
            
            using(var cipher = CreateCipher(publicKey))
            {
                var sigDeformatter = new RSAPKCS1SignatureDeformatter(cipher);
                sigDeformatter.SetHashAlgorithm("SHA512");

                try
                {
                    return sigDeformatter.VerifySignature(hashBytes, CryptoHelpers.FromHex(signature));
                }
                catch
                {
                    // throw new CryptoException("Invalid signature");
                    return false;
                }
            }
            
        }
        
        private static RSA CreateCipher(string keyPairOrPublicKey)
        {
            try
            {
                var asymmetricKeyPair = new AsymmetricKeyPair(keyPairOrPublicKey);
                return RSA.Create(asymmetricKeyPair.RSAParams);
            }
            catch (Exception)
            {
                throw new CryptoException("Invalid key.");
            }
        }
    }
}