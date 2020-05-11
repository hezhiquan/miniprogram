// miniprogram/pages/time_capsule/writing/writing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaData: "",
    createTime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getTextareaData: function (event) {
    this.setData({
      textareaData: event.detail.value
    })
  },
  finished: function (event) {
    var that = this;
    console.log(that.data.textareaData);
    var mydate = new Date();
    var myyear = mydate.getFullYear();
    var myday = mydate.getDate();
    var mymonth = mydate.getMonth() + 1;
    var mycreateTime = myyear + '-' + mymonth + '-' + myday
    console.log(mycreateTime);
    that.setData({
      createTime: mycreateTime
    })
    console.log(that.data.createTime)
    wx.showModal({
      title: '完成编辑！',
      showCancel: false,
      confirmText: '去发送~',
      success: function (res) {
        wx.redirectTo({
          url: '../capsule?finished=' + "true" + '&textareaData=' + that.data.textareaData + '&createTime=' + that.data.createTime,
        })
      }
    })

  }
})