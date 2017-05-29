using System;
using System.Security.Cryptography;
using System.Text;

namespace SecurityCore
{
    internal static class AsymmetricEncryption
    {
        public static string GenerateKeyPair()
        {
            var cipher = new RSACryptoServiceProvider(2048);
            return CryptoHelpers.ToHex(cipher.ToXmlString(true));
        }

        public static string GetPublicKey(string keyPair)
        {
            try
            {
                var cipher = new RSACryptoServiceProvider();
                cipher.FromXmlString(CryptoHelpers.ToXml(keyPair));
                return CryptoHelpers.ToHex(cipher.ToXmlString(false));
            }
            catch (Exception)
            {
                throw new CryptoException("Invalid key.");
            }
        }

        public static string Encrypt(string key, string value)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentNullException("key");

            if (value == null)
                throw new ArgumentNullException("value");

            var cipher = CreateCipher(key);
            var plainText = Encoding.UTF8.GetBytes(value);
            var cipherText = cipher.Encrypt(plainText, false);
            return CryptoHelpers.ToHex(cipherText);
        }

        public static string Decrypt(string key, string value)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentNullException("key");

            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException("value");

            var cipher = CreateCipher(key);

            try
            {
                var cipherText = CryptoHelpers.FromHex(value);
                var plainText = cipher.Decrypt(cipherText, false);
                return Encoding.UTF8.GetString(plainText);
            }
            catch (Exception)
            {
                throw new CryptoException("Invalid value.");
            }
        }


        private static RSACryptoServiceProvider CreateCipher(string key)
        {
            try
            {
                var cipher = new RSACryptoServiceProvider();
                cipher.FromXmlString(CryptoHelpers.ToXml(key));
                return cipher;
            }
            catch (Exception)
            {
                throw new CryptoException("Invalid key.");
            }
        }
    }
}