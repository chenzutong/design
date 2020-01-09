// pages/login/login.js





var username = null;//变量，用于存放用户输入的账号
var usernamebool = false;
var password = null;//变量，用于存放用户输入的密码
var passwordbool = false;
var admin = 123456;//管理员账号
var adminpw = 123456;//管理员密码

Page({

  /**
   * 页面的初始数据
   */
  data: {


  },
  usernameInput: function (event) {
    username = event.detail.value
    
  },

  passwordInput(event) {
    password = event.detail.value
    
    
  },
  login(){
    console.log("账号：" + username)
    console.log("密码：" + password)
    if(username == admin && password == adminpw){
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
      
      wx.navigateTo({
        url: "../admin/index/index",//这里是成功登录后跳转的页面
      })
    }else{
      // 获取云数据库引用
      const db = wx.cloud.database();
      const user = db.collection('user');//注意，这里就是刚才的集合的名字——user
      user.get({
        success:(res) =>{
          let user = res.data;
          for(let i=0;i<user.length;i++){
            if (username == user[i].username) {//用户名存在
              if (password == user[i].password) {//判断密码是否正确
                passwordbool = true
                wx.setStorageSync('user', user[i])
                wx.switchTab({
                  url: "../user/index/index",//这里是成功登录后跳转的首页面
                })
              }else{
                usernamebool = true
                wx.showToast({
                  title: '密码错误！！',
                  icon: 'none',
                  duration: 2500
              })  
            }
          }
          // if (usernamebool == false && passwordbool == false){
          //     wx.showToast({
          //       title: '无此用户名！！',
          //       icon: 'none',
          //       duration: 2500
          //     })
          //   }
          }
        }
      })
    }


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