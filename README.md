# n-sec

A comprehensive security library for Node.js applications providing cryptographic operations and API security features.

## Installation

```bash
npm install @nivinjoseph/n-sec
# or
yarn add @nivinjoseph/n-sec
```

## Features

### Cryptographic Operations

1. **Hash**
   - Secure hashing operations using SHA-512
   - Generate hash digests for data
   - Support for salted hashing

2. **HMAC (Hash-based Message Authentication Code)**
   - Generate HMAC signatures using SHA-256

3. **Symmetric Encryption**
   - AES-256-CBC encryption and decryption
   - Secure key generation
   - IV (Initialization Vector) handling

### API Security

1. **JSON Web Tokens (JWT)**
   - JWT creation and validation
   - Support for HMAC algorithm
   - Token expiration handling
   - Claims management

2. **Claims-based Identity**
   - Claims management
   - Identity verification
   - Custom claims support

3. **Security Tokens**
   - Token generation and validation
   - Token expiration handling
   - Invalid token detection

## Usage

### Cryptographic Operations

```typescript
import { Hash, Hmac, SymmetricEncryption } from '@nivinjoseph/n-sec';

// Hashing
const hash = Hash.create('your-data');
const saltedHash = Hash.createUsingSalt('your-data', 'your-salt');

// HMAC
const hmac = Hmac.create('your-secret-key', 'your-data');

// Symmetric Encryption
const key = await SymmetricEncryption.generateKey();
const encrypted = await SymmetricEncryption.encrypt(key, 'your-data');
const decrypted = SymmetricEncryption.decrypt(key, encrypted);
```

### API Security

```typescript
import { JsonWebToken, ClaimsIdentity, Claim, AlgType } from '@nivinjoseph/n-sec';

// Create a claims identity
const claims = [
    new Claim('sub', 'user123'),
    new Claim('role', 'admin')
];

// Create a JWT
const jwt = JsonWebToken.fromClaims(
    'your-issuer',
    AlgType.hmac,
    'your-secret-key',
    Date.now() + 3600000, // 1 hour expiry
    claims
);
const token = jwt.generateToken();

// Verify a JWT
const verifiedJwt = JsonWebToken.fromToken(
    'your-issuer',
    AlgType.hmac,
    'your-secret-key',
    token
);
const verifiedClaims = verifiedJwt.claims;
```

## Error Handling

The library provides specific exception types for error handling:

- `CryptoException`: Base exception for cryptographic operations
- `ExpiredTokenException`: Thrown when a token has expired
- `InvalidTokenException`: Thrown when a token is invalid

## Requirements

- Node.js >= 20.10
- TypeScript support

## Contributing

Feel free to submit issues and pull requests.
For Windows development:
- Build tools => Open PowerShell as admin and run => npm install -g windows-build-tools
- OpenSSL => Go to https://slproweb.com/products/Win32OpenSSL.html => Get version Win64 OpenSSL v1.0.2q

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.