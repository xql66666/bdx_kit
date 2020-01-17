import CryptoJS from 'crypto-js'
export default {//加密
  encrypt(word, keyStr){
    //获取密匙，伪造请求时效校验以及签名校验，前端永远不是安全的，后续有机会上https
    keyStr = keyStr ? keyStr : 'beidouxing2szwan';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  },
  //解密
  decrypt(word, keyStr){  
    keyStr = keyStr ? keyStr : 'beidouxing2szwan';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }

}