require('dotenv').load({ silent: true });
const assert = require('assert');
const security = require('../src/index.js');

describe('security', () => {
  it('should encrypt and decrypt a message', () => {
    const text = 'Avada-kedavra!';
    const hash = security.encrypt(text);
    const message = security.decrypt(hash);
    assert.equal(text, message);
  });

  it('should encrypt and decrypt an array', () => {
    const cc = ['one@mail.com', 'two@mail.com'];
    const hash = security.encrypt(cc);
    const decryptedCC = security.decrypt(hash);
    assert(Array.isArray(decryptedCC));
    assert.deepEqual(cc, decryptedCC);
  });

  it('should encrypt and decrypt boolean', () => {
    const persist = true;
    const hash = security.encrypt(persist);
    const decrypted = security.decrypt(hash);
    assert.equal(persist, decrypted);
  });

  it('should encrypt and decrypt an empty array', () => {
    const cc = [];
    const hash = security.encrypt(cc);
    const decryptedCC = security.decrypt(hash);
    assert(Array.isArray(decryptedCC));
    assert.deepEqual(cc, decryptedCC);
  });

  it('should not break down if undefined/null appeared', () => {
    security.encrypt(undefined);
    security.encrypt(null);
    security.decrypt(undefined);
    security.decrypt(null);
  });

  it('should not encrypt twice', () => {
    const value = 'Dial-Once';
    const hash = security.encrypt(value);
    assert.deepEqual(hash, security.encrypt(hash));
  });

  it('should not try to decrypt data that was not encrypted', () => {
    const value = 'Dial-Once';
    assert.equal(value, security.decrypt(value));
  });
});
