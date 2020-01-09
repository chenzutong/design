// pages/user/addDemand/addDemand.js
var screen = null;
var feed = null;
var title = null;
var link = null;
var source = null;
var describe = null;
var state = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenItems: ['静态', '动态','视频'],
    screen: '静态',
    feedItems: ['小图', '大图', '组图', '视频'],
    feed: '小图',
    files: [],

  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  screenChange: function (e) {
    let i = e.detail.value;
    this.setData({ screen: this.data.screenItems[i] })
  },
  feedChange: function (e) {
    let i = e.detail.value;
    this.setData({ feed: this.data.feedItems[i] })
  },
  submitForm: function (e) {
    let demo = wx.getStorageSync('DEMO')
    let myDemo = e.detail.value

    //将需求表数据上传数据云
    screen = myDemo.screen;
    feed = myDemo.feed;
    link = myDemo.link;
    source = myDemo.source;
    title = myDemo.title;
    describe = myDemo.describe;
    state = 'submitted';

    const db = wx.cloud.database();
    db.collection('material').doc(demo._id).update({
      data: {
        screen: screen,
        feed: feed,
        link: link,
        source: source,
        title: title,
        describe: describe,
        state: 'submitted',
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        // console.log(res)
        wx.showToast({
          title: '提交成功！！！',
          icon: 'success',
          duration: 2000
        })
      }
    })
    // console.log(myDemand)
    wx.reLaunch({
      url: '../demo/demo'
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