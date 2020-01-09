// pages/user/index/index.js



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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var demandlist = [];
    var demolist = [];
    var orderlist = [];
    let user = wx.getStorageSync('user')
    // 获取云数据库中的需求表数据
    const db = wx.cloud.database();
    const material = db.collection('material');
    const order = db.collection('order'); 
    console.log(demolist)
    console.log(user._id)
    db.collection('demand').where({ userID: user._id }).get({
      success: (res) => {
        let demand = res.data;
        demandlist.push(demand[demand.length - 1]);
        demandlist.push(demand[demand.length - 2]);
        demandlist.push(demand[demand.length - 3]);
        this.setData({
          demandlist: demandlist
        })
      }
    })
    material.where({ userID: user._id }).get({
      success: (res) => {
        let material = res.data;
        demolist.push(material[material.length - 1]);
        demolist.push(material[material.length - 2]);
        demolist.push(material[material.length - 3]);
        this.setData({
          demolist: demolist
        })
      }
    })
    order.where({ userID: user._id }).get({
      success: (res) => {
        let order = res.data;
        orderlist.push(order[order.length - 1]);
        orderlist.push(order[order.length - 2]);
        orderlist.push(order[order.length - 3]);
        // console.log(orderlist)
        this.setData({
          orderlist: orderlist
        })
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