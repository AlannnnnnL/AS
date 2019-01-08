// pages/express/express.js
let Base64 = require('../../utils/base64.js');
let Md5 = require('../../utils/md5.js');
Page({
  // 页面的初始数据
  data: {
    shipperIndex: -1,
    shipperArr: ['顺丰速运', '百世快递', '中通快递', '申通快递', '圆通快递', '韵达速递', '邮政快递包裹', 'EMS', '天天快递', '京东快递', '德邦快递'],
    shipperArrDetail: [
      {
        code: 'SF',
        txt: '顺丰速运'
      },
      {
        code: 'HTKY',
        txt: '百世快递'
      },
      {
        code: 'ZTO',
        txt: '中通快递'
      },
      {
        code: 'STO',
        txt: '申通快递'
      },
      {
        code: 'YTO',
        txt: '圆通快递'
      },
      {
        code: 'YD',
        txt: '韵达速递'
      },
      {
        code: 'YZPY',
        txt: '邮政快递包裹'
      },
      {
        code: 'EMS',
        txt: 'EMS'
      },
      {
        code: 'HHTT',
        txt: '天天快递'
      },
      {
        code: 'JD',
        txt: '京东快递'
      },
      {
        code: 'DBL',
        txt: '德邦快递'
      }
    ],
    currShipper: '', // 当前快递公司代码
    inputValue: '', // 单号
    expressInfo: [], // 物流信息
    isHiddenNoneInfo: true
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

  },
  // 选择快递公司
  changeShipper(e) {
    let index = e.detail.value;
    this.setData({
      shipperIndex: index,
      currShipper: this.data.shipperArrDetail[index].code,
      isHiddenNoneInfo: true,
      expressInfo: []
    });
  },
  // 输入值
  input(e) {
    this.setData({ 
      inputValue: e.detail.value,
      isHiddenNoneInfo: true,
      expressInfo: []
    });
  },
  // 查询
  handleCilck() {
    if (this.data.currShipper == '') {
      wx.showToast({
        title: '请选择快递公司！',
        icon: 'none'
      })
      return;
    }
    if (this.data.inputValue == '') {
      wx.showToast({
        title: '请输入单号！',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '查询中...'
    })
    let requestData = "{ShipperCode: '" + this.data.currShipper + "','LogisticCode': '" + this.data.inputValue + "'}";
    this.getExpressInfo(requestData, res => {
      console.log(res)
      console.log(res.Traces)
      let ei = res.Traces ? res.Traces : '';
      let flag = ei.length > 0 ? true : false;
      this.setData({ 
        expressInfo: ei,
        isHiddenNoneInfo: flag
      })
      wx.hideLoading()
    })
  },
  // 调用接口(爱查快递)
  getExpressInfo(requestData, callback) {
    let str = requestData + '808234bd-14b8-45fb-b260-cb1693d9f85b';
    console.log(str)
    console.log(Md5.md5(str).toLowerCase())
    console.log(Base64.CusBASE64.encoder(Md5.md5(str).toLowerCase()))
    let dataSign = Base64.CusBASE64.encoder(Md5.md5(str).toLowerCase());
    wx.request({
      url: 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',
      data: {
        'RequestData': requestData,
        'EBusinessID': '1423100',
        'RequestType': '1002',
        'DataSign': dataSign,
        'DataType': '2'
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 该方式会进行encodeURIComponent编码
      },
      success(res) {
        callback(res.data)
      }
    })
  }
})