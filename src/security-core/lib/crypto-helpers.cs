using System;
using System.Text;

namespace SecurityCore
{
    internal static class CryptoHelpers
    {
        #region Hex and Bytes
        public static string ToHex(byte[] bytes)
        {
            if (bytes == null || bytes.Length == 0)
                return "";

            const string hexFormat = "{0:X2}";
            var sb = new StringBuilder();

            foreach (byte b in bytes)
                sb.AppendFormat(hexFormat, b);

            return sb.ToString();
        }

        public static byte[] FromHex(string hex)
        {
            var numberChars = hex.Length;
            var bytes = new byte[numberChars / 2];

            for (var i = 0; i < numberChars; i += 2)
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);

            return bytes;
        }
        #endregion


        #region Hex and XML
        public static string ToHex(string xml)
        {
            var bytes = Encoding.UTF8.GetBytes(xml);
            return CryptoHelpers.ToHex(bytes);
        }

        public static string ToXml(string hex)
        {
            var bytes = CryptoHelpers.FromHex(hex);
            return Encoding.UTF8.GetString(bytes);
        }
        #endregion

        #region Base64Url string and Bytes
        public static string Base64UrlEncode(byte[] input)
        {
            if (input == null)
                throw new ArgumentNullException("input");
            if (input.Length < 1)
                return string.Empty;
            string str = Convert.ToBase64String(input);
            if (str == null)
                return (string)null;
            int length = str.Length;
            while (length > 0 && (int)str[length - 1] == 61)
                --length;
            char[] chArray = new char[length + 1];
            chArray[length] = (char)(48 + str.Length - length);
            for (int index = 0; index < length; ++index)
            {
                char ch = str[index];
                switch (ch)
                {
                    case '+':
                        chArray[index] = '-';
                        break;
                    case '/':
                        chArray[index] = '_';
                        break;
                    case '=':
                        chArray[index] = ch;
                        break;
                    default:
                        chArray[index] = ch;
                        break;
                }
            }
            return new string(chArray);
        }

        public static byte[] Base64UrlDecode(string input)
        {
            if (input == null)
                throw new ArgumentNullException("input");
            int length = input.Length;
            if (length < 1)
                return new byte[0];
            int num = (int)input[length - 1] - 48;
            if (num < 0 || num > 10)
                return (byte[])null;
            char[] inArray = new char[length - 1 + num];
            for (int index = 0; index < length - 1; ++index)
            {
                char ch = input[index];
                switch (ch)
                {
                    case '-':
                        inArray[index] = '+';
                        break;
                    case '_':
                        inArray[index] = '/';
                        break;
                    default:
                        inArray[index] = ch;
                        break;
                }
            }
            for (int index = length - 1; index < inArray.Length; ++index)
                inArray[index] = '=';
            return Convert.FromBase64CharArray(inArray, 0, inArray.Length);
        } 
        #endregion
    }
}