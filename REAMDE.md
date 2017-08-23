Dial-Once

Set-up environment:
- Copy the content from .env.tpl into a new file .env, or use your own hashing key

Examples:

- Encrypt data
```
const security = require('node-security');

const data = 'Hello World !';

// It will use the hashing key from the .env file to encrypt data
security.encrypt(data);
```

- Decrypt data
```
const security = require('node-security');

const data = 'Hello World !';

// It will use the hashing key from the .env file to decrypt data
security.decrypt(data);
```