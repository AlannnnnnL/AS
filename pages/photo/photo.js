// pages/photo/photo.js
Page({
  // 页面的初始数据
  data: {
    // 待上传的图片
    uploadImgs: [],
    // 已经上传的图片
    uploadedImgs: []
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
  },
  onShow () {
    let uedImgs = wx.getStorageSync('uploadedImgs');
    if (uedImgs) {
      this.setData({ uploadedImgs: uedImgs })
    }
  },
  // 上传图片
  chooseImage () {
    let _this = this;
    wx.chooseImage({
      count: 9,
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let uimgs = _this.data.uploadImgs;
        uimgs.push(...res.tempFilePaths);
        _this.setData({
          uploadImgs: uimgs
        })
      }
    })
  },
  // 上传预览
  previewUploadImage (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.img,
      urls: this.data.uploadImgs
    })
  },
  // 已上传的预览
  previewUploadedImage (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.img,
      urls: this.data.uploadedImgs
    })
  },
  // 提交
  submit () {
    let uedImgs = this.data.uploadedImgs;
    uedImgs.unshift(...this.data.uploadImgs);
    this.setData({
      uploadedImgs: uedImgs,
      uploadImgs: []
    })
    wx.setStorageSync('uploadedImgs', uedImgs);
  }
})