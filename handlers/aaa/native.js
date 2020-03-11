const  = {
  alert: function(){
    window.AlipayJSBridge &&
        AlipayJSBridge.call(apiName, params, function(data) {
          alert("调用结果" + JSON.stringify(data));
        });
  }
}