// pages/user/demo/demo.js

var state = null;

var demandlist_submitted = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    section: [
      { name: '待处理', id: '1001' },
      { name: '已通过', id: '1002' },
      { name: '未通过', id: '1003' }
    ],
    demandlist_submitted: [],
    demandlist_passed: [],
    demandlist_failed: [],
    currentId: 1001, 

  },

  //点击导航栏
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({ currentId: id })
    }
  },
  //点击查看
  lookDemand: function (e) {
    let i = e.detail.value.indextest
    console.log(demandlist_submitted[i])
    wx.setStorageSync('look', demandlist_submitted[i])
     wx.navigateTo({
       url: '../demand_look/demand_look',
     })
    demandlist_submitted = []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var demanddict_submitted = {};
    var demanddict_passed = {};
    var demandlist_passed = [];
    var demanddict_failed = {};
    var demandlist_failed = [];
    // 获取需求表所有信息
    const db = wx.cloud.database();
    const demand = db.collection('demand');
    demand.get({
      success: (res) => {
        let demand = res.data;
        for (let i = 0; i < demand.length; i++) {
          if ('submitted' == demand[i].state) { //遍历已提交的需求表
            demanddict_submitted = demand[i];
            // console.log(demandlist_submitted[0])
            demandlist_submitted.push(demanddict_submitted);
            this.setData({
              demandlist_submitted: demandlist_submitted
            })
          }
          else if ('passed' == demand[i].state) { //遍历已通过的需求表
            demanddict_passed = demand[i];
            demandlist_passed.push(demanddict_passed);
            this.setData({
              demandlist_passed: demandlist_passed
            })
          } else { // 未通过的需求表
            demanddict_failed = demand[i];
            demandlist_failed.push(demanddict_failed);
            this.setData({
              demandlist_failed: demandlist_failed
            })
          }
        }
      }
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