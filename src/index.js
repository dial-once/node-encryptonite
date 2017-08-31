const crypto = require('crypto');
const assert = require('assert');

function string2Boolean(str) {
  return (typeof str === 'boolean' ? `${str}` : str);
}

function boolean2String(bool) {
  return (['true', 'false'].includes(bool) ? bool === 'true' : bool);
}

const bytesToGenerate = 12;
const vector = crypto.randomBytes(bytesToGenerate);

module.exports = {
  /**
   * Encrypt Array of strings or string
   * @param  {Array|string} data - data to encrypt
   * @param  {string} key        - key used for encryption
   * @return {Array|object}      - Array of objects with encrypted data or one object
   */
  encrypt: (data, key) => {
    // if already encrypted
    if ([null, undefined].includes(data) || [null, undefined].includes(key)) {
      return data;
    }
    
    const isArray = Array.isArray(data);
    const queue = isArray ? [...data] : [data];
    const result = [];
    
    for (let item of queue) {
      if (item.content && item.vector && item.tag) {
        result.push(item);
        continue; // eslint-disable-line no-continue
      }

      const itemValue = string2Boolean(item);
      const cipher = crypto.createCipheriv('aes-256-gcm', key, vector);
      const encryptedItem = `${cipher.update(itemValue, 'utf8', 'hex')}${cipher.final('hex')}`;
      const tag = cipher.getAuthTag();
      result.push({
        content: encryptedItem,
        vector: vector.toString('hex'),
        tag: tag.toString('hex')
      });
    }
    
    return isArray ? result : result[0];
  },
  /**
   * Decrypt Array of objects or one object of the following structure:
   * {
   *   content: {string}, - encrypted content
   *   vector: {string},  - encryption vector
   *   tag: {string}      - encryption auth tag
   * }
   * @param  {Array|string} hash - encrypted data
   * @param  {string} key        - key used for decryption
   * @return {Array|string}      - Array of decrypted strings or decrypted string
   */
  decrypt: (data, key) => {
    if ([null, undefined].includes(data) || [null, undefined].includes(key)) {
      return data;
    }
    
    const isArray = Array.isArray(data);
    const queue = isArray ? [...data] : [data];
    const result = [];
    
    for (let item of queue) {
      // if was not encrypted
      if (!item.content || !item.vector || !item.tag) {
        result.push(item);
        continue; // eslint-disable-line no-continue
      }

      const decipher = crypto.createDecipheriv('aes-256-gcm', key, vector);
      decipher.setAuthTag(Buffer.from(item.tag, 'hex'));
      const decryptedValue = `${decipher.update(item.content, 'hex', 'utf8')}${decipher.final('utf8')}`;
      const normalizedValue = boolean2String(decryptedValue);
      result.push(normalizedValue);
    }
    
    return isArray ? result : result[0];
  }
};
