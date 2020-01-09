// pages/user/addDemand/addDemand.js
var ader_name = null;
var age = null;
var amount = null;
var city = null;
var date = null;
var notes = null;
var platform = null;
var position = null;
var product = null;
var sex = null;
var total = null;
var unit = null;
var state = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    platformItems: ['今日头条', '抖音短视频'],
    platform: '今日头条',
    productItems: ['开屏广告', '信息流广告'],
    product: '开屏广告',
    cityArray: [['全国', '超一线城市', '其他城市'], ['全国']],
    objectcityArray: [
      [
        {
          id: 0,
          name: '全国'
        },
        {
          id: 1,
          name: '超一线城市'
        },
        {
          id: 1,
          name: '其他城市'
        }
      ], [
        {
          id: 0,
          name: '全国'
        }
      ]
    ],
    cityIndex: [0, 0],
    position1Items: ['首刷', '轮播'],
    position1: '首刷',
    position2Items : ['4-1', '4-2'],
    position2: '4-1',
    ageItems: ['10-18岁', '18-24岁', '25-35岁', '35-65岁'],
    age: '10-18岁',
    sexes: [
      { name: 'male', value: '男' },
      { name: 'female', value: '女' },
      { name: 'all', value: '全部', checked: 'true' },
    ],
    date: '2019-11-12',
    unitItems: ['CPM', 'CPT'],
    unit: 'CPM',
    amount: 1,
    sex:''

  },
  platformChange: function (e) {
    let i = e.detail.value;
    this.setData({ platform: this.data.platformItems[i] })
  },
  productChange: function (e) {
    let i = e.detail.value;
    this.setData({ product: this.data.productItems[i] })
  },
  cityChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  cityColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      cityArray: this.data.cityArray,
      cityIndex: this.data.cityIndex
    };
    data.cityIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.cityIndex[0]) {
          case 0:
            data.cityArray[1] = ['全国'];
            break;
          case 1:
            data.cityArray[1] = ['广州 ', '深圳', '珠海', '上海', '北京'];
            break;
          case 2:
            data.cityArray[1] = ['潮州 ', '肇庆', '四会', '汕头', '茂名'];
            break;
        }
        data.cityIndex[1] = 0;
        break;
    }
    console.log(data.cityArray[1][data.cityIndex[1]])
    city = data.cityArray[1][data.cityIndex[1]]
    this.setData(data);
  },
  position1Change: function (e) {
    let i = e.detail.value;
    this.setData({ position1: this.data.position1Items[i] })
  },
  position2Change: function (e) {
    let i = e.detail.value;
    this.setData({ position2: this.data.position2Items[i] })
  },
  ageChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let i = e.detail.value;
    this.setData({ age: this.data.ageItems[i] })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let value = e.detail.value;
    this.setData({
      sex: value
    })
  },
  dateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  unitChange: function (e) {
    let i = e.detail.value;
    this.setData({ unit: this.data.unitItems[i] })
  },
  /* 加数 */
  addCount: function (e) {
    console.log("刚刚您点击了加1");
    var amount = this.data.amount;
    // 总数量-1  
    if (amount < 1000) {
      this.data.amount++;
    }
    // 将数值与状态写回  
    this.setData({
      amount: this.data.amount
    });
  },
  /* 减数 */
  delCount: function (e) {
    console.log("刚刚您点击了减1");
    var amount = this.data.amount;
    // 商品总数量-1
    if (amount > 1) {
      this.data.amount--;
    }
    // 将数值与状态写回  
    this.setData({
      amount: this.data.amount
    });
  },
  submitForm: function (e) {
    wx.setStorageSync('myDemand', e.detail.value)
    let myDemand = wx.getStorageSync('myDemand')
    let user = wx.getStorageSync('user')
    let demandID = wx.getStorageSync('demandID')
    console.log(user)

    //将需求表数据上传数据云
    ader_name = myDemand.ader_name;
    age = myDemand.age;
    amount = myDemand.amount;
    date = myDemand.date;
    unit = myDemand.unit;
    notes = myDemand.notes;
    platform = myDemand.platform;
    position = myDemand.position ;
    product = myDemand.product;
    sex = myDemand.sex;
    total = myDemand.total;
    state = 'submitted';

    const db = wx.cloud.database();
    const demand = db.collection('demand');
    

    console.log(demandID)
    //将填写的需求表的内容上传到云数据库
    demand.add({
      data: {
        userID: user._id,
        username: user.name,
        demandID: demandID,
        ader_name: ader_name,
        age: age,
        amount: amount,
        city: city ,
        date: date,
        unit: unit,
        notes: notes,
        platform: platform,
        position: position ,
        product: product,
        sex: sex,
        total: total,
        state: state,
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
    wx.removeStorageSync('myDemand')
    wx.reLaunch({
      url: '../demand/demand'
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