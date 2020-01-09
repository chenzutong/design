// pages/user/demo/demo.js



Page({

  /**
   * 页面的初始数据
   */
  data: {
    section: [
      { name: '已提交', id: '1001' },
      { name: '已通过', id: '1002' },
      { name: '未通过', id: '1003' }
    ],
    demandlist_submitted: [],
    demandlist_passed: [],
    demandlist_failed: [],
    currentId: 1001,
    isDone: false,

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
  addDemand: function(e){
    wx.navigateTo({
      url: '../addDemand/addDemand'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取云数据库中的需求表数据
    const db = wx.cloud.database();
    const demand = db.collection('demand');
    var demanddict_submitted = {};
    var demandlist_submitted = [];
    var demanddict_passed = {};
    var demandlist_passed = [];
    var demanddict_failed = {};
    var demandlist_failed = [];
    demand.get({
      success: (res) => {
        let demand = res.data;
        let user = wx.getStorageSync('user')
        console.log(user._id)
        let demandID = demand.length + 100000
        wx.setStorageSync('demandID', demandID)
        for (let i = 0; i < demand.length; i++) {
          if(user._id == demand[i].userID){
            console.log('test')
            if ('submitted' == demand[i].state) { //遍历已提交的需求表
              demanddict_submitted = demand[i];
              demandlist_submitted.push(demanddict_submitted);
              this.setData({
                demandlist_submitted: demandlist_submitted,
                isDone: true
              })
            }
            else if ('passed' == demand[i].state){ //遍历已通过的需求表
              demanddict_passed = demand[i];
              demandlist_passed.push(demanddict_passed);
              this.setData({
                demandlist_passed: demandlist_passed
              })
            }else{ // 未通过的需求表
              demanddict_failed = demand[i];
              demandlist_failed.push(demanddict_failed);
              this.setData({
                demandlist_failed: demandlist_failed
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