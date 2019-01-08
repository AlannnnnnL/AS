// pages/tool/tool.js
Page({
  // 页面的初始数据
  data: {

  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

  },
  // 页面跳转
  navigateTo (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
})