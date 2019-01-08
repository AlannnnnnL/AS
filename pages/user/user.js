// pages/user/user.js
let app = getApp();
Page({
  // 页面的初始数据
  data: {
    avatarUrl: '', // 头像
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
  },
  onShow () {
    let cu = app.GLOBALDATA.currUser;
    if (this.isEmptyObject(cu)) {
      wx.redirectTo({
        url: '../login/login'
      })
    } else if (cu.avatarUrl) {
      if (cu.avatarUrl != '' && cu.avatarUrl != null) {
        this.setData({ avatarUrl: cu.avatarUrl});
      }
    }
  },
  isEmptyObject (obj) {
    for (let key in obj) {
      return false;
    }
    return true;
  },
  // 退出登录
  logout () {
    console.log('退出登录');
    wx.removeStorageSync('currUser');
    app.GLOBALDATA.currUser = {};
    wx.redirectTo({
      url: '../login/login'
    })
  }
})