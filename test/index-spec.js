require('dotenv').load({ silent: true });
const assert = require('assert');
const security = require('../src/index.js');

describe('security', () => {
  it('should encrypt and decrypt a message', () => {
    const text = 'Avada-kedavra!';
    const hash = security.encrypt(text, '5a14291bdfb708f81f924807e41e97bf');
    const message = security.decrypt(hash, '5a14291bdfb708f81f924807e41e97bf');
    assert.equal(text, message);
  });

  it('should encrypt and decrypt an array', () => {
    const cc = ['one@mail.com', 'two@mail.com'];
    const hash = security.encrypt(cc, '5a14291bdfb708f81f924807e41e97bf');
    const decryptedCC = security.decrypt(hash, '5a14291bdfb708f81f924807e41e97bf');
    assert(Array.isArray(decryptedCC));
    assert.deepEqual(cc, decryptedCC);
  });

  it('should encrypt and decrypt boolean', () => {
    const persist = true;
    const hash = security.encrypt(persist, '5a14291bdfb708f81f924807e41e97bf');
    const decrypted = security.decrypt(hash, '5a14291bdfb708f81f924807e41e97bf');
    assert.equal(persist, decrypted);
  });

  it('should encrypt and decrypt an empty array', () => {
    const cc = [];
    const hash = security.encrypt(cc, '5a14291bdfb708f81f924807e41e97bf');
    const decryptedCC = security.decrypt(hash, '5a14291bdfb708f81f924807e41e97bf');
    assert(Array.isArray(decryptedCC));
    assert.deepEqual(cc, decryptedCC);
  });

  it('should not break down if undefined/null appeared', () => {
    security.encrypt(undefined, '5a14291bdfb708f81f924807e41e97bf');
    security.encrypt(null, '5a14291bdfb708f81f924807e41e97bf');
    security.decrypt(undefined, '5a14291bdfb708f81f924807e41e97bf');
    security.decrypt(null, '5a14291bdfb708f81f924807e41e97bf');
  });

  it('should not encrypt twice', () => {
    const value = 'Dial-Once';
    const hash = security.encrypt(value, '5a14291bdfb708f81f924807e41e97bf');
    assert.deepEqual(hash, security.encrypt(hash, '5a14291bdfb708f81f924807e41e97bf'));
  });

  it('should not try to decrypt data that was not encrypted', () => {
    const value = 'Dial-Once';
    assert.equal(value, security.decrypt(value, '5a14291bdfb708f81f924807e41e97bf'));
  });
  
  it('should encrypt multiple times the same input into a different output', () => {
    const value = 'Dial-Once';
    const encrypted1 = security.encrypt(value, '5a14291bdfb708f81f924807e41e97bf');
    const encrypted2 = security.encrypt(value, '5a14291bdfb708f81f924807e41e97bf');
    
    const decrypted1 = security.decrypt(encrypted1, '5a14291bdfb708f81f924807e41e97bf');
    const decrypted2 = security.decrypt(encrypted2, '5a14291bdfb708f81f924807e41e97bf');
    
    assert.notEqual(encrypted1, encrypted2);
    assert.equal(decrypted1, decrypted2);
  });
});
