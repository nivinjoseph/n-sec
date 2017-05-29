using System;
using System.Security.Cryptography;
using System.Text;

namespace SecurityCore
{
    internal static class Hmac
    {
        public static string GenerateKey()
        {
            var rng = new RNGCryptoServiceProvider();
            var bytes = new byte[32];
            rng.GetBytes(bytes);
            return CryptoHelpers.ToHex(bytes);
        }

        public static string Hash(string key, string value)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentNullException("key");

            if (value == null)
                throw new ArgumentNullException("value");

            HMACSHA512 hmac;

            try
            {
                hmac = new HMACSHA512(CryptoHelpers.FromHex(key));
            }
            catch
            {
                throw new CryptoException("Invalid key");
            }

            var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(value));
            return CryptoHelpers.ToHex(hash);
        }
    }
}