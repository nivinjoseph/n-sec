using System;
using System.Security.Cryptography;
using System.Text;

namespace SecurityCore
{
    internal static class SymmetricEncryption
    {
        public static string GenerateKey()
        {
            using(var rng = new RNGCryptoServiceProvider())
            {
                var bytes = new byte[32];
                rng.GetBytes(bytes);
                return CryptoHelpers.ToHex(bytes);
            }
        }

        public static string Encrypt(string key, string value)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentNullException("key");

            if (value == null)
                throw new ArgumentNullException("value");

            using(var cipher = CreateCipher(key))
            {
                var iv = cipher.IV;

                using(var encryptor = cipher.CreateEncryptor())
                {
                    var plainText = Encoding.UTF8.GetBytes(value);
                    var cipherText = encryptor.TransformFinalBlock(plainText, 0, plainText.Length);

                    return string.Format("{0}.{1}", CryptoHelpers.ToHex(cipherText), CryptoHelpers.ToHex(iv));
                }
            }            
        }

        public static string Decrypt(string key, string value)
        {
            if(string.IsNullOrWhiteSpace(key))
                throw new ArgumentNullException("key");

            if(string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException("value");

            using(var cipher = CreateCipher(key))
            {
                var splitted = value.Split('.');
                if (splitted.Length != 2)
                    throw new CryptoException("Invalid value.");

                try
                {
                    cipher.IV = CryptoHelpers.FromHex(splitted[1]);

                    using(var decryptor = cipher.CreateDecryptor())
                    {
                        var cipherText = CryptoHelpers.FromHex(splitted[0]);
                        var plainText = decryptor.TransformFinalBlock(cipherText, 0, cipherText.Length);

                        return Encoding.UTF8.GetString(plainText);
                    }
                }
                catch (Exception)
                {
                    throw new CryptoException("Invalid value.");
                }
            }
        }


        private static RijndaelManaged CreateCipher(string key)
        {
            try
            {
                return new RijndaelManaged
                {
                    KeySize = 256,
                    BlockSize = 128, // this has to be 128 for netcore 2.0
                    Padding = PaddingMode.ISO10126,
                    Mode = CipherMode.CBC,
                    Key = CryptoHelpers.FromHex(key)
                };
            }
            catch (Exception ex)
            {
                throw new CryptoException("Invalid key.", ex);
            }
        }
    }
}