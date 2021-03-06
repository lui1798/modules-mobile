cordova.define("cordova/plugin_list", function(require, exports, module) {
  module.exports = [
    {
      id: "cordova-plugin-statusbar.statusbar",
      file: "plugins/cordova-plugin-statusbar/www/statusbar.js",
      pluginId: "cordova-plugin-statusbar",
      clobbers: ["window.StatusBar"]
    },
    {
      id: "cordova-plugin-camera.Camera",
      file: "plugins/cordova-plugin-camera/www/CameraConstants.js",
      pluginId: "cordova-plugin-camera",
      clobbers: ["Camera"]
    },
    {
      id: "cordova-plugin-camera.CameraPopoverOptions",
      file: "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      pluginId: "cordova-plugin-camera",
      clobbers: ["CameraPopoverOptions"]
    },
    {
      id: "cordova-plugin-camera.camera",
      file: "plugins/cordova-plugin-camera/www/Camera.js",
      pluginId: "cordova-plugin-camera",
      clobbers: ["navigator.camera"]
    },
    {
      id: "cordova-plugin-camera.CameraPopoverHandle",
      file: "plugins/cordova-plugin-camera/www/ios/CameraPopoverHandle.js",
      pluginId: "cordova-plugin-camera",
      clobbers: ["CameraPopoverHandle"]
    },
    {
      id: "cordova-plugin-wechat.Wechat",
      file: "plugins/cordova-plugin-wechat/www/wechat.js",
      pluginId: "cordova-plugin-wechat",
      clobbers: ["Wechat"]
    },
    {
      id: "cordova-plugin-device.device",
      file: "plugins/cordova-plugin-device/www/device.js",
      pluginId: "cordova-plugin-device",
      clobbers: ["device"]
    },
    {
      id: "jpush-phonegap-plugin.JPushPlugin",
      file: "plugins/jpush-phonegap-plugin/www/JPushPlugin.js",
      pluginId: "jpush-phonegap-plugin",
      clobbers: ["JPush"]
    },
    {
      id: "cordova-plugin-contacts.contacts",
      file: "plugins/cordova-plugin-contacts/www/contacts.js",
      pluginId: "cordova-plugin-contacts",
      clobbers: ["navigator.contacts"]
    },
    {
      id: "cordova-plugin-contacts.Contact",
      file: "plugins/cordova-plugin-contacts/www/Contact.js",
      pluginId: "cordova-plugin-contacts",
      clobbers: ["Contact"]
    },
    {
      id: "cordova-plugin-contacts.convertUtils",
      file: "plugins/cordova-plugin-contacts/www/convertUtils.js",
      pluginId: "cordova-plugin-contacts"
    },
    {
      id: "cordova-plugin-contacts.ContactAddress",
      file: "plugins/cordova-plugin-contacts/www/ContactAddress.js",
      pluginId: "cordova-plugin-contacts",
      clobbers: ["ContactAddress"]
    },
    {
      id: "cordova-plugin-contacts.ContactError",
      file: "plugins/cordova-plugin-contacts/www/ContactError.js",
      pluginId: "cordova-plugin-contacts",
      clobbers: ["ContactError"]
    },
    {
      id: "cordova-plugin-contacts.ContactField",
      file: "plugins/cordova-plugin-contacts/www/ContactField.js",
      pluginId: "cordova-plugin-contacts",
      clobbers: ["ContactField"]
    },
    {
      id: "cordova-plugin-contacts.ContactFindOptions",
      file: "plugins/cordova-plugin-contacts/www/ContactFindOptions.js",
      pluginId: "cordova-plugin-contacts",
      clobbers: ["ContactFindOptions"]
    },
    {
      id: "cordova-plugin-contacts.ContactName",
      file: "plugins/cordova-plugin-contacts/www/ContactName.js",
      pluginId: "cordova-plugin-contacts",
      clobbers: ["ContactName"]
    },
    {
      id: "cordova-plugin-contacts.ContactOrganization",
      file: "plugins/cordova-plugin-contacts/www/ContactOrganization.js",
      pluginId: "cordova-plugin-contacts",
      clobbers: ["ContactOrganization"]
    },
    {
      id: "cordova-plugin-contacts.ContactFieldType",
      file: "plugins/cordova-plugin-contacts/www/ContactFieldType.js",
      pluginId: "cordova-plugin-contacts",
      merges: [""]
    },
    {
      id: "cordova-plugin-contacts.contacts-ios",
      file: "plugins/cordova-plugin-contacts/www/ios/contacts.js",
      pluginId: "cordova-plugin-contacts",
      merges: ["navigator.contacts"]
    },
    {
      id: "cordova-plugin-contacts.Contact-iOS",
      file: "plugins/cordova-plugin-contacts/www/ios/Contact.js",
      pluginId: "cordova-plugin-contacts",
      merges: ["Contact"]
    },
    {
      id: "cordova-plugin-MAPlugin.MAPlugin",
      file: "plugins/cordova-plugin-MAPlugin/www/MAPlugin.js",
      pluginId: "cordova-plugin-MAPlugin",
      clobbers: ["window.MAPlugin"]
    }
  ];
  module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-whitelist": "1.3.3",
      "cordova-plugin-statusbar": "2.4.1",
      "cordova-plugin-camera": "4.0.2",
      "cordova-plugin-wechat": "2.1.0",
      "cordova-plugin-device": "2.0.3",
      "cordova-plugin-jcore": "1.2.8",
      "jpush-phonegap-plugin": "3.6.4",
      "cordova-plugin-contacts": "3.0.1",
      "cordova-plugin-MAPlugin": "1.0.0"
    };
  // BOTTOM OF METADATA
});
