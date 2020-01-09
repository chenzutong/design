// pages/user/demo/demo.js

var state = null;
var orderdict_submitted = {};
var orderlist_submitted = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    section: [
      { name: '未下单', id: '1001' },
      { name: '已下单', id: '1002' }
    ],

    currentId: 1001,
    orderlist_submitted: [],
    orderlist_passed: [],
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  //点击导航栏
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({ currentId: id })
    }

  },
  //点击处理
  addOrder: function (e) {
    let j = e.detail.value.indextest
    console.log(orderlist_submitted[j])
    wx.setStorageSync('ORDER', orderlist_submitted[j])
    wx.navigateTo({
      url: '../addOrder/addOrder'
    })
    orderlist_submitted = [];
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderdict_passed = {};
    var orderlist_passed = [];
    // 获取云数据库中的素材数据所有信息
    const db = wx.cloud.database();
    const order = db.collection('order');
    order.get({
      success: (res) => {
        
        let order = res.data;
        let user = wx.getStorageSync('user')
        for (let i = 0; i < order.length; i++) {
          if (user._id == order[i].userID) {
            if ('' == order[i].state) { //遍历未下单
              orderdict_submitted = order[i];
              orderlist_submitted.push(orderdict_submitted);
              console.log(orderdict_submitted)
              this.setData({
                orderlist_submitted: orderlist_submitted
              })
            }
            else if ('passed' == order[i].state) { //遍历已下单
              orderdict_passed = order[i];
              orderlist_passed.push(orderdict_passed);
              this.setData({
                orderlist_passed: orderlist_passed
              })
            } 
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