// pages/admin/adminIndex/adminIndex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        url: '/images/a.jpg'
      }, {
        url: '/images/b.jpg'
      }, {
        url: '/images/c.jpg'
      }, {
        url: '/images/img1.jpg'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    demandlist: [],
    demolist: [],
    orderlist: [],
    imageurl:'/images/timg.jpg'

  },
  toUser: function (e) {
    wx.navigateTo({
      url: '../usermanage/usermanage'
    })
  },
  toDemand: function (e) {
    wx.navigateTo({
      url: '../demand_manage/demand_manage'
    })
  },
  toDemo: function (e) {
    wx.navigateTo({
      url: '../demo_manage/demo_manage'
    })
  },
  toOrder: function (e) {
    wx.navigateTo({
      url: '../order_manage/order_manage'
    })
  },
  exit: function (e) {
    wx.reLaunch({
      url: '/pages/login/login'
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