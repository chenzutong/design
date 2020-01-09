// pages/admin/demand_look/demand_look.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lookDemand:{}
  },
  //点击选择
  stateDemand: function (e) {
    let state = e.detail.value.state
    console.log(state)
    let lookDemand = wx.getStorageSync('look')
    // 如果在需求点通过，则添加素材表
    const db = wx.cloud.database();
    if(state == 'passed'){
      console.log(lookDemand._id)
      db.collection('material').add({
        data: {
          demandID: lookDemand.demandID,
          userID: lookDemand.userID,
          username: lookDemand.username,
          ader_name: lookDemand.ader_name,
          platform: lookDemand.platform,
          age: lookDemand.age,
          amount: lookDemand.amount,
          city: lookDemand.city,
          note: lookDemand.note,
          product: lookDemand.product,
          sex: lookDemand.male,
          state: lookDemand.state,
          total: lookDemand.total,
          unit:lookDemand.unit,
          date:lookDemand.date,
          state:''
        }
      })
    }

    db.collection('demand').doc(lookDemand._id).update({
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
    wx: wx.removeStorageSync('look')
    wx.reLaunch({
      url: '../demand_manage/demand_manage'
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取刚刚点击的需求表的缓存所有信息
    let lookDemand = wx.getStorageSync('look')
    this.setData({
      lookDemand: lookDemand
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