// miniprogram/pages/time_capsule/capsule.js
const app=getApp()
const db=wx.cloud.database()
const info=db.collection('capsules')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    backgroundSrc:"https://s1.ax1x.com/2020/04/23/JwH3a6.th.jpg",
    finishWriting:false,
    finishSendding:false,
    createTime:"",
    date:undefined,
    textRecorded:"",
    email:""


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({finishWriting:options.finished}),
    this.setData({textRecorded:options.textareaData}),
    this.setData({createTime:options.createTime}),
    console.log(this.data.finishWriting),
    console.log(this.data.textRecorded);
    console.log(this.data.createTime)

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

  },
  getEmail:function(event)
  {
    this.setData({email:event.detail.value})
  },
  bindDateChange:function(event)//设定好收到信的时间后
  {
    this.setData({
      date: event.detail.value,
      finishWriting:false,
      finishSendding:true
    })
    console.log(this.data.finishWriting)
    console.log(this.data.date)
    wx.showModal({
      title:'点击寄信将信寄往未来~',
    })
  },
  settingAndSend:function(event)//寄信按钮的事件响应函数
  {
    if(this.data.finishSendding)
    {
      
      info.add
      ({
        data:
        {
        name:app.userInfo.nickName,//用户名
        recordedText:this.data.textRecorded,//用户记录的文本
        recordedTime:this.data.date,//用户收到信的时间
        createTime:this.data.createTime,//用户写信的时间
        email:this.data.email,//用户的收信邮箱
        received:false
        }
      })
      .then(res=>{
        wx.showModal
        (
          {
          showCancel:false,
          title:"您的信已寄出"
          }
        )
        this.setData
        (
          {
          finishSendding:false
          }
        )
      })
      .catch(err=>{
          wx.showModal({
            title: '数据保存失败',
          })
          console.log('数据保存失败')
        })
    }
     else{
      wx.showModal({
        title:"您还没写信噢"})
    }
  }
 
})