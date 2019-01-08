// pages/register/register.js
let app = getApp();
Page({
  // 页面的初始数据
  data: {
    currInputNum: 0, // 当前获取焦点的input的num值
    username: '',
    password: '',
    nickname: '',
    usernameErrorInfo: '', // 帐号错误信息
    passwordErrorInfo: '', // 密码错误信息
    nicknameErrorInfo: '', // 昵称错误信息
    usernameErrorIsHidden: true, // 帐号错误信息是否隐藏
    passwordErrorIsHidden: true, // 密码错误信息是否隐藏
    nicknameErrorIsHidden: true, // 昵称错误信息是否隐藏
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {

  },
  // 输入框获得焦点
  handleFocus (e) {
    let num = e.currentTarget.dataset.num;
    this.setData({currInputNum: num }); // 控制边框阴影样式
    if (num == 1) {
      if (!this.data.usernameErrorIsHidden) { // 如果有错误信息,清空输入框，隐藏错误提示
        this.setData({
          username: '',
          usernameErrorIsHidden: true
        });
      }
      return;
    } else if (num == 2) {
      if (!this.data.passwordErrorIsHidden) { // 如果有错误信息,清空输入框，隐藏错误提示
        this.setData({
          password: '',
          passwordErrorIsHidden: true
        });
      }
      return;
    } else if (num == 3) {
      if (!this.data.nicknameErrorIsHidden) { // 如果有错误信息,清空输入框，隐藏错误提示
        this.setData({
          nickname: '',
          nicknameErrorIsHidden: true
        });
      }
      return;
    }
  },
  // 输入框失去焦点
  handleBlur (e) {
    let num = e.currentTarget.dataset.num;
    let val = e.detail.value;
    let info = '';
    let flag = true;
    this.setData({ currInputNum: 0 }); // 控制边框阴影样式
    if (num == 1) {
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
      return;
    } else if (num == 2) {
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
      return;
    } else if (num == 3) {
      if (val === null || val === "") {
        info = '昵称未填写';
        flag = false;
      } else if (val.length > 12 || val.length < 2) {
        info = '请输入2-12位昵称';
        flag = false;
      }
      this.setData({
        nickname: val,
        nicknameErrorInfo: info,
        nicknameErrorIsHidden: flag
      });
      return;
    }
  },
  // 点击注册按钮
  handleRegister () {
    let un = this.data.username;
    let pw = this.data.password;
    let nk = this.data.nickname;
    if (un == '' || pw == '' || nk == '') {
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none'
      })
      return;
    } else if (!this.data.usernameErrorIsHidden || !this.data.passwordErrorIsHidden || !this.data.nicknameErrorIsHidden) {
      wx.showToast({
        title: '请输入正确信息',
        icon: 'none'
      })
      return;
    } else {
      let registedUsers = app.GLOBALDATA.registedUsers;
      let newUser = {
        username: this.data.username,
        password: this.data.password,
        nickname: this.data.nickname
      }
      registedUsers.push(newUser);
      wx.setStorageSync('registedUsers', registedUsers);
      app.GLOBALDATA.registedUsers = registedUsers;
      wx.redirectTo({
        url: '../login/login'
      })
    }
  }
})