using System;

namespace SecurityCore
{
    internal class CryptoException : ApplicationException
    {
        public CryptoException(string message) : base(message)
        { }

        public CryptoException(string message, Exception innerException): base(message, innerException)
        { }
    }
}