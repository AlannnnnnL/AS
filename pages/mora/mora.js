// pages/mora/mora.js
let timer = null;
let num = 0;
Page({
  // 页面的初始数据
  data: {
    winNum: 0, // 获胜次数
    resultTxt: '', // 游戏结果
    topLeftImg: '',
    topRightImg: '../../image/mora/wenhao.png',
    canHandlePunch: true,
    imgSrcs: [
      '../../image/mora/shitou.png',
      '../../image/mora/jiandao.png',
      '../../image/mora/bu.png',
    ]
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

  },
  onShow() {
    // 获取本地存储，“已经获胜的次数”
    let oldWinNum = wx.getStorageSync('winNum');
    if (oldWinNum != null && oldWinNum != '') {
      this.setData({ winNum: oldWinNum });
    }
    this.timerGo();
  },
  onUnload() {
    clearInterval(timer);
  },
  // 开启定时器
  timerGo() {
    timer = setInterval(this.move, 100);
  },
  // 随机出拳
  move() {
    console.log('游戏');
    //如果大于等于3，重置
    if (num >= 3) {
      num = 0;
    }
    this.setData({ topLeftImg: this.data.imgSrcs[num] })
    num++;
  },
  // 出拳
  handlePunch(e) {
    if (!this.data.canHandlePunch) {
      return;
    }
    // 你的出拳
    this.setData({ topRightImg: this.data.imgSrcs[e.currentTarget.id] });
    // 清除计时器(电脑出拳)
    clearInterval(timer);

    // 获取比赛数据
    let playerPunch = this.data.topRightImg;
    let computerPunch = this.data.topLeftImg;
    let num = this.data.winNum;
    let str = '0.0~\nYou Lost!';

    // 判断比赛结果
    if (playerPunch == computerPunch) { // 平局
      str = 'Game Draw!';
    } else if ((playerPunch == "../../image/mora/shitou.png" && computerPunch == "../../image/mora/jiandao.png")
      || (playerPunch == "../../image/mora/jiandao.png" && computerPunch == "../../image/mora/bu.png")
      || (playerPunch == "../../image/mora/bu.png" && computerPunch == "../../image/mora/shitou.png")
    ) {
      // 获胜后增加次数、改变文字内容、重新缓存获胜次数
      num++;
      str = 'Ho~\nYou Win!';
      wx.setStorageSync("winNum", num);
    }

    //刷新数据
    this.setData({
      resultTxt: str,
      winNum: num,
      canHandlePunch: false
    });
  },
  // 再来
  handleAgain() {
    if (this.data.canHandlePunch) {
      return;
    }
    // 开启定时器
    this.timerGo();
    //刷新数据
    this.setData({
      resultTxt: '',
      canHandlePunch: true,
      topRightImg: '../../image/mora/wenhao.png'
    });
  }
})