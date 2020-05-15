// pages/grocery/grocery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTiptrue:true,
    msg:"",
    writerA:"",//annoy
    writerE:"",//enjoy
    xinxiang:{
      value:"书写烦恼",
      // url:"../../images/icons/xinxiang.png",
      // footer:"心绪有三千，倾诉我一言",
      shouurl:"shouxin/shouxin",
      url2:"writeAnnoy/writeAnnoy",

    },

    lists:[   
      {
        value:"解我忧",
        // footer:"心绪有三千，倾诉我一言",
        // src:"../../images/icons/xin.png",
        url:"postbox1/postbox1"
      },
      {
        value:"享其乐",
        // footer:"今日小确幸，想与你共享",
        // src:"../../images/icons/xin.png",
        url:"postbox2/postbox2"
      }
    ]
  },

/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("亲爱的心绪漂流者，这里是解忧杂货铺，点击左侧按钮可以写漂流信，右侧收件箱中可以浏览回信，解我忧漂流箱中可以查看其他人的苦恼，享其乐漂流箱中可以查看其他人分享的快乐，浏览的过程中您还可以给对方写回信");
    let firstOpen = wx.getStorageSync("loadOpen")
    console.log("是否首次打开本页面==",firstOpen)
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      this.setData({
        isTiptrue: true,
        msg:"亲爱的心绪漂流者，这里是解忧杂货铺，点击左侧按钮可以写漂流信，右侧收件箱中可以浏览回信，解我忧漂流箱中可以查看其他人的苦恼，享其乐漂流箱中可以查看其他人分享的快乐，浏览的过程中您还可以给对方写回信"
      })
    } else {
      this.setData({
        isTiptrue: false,
      })
    }
  },
  
  closeThis(e){
    wx.setStorage({
      key: 'loadOpen',
      data: 'OpenTwo'
    })
    this.setData({
      isTiptrue:false
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