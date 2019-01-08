// pages/login/login.js
let app = getApp();
Page({
  // 页面的初始数据
  data: {
    currInputNum: 0, // 当前获取焦点的input的num值
    username: '',
    password: '',
    usernameErrorInfo: '', // 帐号错误信息
    passwordErrorInfo: '', // 密码错误信息
    usernameErrorIsHidden: true, // 帐号错误信息是否隐藏
    passwordErrorIsHidden: true, // 密码错误信息是否隐藏
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

  },
  // 帐号input获取焦点事件(除了校验，还用于动态增加class控制input的阴影样式，由于伪类:focus无效，才使用这种方式)
  handleFocusUN (e) {
    if (!this.data.usernameErrorIsHidden) { // 如果有错误信息,清空输入框，隐藏错误提示
      this.setData({
        username: '',
        usernameErrorIsHidden: true
      });
    }
    this.setData({currInputNum: e.currentTarget.dataset.num}); // 控制边框阴影样式
  },
  // 密码input获取焦点事件(除了校验，还用于动态增加class控制input的阴影样式，由于伪类:focus无效，才使用这种方式)
  handleFocusPW(e) {
    if (!this.data.passwordErrorIsHidden) { // 如果有错误信息,清空输入框，隐藏错误提示
      this.setData({
        password: '',
        passwordErrorIsHidden: true
      });
    }
    this.setData({ currInputNum: e.currentTarget.dataset.num }); // 控制边框阴影样式
  },
  // 帐号input失去焦点
  handleBlurUN (e) {
    this.setData({ currInputNum: 0 }); // 控制边框阴影样式
    let val = e.detail.value;
    let info = '';
    let flag = true;
    if (val === null || val === "") {
      info = 'AS ID未填写';
      flag = false;
    } else if (val.length > 12 || val.length < 6) {
      info = '请输入6-12位ID';
      flag = false;
    }
    this.setData({
      username: val,
      usernameErrorInfo: info,
      usernameErrorIsHidden: flag
    });
  },
  // 密码input失去焦点
  handleBlurPW (e) {
    this.setData({ currInputNum: 0 }); // 控制边框阴影样式
    let val = e.detail.value;
    let info = '';
    let flag = true;
    if (val === null || val === "") {
      info = '密码未填写';
      flag = false;
    } else if (val.length > 12 || val.length < 6) {
      info = '请输入6-12位密码';
      flag = false;
    }
    this.setData({
      password: val,
      passwordErrorInfo: info,
      passwordErrorIsHidden: flag
    });
  },
  // 点击登录按钮
  handleLogin () {
    let un = this.data.username;
    let pw = this.data.password;
    if (un == '' || pw == '') {
      wx.showToast({
        title: '请输入ID和密码',
        icon: 'none'
      })
      return;
    } else if (!this.data.usernameErrorIsHidden || !this.data.passwordErrorIsHidden) {
      wx.showToast({
        title: '请输入正确ID和密码',
        icon: 'none'
      })
      return;
    } else {
      let registedUsers = app.GLOBALDATA.registedUsers;
      if (registedUsers.length > 0) {
        for (let i=0; i<registedUsers.length; i++) {
          if (un == registedUsers[i].username && pw == registedUsers[i].password) {
            let obj = {
              username: registedUsers[i].username,
              password: registedUsers[i].password,
              nickName: registedUsers[i].nickName,
            }
            app.GLOBALDATA.currUser = obj;
            wx.setStorageSync('currUser', app.GLOBALDATA.currUser);
            wx.reLaunch({
              url: '../user/user'
            })
            console.log('登录成功')
            return;
          }
        }
        wx.showToast({
          title: 'ID或密码错误',
          icon: 'none'
        })
        return;
      } else {
        wx.showToast({
          title: '当前没有注册信息',
          icon: 'none'
        })
        return;
      }
    }
  },
  // 获取用户信息
  getUserInfo: function (e) {
    console.log('按钮获取用户信息后的回调函数触发,获取到的信息：', e)
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      let obj = { 
        nickname: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl  
      };
      app.GLOBALDATA.currUser = obj;
      wx.setStorageSync('currUser', app.GLOBALDATA.currUser);
      wx.reLaunch({
        url: '../user/user'
      })
      console.log('登陆成功')
    }
  },
  // 注册
  handleRegister () {
    wx.navigateTo({
      url: '../register/register'
    })
  }
})