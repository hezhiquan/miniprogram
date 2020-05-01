// pages/grocery/postbox1/huixin1/huixin1.js
const app = getApp();
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hisopenid:"",
    content:"",
    NickName:"",
  },

  formSubmit:function(){
    var that=this;
    console.log("传值")
    if(this.data.mycontent!=""){
      db.collection("Back").add({
        data:{
          Hisopenid:that.data.hisopenid,
          content:that.data.mycontent,
          NickName:that.data.Nickname,
          date:new Date(),
        },
        success:function(res){
          console.log("上传成功")
          wx.showToast({  
            title: '上传成功',  
            icon: 'success',  
            mask: true,  
            duration: 2000 
          }) 
          console.log("开始跳转")
          //两秒后跳转回上一页
          setTimeout(function(){
            wx.navigateBack({
              delta:1
            })
          },2000) 
        },
        fail:function(err){
          console.log("提交失败",err)
        }
        
      })
    }else {
      console.log("输入不符合条件")
      this.setData({
      
        tips:"输入不能为空"
      })
    }

  },

  content:function (e) {
    this.setData({
      mycontent:e.detail.value
    })
  },
  textInput:function (e) {
    this.setData({
      Nickname:e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      hisopenid:options.openid
    })
    console.log(this.data.hisopenid)
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