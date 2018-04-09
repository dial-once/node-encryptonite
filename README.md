# node-encryptonite
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/gate?key=node-encryptonite)](http://sonar.dialonce.net/dashboard?id=node-encryptonite)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-encryptonite&metric=ncloc)](http://sonar.dialonce.net/dashboard?id=node-encryptonite)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-encryptonite&metric=coverage)](http://sonar.dialonce.net/dashboard?id=node-encryptonite)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-encryptonite&metric=code_smells)](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-encryptonite&metric=coverage)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-encryptonite&metric=bugs)](http://sonar.dialonce.net/dashboard?id=node-encryptonite)
[![Sonar](http://proxy.dialonce.net/sonar/api/badges/measure?key=node-encryptonite&metric=sqale_debt_ratio)](http://sonar.dialonce.net/dashboard?id=node-encryptonite)

Module for aes-256-gcm encryption.

## features
- encrypt
- decrypt

## Installation
```
npm install encryptonite
```

## How it works:

#### Encrypt data
```js
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

#### Decrypt data
```js
const security = require('node-security');

security.decrypt({
  content: '1016acd5af5b7b91985fc36d7b',
  vector: '73d1b9d375fa33c355b185dd',
  tag: 'bdea27df226f54da5bb9ed12e4312e12'
}, key);

// result
'Hello World !'
```

## Tests
Requirements:
  - npm
  - make

Run `make deps` once and then `make test` to launch the test suite.

## License
The MIT License [MIT](LICENSE.md)
