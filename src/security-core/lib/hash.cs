using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace SecurityCore
{
    internal static class Hash
    {
        public static string Create(string value)
        {
            if(string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException("value");

            return HashInternal(Encoding.UTF8.GetBytes(value));
        }

        public static string CreateUsingSalt(string value, string salt)
        {
            if(string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException("value");

            if(string.IsNullOrWhiteSpace(salt))
                throw new ArgumentNullException("salt");

            var valueReverse = Reverse(value);
            var saltReverse = Reverse(salt);

            var saltedValue = string.Format("{1}{0}{2}{1}{3}{1}{2}", value, salt, valueReverse, saltReverse);
            return Create(saltedValue);
        }
        
        
        private static string HashInternal(byte[] value)
        {
            if (value == null)
                throw new ArgumentNullException("value");

            var hasher = new SHA512Managed();
            var hashBytes = hasher.ComputeHash(value);
            return CryptoHelpers.ToHex(hashBytes);
        }

        private static string Reverse(string value)
        {
            var result = new StringBuilder();
            foreach (var c in value.Reverse())
                result.Append(c);
            return result.ToString();
        }
    }
}