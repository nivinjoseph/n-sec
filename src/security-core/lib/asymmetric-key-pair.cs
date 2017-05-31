using System;
using System.Security.Cryptography;
using System.Linq;

namespace SecurityCore
{
    internal class AsymmetricKeyPair
    {
        private readonly RSAParameters _rsaParams;


        public RSAParameters RSAParams { get { return this._rsaParams;  } }
        

        public AsymmetricKeyPair(RSAParameters rsaParams)
        {
            this._rsaParams = rsaParams;
        }
        
        public AsymmetricKeyPair(string keyPairOrPublicKey)
        {
            var splitted = keyPairOrPublicKey.Split(".", StringSplitOptions.RemoveEmptyEntries).Select(t => t.Trim()).ToArray();
            
            if(splitted.Length != 2 && splitted.Length != 8)
                throw new CryptoException("Invalid key.");

            var rsaParams = new RSAParameters();
            
            rsaParams.Exponent = CryptoHelpers.FromHex(splitted[0]);
            rsaParams.Modulus = CryptoHelpers.FromHex(splitted[1]);
            
            if(splitted.Length == 2)
            {
                this._rsaParams = rsaParams;
                return;
            }

            rsaParams.D = CryptoHelpers.FromHex(splitted[2]);
            rsaParams.P = CryptoHelpers.FromHex(splitted[3]);
            rsaParams.DP = CryptoHelpers.FromHex(splitted[4]);
            rsaParams.Q = CryptoHelpers.FromHex(splitted[5]);
            rsaParams.DQ = CryptoHelpers.FromHex(splitted[6]);
            rsaParams.InverseQ = CryptoHelpers.FromHex(splitted[7]);

            this._rsaParams = rsaParams;
        }
        
        public string toHexString(bool includePrivateParams)
        {
            var exponent = CryptoHelpers.ToHex(this._rsaParams.Exponent);
            var modulus = CryptoHelpers.ToHex(this._rsaParams.Modulus);
            
            if(!includePrivateParams)
                return $"{exponent}.{modulus}";

            var d = CryptoHelpers.ToHex(this._rsaParams.D);
            var p = CryptoHelpers.ToHex(this._rsaParams.P);
            var dp = CryptoHelpers.ToHex(this._rsaParams.DP);
            var q = CryptoHelpers.ToHex(this._rsaParams.Q);
            var dq = CryptoHelpers.ToHex(this._rsaParams.DQ);
            var inverseQ = CryptoHelpers.ToHex(this._rsaParams.InverseQ);

            return $"{exponent}.{modulus}.{d}.{p}.{dp}.{q}.{dq}.{inverseQ}";
        }
    }
}