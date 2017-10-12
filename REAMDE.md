Dial-Once

Module for aes-256-gcm encryption.

Knows how to encrypt objects, boolean, strings, arrays of types mentioned before.

Examples:

- Encrypt data
```
const security = require('node-security');

const data = 'Hello World !';

const secure = security.encrypt(data, key);

// result
{ 
  content: '1016acd5af5b7b91985fc36d7b',
  vector: '73d1b9d375fa33c355b185dd',
  tag: 'bdea27df226f54da5bb9ed12e4312e12'
}
```

- Decrypt data
```
const security = require('node-security');

security.decrypt({ 
  content: '1016acd5af5b7b91985fc36d7b',
  vector: '73d1b9d375fa33c355b185dd',
  tag: 'bdea27df226f54da5bb9ed12e4312e12'
}, key);

// result
'Hello World !'
```
