// import CryptoJS from 'crypto-js'
import TripleDES from "crypto-js/tripledes";
import EncUtf8 from "crypto-js/enc-utf8";
import EncBase64 from "crypto-js/enc-base64";
import ModeECB from "crypto-js/mode-ecb";
import PadPkcs7 from "crypto-js/pad-pkcs7";
import js_base64 from "js-base64";
import mymd5 from "@/assets/lib/sec/md5-min.js";
const Base64 = js_base64.Base64;

// console.log('%c EncBase64.stringify','color:#00CD00',EncBase64.stringify("hello"))
// console.log('%c EncBase64.parse','color:#00CD00',EncBase64.parse("SGVsbG8sIFdvcmxkIQ=="))
// console.log('%c Base64.encode','color:#00CD00',Base64.encode("hello"))
// console.log('%c Base64.decode','color:#00CD00',Base64.decode(Base64.encode("hello")))

export default {
  keyHex: EncUtf8.parse(process.env.VUE_APP_signKey),
  encrypt: function(A, str) {
    var encrypted = TripleDES.encrypt(str, A ? EncUtf8.parse(A) : this.keyHex, {
      mode: ModeECB,
      padding: PadPkcs7
    });
    return encrypted.ciphertext.toString(EncBase64);
  },
  decrypt: function(A, str) {
    var decrypted = TripleDES.decrypt(
      {
        ciphertext: EncBase64.parse(str)
      },
      A ? EncUtf8.parse(A) : this.keyHex,
      {
        mode: ModeECB,
        padding: PadPkcs7
      }
    );
    return decrypted.toString(EncUtf8);
  },
  base64Encode: function(A, str) {
    return A
      ? Base64.encode(str.replace(/\//g, "*"))
      : Base64.encode(JSON.stringify(str).replace(/\//g, "*"));
  },
  base64Decode: function(A, str) {
    return A
      ? Base64.decode(str).replace(/\*/g, "/")
      : Base64.decode(JSON.parse(str)).replace(/\*/g, "/");
  },
  n22md5: function(key, str) {
    let ss = mymd5(window.globalConfig.signKey, str);
    return ss;
  }
};
