using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace SecurityCore
{
    internal static class Hashing
    {
        public static string Hash(byte[] value)
        {
            if(value == null)
                throw new ArgumentNullException("value");

            var hasher = new SHA512Managed();
            var hashBytes = hasher.ComputeHash(value);
            return CryptoHelpers.ToHex(hashBytes);
        }

        public static string Hash(string value)
        {
            if(string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException("value");

            var hasher = new SHA512Managed();
            var plainTextBytes = Encoding.UTF8.GetBytes(value);
            var hashBytes = hasher.ComputeHash(plainTextBytes);
            return CryptoHelpers.ToHex(hashBytes);
        }

        public static string Hash(string value, string salt)
        {
            if(string.IsNullOrWhiteSpace(value))
                throw new ArgumentNullException("value");

            if(string.IsNullOrWhiteSpace(salt))
                throw new ArgumentNullException("salt");

            var valueReverse = Reverse(value);
            var saltReverse = Reverse(salt);

            var saltedValue = string.Format("{1}{0}{2}{1}{3}{1}{2}", value, salt, valueReverse, saltReverse);
            return Hash(saltedValue);
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