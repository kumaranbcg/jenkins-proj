const CryptoJS = require("crypto-js");

const iterationCount = 1000;
const keySize = 128;
const passPhrase = process.env.AES_PASSPHRASE;

const salt = process.env.AES_SALT;
const iv = process.env.AES_FOUR;

const AesUtil = function (keySize, iterationCount) {
    this.keySize = keySize / 32;
    this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function () {
    const key = CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
        keySize: this.keySize,
        iterations: this.iterationCount,
    });
    return key;
};

AesUtil.prototype.encrypt = function (plainText) {
    const key = this.generateKey();
    const encrypted = CryptoJS.AES.encrypt(plainText, key, { iv: CryptoJS.enc.Hex.parse(iv) });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

AesUtil.prototype.decrypt = function (cipherText) {
    const key = this.generateKey();
    const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(cipherText),
    });
    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, { iv: CryptoJS.enc.Hex.parse(iv) });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

module.exports = new AesUtil(keySize, iterationCount);
