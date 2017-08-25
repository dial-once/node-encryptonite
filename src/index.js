const crypto = require('crypto');
const assert = require('assert');


/**
 * Enum for two state values.
 * @readonly
 * @enum {number}
 */
const actionEnum = {
  ENCRYPT: 0,
  DECRYPT: 1
};

/**
   * Encrypt/Decrypt incoming data depending on action
   * @param  {Array|string|boolean|object} data - data to encrypt/decrypt.
   * In case of encryption, data can be Array of string or string.
   * In case of decryption, data can be an Array of objects or an object
   * @param {enum} action - action to perform. Can be either ENCRYPT or DECRYPT
   * @return {Array|string|boolean|object} - encrypted Array of objects or one object / decrypted Array of strings or one string
*/
function performAction(data, key, action) {
  if ([null, undefined].includes(data) || [null, undefined].includes(key)) {
    return data;
  }

  const isArray = Array.isArray(data);
  const queue = isArray ? [...data] : [data];
  const result = [];

  for (let item of queue) {
    if (action === actionEnum.ENCRYPT) {
      // if already encrypted
      if (item.content && item.vector && item.tag) {
        result.push(item);
        continue; // eslint-disable-line no-continue
      }

      const itemValue = typeof item === 'boolean' ? `${item}` : item; // converting boolean to string
      const vector = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv('aes-256-gcm', key, vector);
      const encryptedItem = `${cipher.update(itemValue, 'utf8', 'hex')}${cipher.final('hex')}`;
      const tag = cipher.getAuthTag();
      result.push({
        content: encryptedItem,
        vector: vector.toString('hex'),
        tag: tag.toString('hex')
      });
    } else if (action === actionEnum.DECRYPT) {
      // if was not encrypted
      if (!item.content || !item.vector || !item.tag) {
        result.push(item);
        continue; // eslint-disable-line no-continue
      }

      const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(item.vector, 'hex'));
      decipher.setAuthTag(Buffer.from(item.tag, 'hex'));
      const decryptedValue = `${decipher.update(item.content, 'hex', 'utf8')}${decipher.final('utf8')}`;
      // converting string to boolean
      const normalizedValue = ['true', 'false'].includes(decryptedValue) ? decryptedValue === 'true' : decryptedValue;
      result.push(normalizedValue);
    }
  }
  return isArray ? result : result[0];
}

module.exports = {
  /**
   * Encrypt Array of strings or string
   * @param  {Array|string} data - data to encrypt
   * @param  {string} key        - key used for encryption
   * @return {Array|object}      - Array of objects with encrypted data or one object
   */
  encrypt: (data, key) => performAction(data, key, actionEnum.ENCRYPT),
  /**
   * Decrypt Array of objects or one object of hte following structure:
   * {
   *   content: {string}, - encrypted content
   *   vector: {string},  - encryption vector
   *   tag: {string}      - encryption auth tag
   * }
   * @param  {Array|string} hash - encrypted data
   * @param  {string} key        - key used for decryption
   * @return {Array|string}      - Array of decrypted strings or decrypted string
   */
  decrypt: (hash, key) => performAction(hash, key,actionEnum.DECRYPT)
};
