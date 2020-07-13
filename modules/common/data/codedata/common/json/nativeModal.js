export default [
    {
        "code": "KS_OCR",
        "url": "hybrid://FacePlugin:101/idcardDetect",
        "modal": {
            "iphone": "xxxxxxxxxxx",
            "body": "xxxxxxxxxxxxxx"
        },
        "desc": "旷世ocr识别",
        "channel": 3,
        "version": "0.0.1"
    },
    {
        "code": "WT_OCR",
        "url": "hybrid://FacePlugin:101/idcardDetect wt",
        "modal": {
            "iphone": "xxxxxxxxxxx",
            "body": "xxxxxxxxxxxxxx"
        },
        "desc": "文通ocr识别",
        "channel": 3,
        "version": "0.0.1"
    },
    {
        "code": "KS_FACE",
        "url": "hybrid://FacePlugin:101/faceDetect",
        "modal": {
            "iphone": "xxxxxxxxxxx",
            "body": "xxxxxxxxxxxxxx"
        },
        "desc": "旷世人脸识别",
        "channel": 3,
        "version": "0.0.1"
    },
    {
        "code": "N22_CHECKUPDATE",
        "url": "hybrid://UpdatePlugin:101/checkUpdate",
        "modal": "",
        "desc": "n22检查更新",
        "channel": 1,
        "version": "0.0.1"
    },
    {
        "code": "N22_DOWNLOADUPDATE",
        "url": "hybrid://UpdatePlugin:101/downloadUpdate",
        "modal": "",
        "desc": "n22下载更新",
        "channel": 1,
        "version": "0.0.1"
    },
    {
        "code": "N22_TOUCHIDLOGIN",
        "url": "hybrid://VerifyPlugin:101/touchIdLogin",
        "modal": "",
        "desc": "指纹识别",
        "channel": 1,
        "version": "0.0.1"
    },
    {
        "code": "N22_INVOKESEND",
        "url": "hybrid://MASendSms:401/invokeSend",
        "modal": {
            "iphone": "xxxxxxxxxxx",
            "body": "xxxxxxxxxxxxxx"
        },
        "desc": "短信",
        "channel": 1,
        "version": "0.0.1"
    },
    {
        "code": "AlipayJSBridge_alert",
        "url": "",
        "modal": {
            "iphone": "xxxxxxxxxxx",
            "body": "xxxxxxxxxxxxxx"
        },
        "desc": "短信",
        "channel": 1,
        "version": "0.0.1"
    },
    {
        "code": "Cordova_wechatShare",
        "url": "hybrid://MASendSms:401/invokeSend",
        "modal": {
            "iphone": "xxxxxxxxxxx",
            "body": "xxxxxxxxxxxxxx"
        },
        "desc": "短信",
        "channel": 1,
        "version": "0.0.1"
    },
    {
        "code": "Cordova_getContacts",
        "url": "",
        "modal": [
            {
                "id": "27",
                "rawId": "31",
                "displayName": "招商信用卡",
                "name": {
                    "familyName": "招商信用卡",
                    "formatted": "招商信用卡"
                },
                "nickname": null,
                "phoneNumbers": [
                    {
                        "id": "64",
                        "pref": false,
                        "value": "400-820-5555",
                        "type": "home"
                    }
                ],
                "emails": null,
                "addresses": null,
                "ims": null,
                "organizations": null,
                "birthday": null,
                "note": null,
                "photos": null,
                "categories": null,
                "urls": null
            },
            {
                "id": "28",
                "rawId": "30",
                "displayName": "测试客户",
                "name": {
                    "familyName": "xxxx",
                    "formatted": "xxxxxx"
                },
                "nickname": null,
                "phoneNumbers": [
                    {
                        "id": "64",
                        "pref": false,
                        "value": "13498765411",
                        "type": "home"
                    }
                ],
                "emails": null,
                "addresses": null,
                "ims": null,
                "organizations": null,
                "birthday": null,
                "note": null,
                "photos": null,
                "categories": null,
                "urls": null
            }
        ],
        "desc": "通讯录导入",
        "channel": 1,
        "version": "0.0.1"
    }
]