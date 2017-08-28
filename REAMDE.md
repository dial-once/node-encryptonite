Dial-Once

This modules is used for encryption/decryption of datas.
It uses GCM (Galois/Counter Mode).

Examples:

- Encrypt data
```
const security = require('node-security');

const data = 'Hello World !';

const securised = security.encrypt(data, key);

securised: { content: '1016acd5af5b7b91985fc36d7b',
  vector: '73d1b9d375fa33c355b185dd',
  tag: 'bdea27df226f54da5bb9ed12e4312e12' }
```

- Decrypt data
```
const security = require('node-security');

security.decrypt(securised, key);

output: 'Hello World !';
```