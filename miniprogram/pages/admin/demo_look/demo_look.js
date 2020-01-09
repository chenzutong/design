// pages/admin/demand_look/demand_look.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lookDemo: {}
  },
  //点击选择
  stateDemo: function (e) {
    let state = e.detail.value.state
    console.log(state)
    let lookDemo = wx.getStorageSync('lookdemo')
    // 如果在素材点通过，则添加下单表
    const db = wx.cloud.database();
    if (state == 'passed') {
      console.log(lookDemo._id)
      db.collection('order').add({
        data: {
          demandID: lookDemo.demandID,
          userID: lookDemo.userID,
          username: lookDemo.username,
          ader_name: lookDemo.ader_name,
          age: lookDemo.age,
          amount: lookDemo.amount,
          city: lookDemo.city,
          date: lookDemo.date,
          describe: lookDemo.describe,
          feed: lookDemo.feed,
          link: lookDemo.link,
          sex: lookDemo.sex,
          platform: lookDemo.platform,
          product: lookDemo.product,
          screen: lookDemo.screen,
          source: lookDemo.source,
          title: lookDemo.title,
          total: lookDemo.total,
          unit: lookDemo.unit,
          state: ''
        }
      })
    }

    db.collection('material').doc(lookDemo._id).update({
      data: {
        state: state
      },
      success: function (res) {
        wx.showToast({
          title: '审核完成！',
          icon: 'success',
          duration: 2000
        })
      }
    })
    wx.reLaunch({
      url: '../demo_manage/demo_manage'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取刚刚点击的需求表的缓存所有信息
    let lookDemo = wx.getStorageSync('lookdemo')
    this.setData({
      lookDemo: lookDemo
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