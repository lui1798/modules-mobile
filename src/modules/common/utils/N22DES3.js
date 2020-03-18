// import CryptoJS from 'crypto-js'
// import TripleDES from "crypto-js/tripledes";
// import EncUtf8 from "crypto-js/enc-utf8";
// import EncBase64 from "crypto-js/enc-base64";
// import ModeECB from "crypto-js/mode-ecb";
// import PadPkcs7 from "crypto-js/pad-pkcs7";
// import HmacMD5 from "crypto-js/hmac-md5";
import TripleDES from "@/assets/lib/crypto-js/tripledes";
import EncUtf8 from "@/assets/lib/crypto-js/enc-utf8";
import EncBase64 from "@/assets/lib/crypto-js/enc-base64";
import ModeECB from "@/assets/lib/crypto-js/mode-ecb";
import PadPkcs7 from "@/assets/lib/crypto-js/pad-pkcs7";
import HmacMD5 from "@/assets/lib/crypto-js/hmac-md5";

// const TripleDES = "";
// const EncUtf8 = "";
// const EncBase64 = "";
// const ModeECB = "";
// const PadPkcs7 = "";
// const HmacMD5 = "";

// import mymd5 from "@/assets/lib/sec/md5-min.js";
// import js_base64 from "js-base64";
// const Base64 = js_base64.Base64;

// import jsmd5 from "js-md5";
// import md5 from "crypto-js/md5";

// console.log("%c js-md5", "color:#00CD00", jsmd5("hello word"));
// console.log("%c md5", "color:#00CD00", md5("hello word").toString());

// console.log("%c js-base64", "color:#00CD00", jsbase64.Base64.encode("hello word"));
// console.log("%c base64加码", "color:#00CD00", EncBase64.stringify(EncUtf8.parse("hello word")));
// console.log("%c base64解码", "color:#00CD00", EncBase64.parse("aGVsbG8gd29yZA==").toString(EncUtf8));

// console.log("%c mymd5","color:#00CD00", mymd5(window.globalConfig.signKey, "hello word"))
// console.log("%c HmacMD5", "color:#00CD00", HmacMD5("hello word", window.globalConfig.signKey).toString());

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
    // ? Base64.encode(str.replace(/\//g, "*"))
    // : Base64.encode(JSON.stringify(str).replace(/\//g, "*"));
    return A
      ? EncBase64.stringify(EncUtf8.parse(str.replace(/\//g, "*")))
      : EncBase64.stringify(
          EncUtf8.parse(JSON.stringify(str).replace(/\//g, "*"))
        );
  },
  base64Decode: function(A, str) {
    // ? Base64.decode(str).replace(/\*/g, "/")
    // : Base64.decode(JSON.parse(str)).replace(/\*/g, "/");
    return A
      ? EncBase64.parse(str)
          .toString(EncUtf8)
          .replace(/\*/g, "/")
      : EncBase64.parse(JSON.parse(str))
          .toString(EncUtf8)
          .replace(/\*/g, "/");
  },
  n22md5: function(key, str) {
    // let ss = mymd5(window.globalConfig.signKey, str);
    let ss = HmacMD5(str, window.globalConfig.signKey);
    return ss;
  }
};
