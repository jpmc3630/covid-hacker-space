const crypto = require('crypto');

function hashMD5(consumable) {
    return crypto.createHash('md5').update(typeof consumable == 'string' ? consumable : JSON.stringify(consumable)).digest('hex');
}

function createHash(consumable, algorithm = 'md5') {
    return require('crypto')
      .createHash(algorithm)
      .update(
        typeof consumable == 'string' ? consumable : JSON.stringify(consumable)
      )
      .digest('hex');
  }
  

module.exports = {
    createHash,
    hashMD5
}