// pages/user/demo/demo.js

var state = null;
var orderdict_submitted = {};
var orderlist_submitted = [];
var orderdict_passed = {};
var orderlist_passed = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    section: [
      { name: '已下单', id: '1001' },
      { name: '未下单', id: '1002' }
    ],
    orderlist_submitted: [],
    orderlist_passed: [],
    orderlist_failed: [],
    currentId: 1001,

  },

  //点击导航栏
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({ currentId: id })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log('test')
    // 获取需求表所有信息
    const db = wx.cloud.database();
    const order = db.collection('order');
    
    order.get({
      success: (res) => {
        let order = res.data;
        console.log(order)
        for (let i = 0; i < order.length; i++) {
          if ('' == order[i].state) { 
            orderdict_submitted = order[i];
            orderlist_submitted.push(orderdict_submitted);
            this.setData({
              orderlist_submitted: orderlist_submitted
            })
          }else { 
            orderdict_failed = order[i];
            orderlist_failed.push(orderdict_failed);
            this.setData({
              orderlist_failed: orderlist_failed
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