// miniprogram/pages/time_capsule/capsule.js
const app = getApp()
const db = wx.cloud.database()
const info = db.collection('capsules')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    backgroundSrc: "https://s1.ax1x.com/2020/04/23/JwH3a6.th.jpg",
    finishWriting: false,
    finishSendding: false,
    finishemail: false,
    finishSetTime: false,
    createTime: "",
    date:"",
    textRecorded: "",
    email: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ finishWriting: options.finished }),
      this.setData({ textRecorded: options.textareaData }),
      this.setData({ createTime: options.createTime }),
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
  getEmail: function (event) {
    //  this.setData({email:event.detail.value})
    let email = event.detail.value
    let checkedNum = this.checkEmail(email)
    console.log(this.data.email)
    if(checkedNum == true)
    {
      this.setData({email:event.detail.value})
      this.setData({ finishemail:true})
    }
  },
  checkEmail: function (email) {

    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    if (str.test(email)) {
      return true
    } else {
      wx.showToast({
        title: '邮箱格式错误！',
       image: '../../images/timeCapsule/错误.png'
      })
      return false
    }
  },

  bindDateChange: function (event)//设定好收到信的时间后
  {
    this.setData({
      date: event.detail.value,
      finishSendding: true,
      finishSetTime:true
    })
    console.log(this.data.finishWriting)
    console.log(this.data.date)
  },
  settingAndSend: function (event)//寄信按钮的事件响应函数
  {
    console.log(
      this.data.finishSetTime,
      this.data.finishemail,
      this.data.finishSetTime&&this.data.finishemail
    )
    if (this.data.finishSetTime&&this.data.finishemail) {
      info.add
        ({
          data:
          {
            name: app.userInfo.nickName,//用户名
            recordedText: this.data.textRecorded,//用户记录的文本
            recordedTime: this.data.date,//用户收到信的时间
            createTime: this.data.createTime,//用户写信的时间
            email: this.data.email,//用户的收信邮箱
            received: false
          }
        })
        .then(res => {
          wx.showModal
            (
              {
                showCancel: false,
                title: "您的信已寄出"
              }
            )
          this.setData
            (
              {
                finishSetTime: false,
                finishWriting: false,
                finishSendding: false,
                finishemail:false
              }
            )
        })
        .catch(err => {
          wx.showModal({
            title: '数据保存失败',
          })
          console.log('数据保存失败')
        })
    }
    else {
      wx.showModal({
        title: "请输入完整信息"
      })
    }
  }

})