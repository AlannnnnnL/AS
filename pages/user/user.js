// pages/user/user.js
let app = getApp();
Page({
  // 页面的初始数据
  data: {
    avatarUrl: 'https://thumbnail0.baidupcs.com/thumbnail/4506dc5c1417859b009438798e4f4ee3?fid=1061451524-250528-103909565181044&time=1546077600&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-Me3BgR%2FQy0ln4e7Ls4fQe83wDDA%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=8413385499484523359&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video', // 头像
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