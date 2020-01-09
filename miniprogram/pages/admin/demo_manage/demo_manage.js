// pages/user/demo/demo.js

var state = null;
var demodict_submitted = {};
var demolist_submitted = [];
var demodict_passed = {};
var demolist_passed = [];
var demodict_failed = {};
var demolist_failed = [];

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
    demolist_submitted: [],
    demolist_passed: [],
    demolist_failed: [],
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
  lookDemo: function (e) {
    let i = e.detail.value.indextest
    console.log(demolist_submitted[i])
    wx.setStorageSync('lookdemo', demolist_submitted[i])
    wx.navigateTo({
      url: '../demo_look/demo_look'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取需求表所有信息
    const db = wx.cloud.database();
    const material = db.collection('material');
    material.get({
      success: (res) => {
        let material = res.data;
        for (let i = 0; i < material.length; i++) {
          if ('submitted' == material[i].state) { //遍历已提交的需求表
            demodict_submitted = material[i];
            demolist_submitted.push(demodict_submitted);
            this.setData({
              demolist_submitted: demolist_submitted
            })
          }
          else if ('passed' == material[i].state) { //遍历已通过的需求表
            demodict_passed = material[i];
            demolist_passed.push(demodict_passed);
            this.setData({
              demolist_passed: demolist_passed
            })
          } else { // 未通过的需求表
            demodict_failed = material[i];
            demolist_failed.push(demodict_failed);
            this.setData({
              demolist_failed: demolist_failed
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