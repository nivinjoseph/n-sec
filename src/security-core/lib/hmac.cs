using System;
using System.Security.Cryptography;
using System.Text;

namespace SecurityCore
{
    internal static class Hmac
    {
        public static string Create(string key, string value)
        {
            if (string.IsNullOrWhiteSpace(key))
                throw new ArgumentNullException("key");

            if (value == null)
                throw new ArgumentNullException("value");

            HMACSHA512 hmac = null;

            try
            {
                try
                {
                    hmac = new HMACSHA512(CryptoHelpers.FromHex(key));
                }
                catch (Exception ex)
                {
                    throw new CryptoException("Invalid key", ex);
                }

                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(value));
                return CryptoHelpers.ToHex(hash);
            }
            finally
            {
                if(hmac != null)
                    hmac.Dispose();
            }
        }
    }
}