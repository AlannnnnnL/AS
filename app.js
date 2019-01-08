//app.js
App({
  onLaunch: function () {
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    //获取已注册的用户列表和当前用户信息
    this.GLOBALDATA.registedUsers = wx.getStorageSync('registedUsers') || [];
    this.GLOBALDATA.currUser = wx.getStorageSync('currUser') || {};
  },
  GLOBALDATA: {
    registedUsers: [],
    currUser: {}
  }
})