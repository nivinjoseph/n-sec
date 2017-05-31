using System;
using System.Security.Cryptography;
using System.Text;

namespace SecurityCore
{
    internal static class AsymmetricEncryption
    {
        public static string GenerateKeyPair()
        {
            using(var cipher = RSA.Create())
            {
                var rsaParams = cipher.ExportParameters(true);
                var asymmetricKeyPair = new AsymmetricKeyPair(rsaParams);
                return asymmetricKeyPair.toHexString(true);

                // var cipher = new RSACryptoServiceProvider(2048);
                // return CryptoHelpers.ToHex(cipher.ToXmlString(true));
            }
        }

        public static string GetPublicKey(string keyPair)
        {
            try
            {
                var asymmetricKeyPair = new AsymmetricKeyPair(keyPair);
                return asymmetricKeyPair.toHexString(false);

                // var cipher = new RSACryptoServiceProvider();
                // cipher.FromXmlString(CryptoHelpers.ToXml(keyPair));
                // return CryptoHelpers.ToHex(cipher.ToXmlString(false));
            }
            catch (Exception)
            {
                throw new CryptoException("Invalid key.");
            }
        }

        public static string Encrypt(string keyPairOrPublicKey, string value)
        {
            if (string.IsNullOrWhiteSpace(keyPairOrPublicKey))
                throw new ArgumentNullException("keyPairOrPublicKey");

            if (value == null)
                throw new ArgumentNullException("value");

            using(var cipher = CreateCipher(keyPairOrPublicKey))
            {
                var plainText = Encoding.UTF8.GetBytes(value);
                var cipherText = cipher.Encrypt(plainText, RSAEncryptionPadding.Pkcs1);
                return CryptoHelpers.ToHex(cipherText);
            }
        }

        public static string Decrypt(string keyPair, string value)
        {
            if (string.IsNullOrWhiteSpace(keyPair))
                throw new ArgumentNullException("keyPair");

            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException("value");

            using(var cipher = CreateCipher(keyPair))
            {
                try
                {
                    var cipherText = CryptoHelpers.FromHex(value);
                    var plainText = cipher.Decrypt(cipherText, RSAEncryptionPadding.Pkcs1);
                    return Encoding.UTF8.GetString(plainText);
                }
                catch (Exception)
                {
                    throw new CryptoException("Invalid value.");
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

        // private static RSACryptoServiceProvider CreateCipher(string key)
        // {
        //     try
        //     {
        //         var cipher = new RSACryptoServiceProvider();
        //         cipher.FromXmlString(CryptoHelpers.ToXml(key));
        //         return cipher;
        //     }
        //     catch (Exception)
        //     {
        //         throw new CryptoException("Invalid key.");
        //     }
        // }
    }
}