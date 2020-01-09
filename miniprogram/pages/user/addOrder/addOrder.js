// pages/admin/demand_look/demand_look.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lookOrder: {}
  },
  //点击下单
  stateOrder: function (e) {
    let state = e.detail.value.state
    console.log(state)
    let lookOrder = wx.getStorageSync('ORDER')
    const db = wx.cloud.database();
    db.collection('order').doc(lookOrder._id).update({
      data: {
        state: state
      },
      success: function (res) {
        wx.showToast({
          title: '下单成功！',
          icon: 'success',
          duration: 2000
        })
      }
    })
    wx.reLaunch({
      url: '../order/order'
    })
  
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取刚刚点击的需求表的缓存所有信息
    let lookOrder = wx.getStorageSync('ORDER')
    this.setData({
      lookOrder: lookOrder
    })
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