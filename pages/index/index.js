//index.js
Page({
  data: {
    // 轮播配置
    autoplay: true,
    indicatorDots: true,
    swiperImgs: ['../../image/index/swiper1.jpg', '../../image/index/swiper2.jpg', '../../image/index/swiper3.jpg'],
    // 精品推荐
    recommend: [{
      imgUrl: '../../image/index/f1.jpg',
      txt: 'HelloWorld 你好世界'
    }, {
      imgUrl: '../../image/index/f2.jpg',
      txt: 'HelloWorld 你好世界'
    }, {
      imgUrl: '../../image/index/f3.jpg',
      txt: 'HelloWorld 你好世界'
    }, {
      imgUrl: '../../image/index/f4.jpg',
      txt: 'HelloWorld 你好世界'
    }],
    // 热门
    hot: [{
      imgUrl: '../../image/index/k1.jpg',
      txt: 'HelloWorld 你好世界',
      detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
    }, {
      imgUrl: '../../image/index/k2.jpg',
      txt: 'HelloWorld 你好世界',
      detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
    }, {
      imgUrl: '../../image/index/k3.jpg',
      txt: 'HelloWorld 你好世界',
      detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
    }, {
      imgUrl: '../../image/index/k4.jpg',
      txt: 'HelloWorld 你好世界',
      detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
    }, {
      imgUrl: '../../image/index/k5.jpg',
      txt: 'HelloWorld 你好世界',
      detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
    }]
  },
  onLoad: function () {
    
  },
  // 下拉刷新
  onPullDownRefresh () {
    console.log('下拉')
    this.setData({
      hot: [{
        imgUrl: '../../image/index/k1.jpg',
        txt: 'HelloWorld 你好世界',
        detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
      }, {
        imgUrl: '../../image/index/k2.jpg',
        txt: 'HelloWorld 你好世界',
        detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
      }, {
        imgUrl: '../../image/index/k3.jpg',
        txt: 'HelloWorld 你好世界',
        detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
      }, {
        imgUrl: '../../image/index/k4.jpg',
        txt: 'HelloWorld 你好世界',
        detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
      }, {
        imgUrl: '../../image/index/k5.jpg',
        txt: 'HelloWorld 你好世界',
        detail: '在年轻人的颈项上，没有什么东西能比事业心这颗灿烂的宝珠更迷人的了'
      }]
    })
    wx.stopPullDownRefresh();
  },
  // 上拉加载
  onReachBottom () {
    console.log('上拉')
    wx.showLoading({
      title: '加载中'
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 1000);
    let hot = this.data.hot;
    hot.push(...this.data.hot);
    this.setData({hot: hot});
  }
})
