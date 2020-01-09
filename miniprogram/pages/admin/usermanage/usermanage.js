// pages/admin/adminhome/adminhome.js
var newname = null;//变量，用于存放新用户的代理商
var newemail = null;//变量，用于存放新用户的代理商
var newnum = null;//变量，用于存放新用户的账号
var newpw = null;//变量，用于存放新用户的密码

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  newnameInput: function (event) {
    newname = event.detail.value

  },
  newemailInput: function (event) {
    newemail = event.detail.value

  },
  newnumInput: function (event) {
    newnum = event.detail.value

  },

  newpwInput(event) {
    newpw = event.detail.value
  },
  // 将输入的账号密码添加到用户表中
  register() {
    console.log("注册的代理商名：" + newname)
    console.log("注册的代理商名：" + newemail)
    console.log("注册的账号：" + newnum)
    console.log("注册的密码：" + newpw)
    const db = wx.cloud.database();
    db.collection('user').add({
      data: {
        newemail: newemail,
        name: newname,
        username: newnum,
        password: newpw,
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '注册成功！！',
          icon: 'success',
          duration: 3500
        })
      }
    })
    wx.reLaunch({
      url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})