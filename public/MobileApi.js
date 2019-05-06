;(function () {
  let callbackMap = {}
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  let isApp = u.indexOf('QJWAPP') > -1;

  let getNextMsgId = (method) => {
    return method + new Date().getTime()
  }

  function executeMobile (method, params, callback) {
    let data = {
      callbackId: null,
      params: params
    }

    if (callback) {
      let callbackId = getNextMsgId(method)
      data.callbackId = callbackId
      callbackMap[callbackId] = callback
    }

    if (isApp) {
      if (isAndroid) {
        return window.$android.native(method, JSON.stringify(data))
      } else if (isIOS) {
        return window.webkit.messageHandlers[method].postMessage(JSON.stringify(data))
      }
    }
  }
  window.$mobile = {}
  window.$mobile.callback = function (params) {
    let id = params.callbackId
    let callback = callbackMap[id]
    if (callback) {
      delete callbackMap[id]
      callback(params.params)
    }
  }
  window.$mobile.scanQRCode = (type, callback) => executeMobile('scanQRCode', type, callback)
  window.$mobile.logger = (msg) => executeMobile('logger', msg)
  window.$mobile.open = (url) => executeMobile('open', url)
  window.$mobile.navigationShow = (isShow) => executeMobile('navigationShow', isShow)
  window.$mobile.navigationTo = (index) => executeMobile('navigationTo', index)
  window.$mobile.showMine = () => executeMobile('showMine')
  window.$mobile.close = () => executeMobile('close')
  window.$mobile.saveRecycleQrCode = (params, callback) => executeMobile('saveRecycleQrCode', params, callback)
  window.$mobile.openCustomerService = (params) => executeMobile('openCustomerService', params)
})()
