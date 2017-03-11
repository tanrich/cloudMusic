function md5 (dfsId) {
  // 将二进制转化为byte数组
  Buffer.prototype.toByteArray = function () {
    return Array.prototype.slice.call(this, 0);
  }
// 需要解密的dfsId
  let input = dfsId;
// 网易云音乐加密md5
  let key = "3go8&$8*3*3h0k(2)2";

  let inputByte = new Buffer(input);
  let keyByte = new Buffer(key);

  inputByte = inputByte.toByteArray();
  keyByte = keyByte.toByteArray();

// 解密
  for (let i = 0; i < inputByte.length; ++i) {
    inputByte[i] = inputByte[i] ^ keyByte[i % keyByte.length];
  }

  let result = new Buffer(inputByte)

  let crypto = require('crypto');
  let md5 = crypto.createHash('md5');
  let password = md5.update(result).digest('base64');
  password = password.replace(/\+/g, "_");
  password = password.replace(/\//g, "_");

  return password;
}

module.exports = md5;
