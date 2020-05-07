// miniprogram/pages/tree/multiTree/myHouse/myHouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    bgSrc:"",
    createdDate:"",
    name:"",
    memberList:"",
    introduction:"",
    password:"",
    display:"none",
    swiperIndex: 0 ,//这里不写第一次启动展示的时候会有问题
    select:0,//选择遮罩层内容
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("页面传过来的树屋id为 " + options.id)
    this.setData({
      id: options.id
    })
    console.log(this.data.id)
    const db = wx.cloud.database()
    const banner = db.collection('treeHouse')
    var that=this
    banner.where({
      _id: this.data.id
    }).get()
      .then(res => {
        console.log(res)
        that.setData({
          bgSrc:res.data[0].bgSrc,
          createdDate:res.data[0].createdDate,
          name:res.data[0].name,
          memberList:res.data[0].memberList,
          introduction:res.data[0].introduction,
          password:res.data[0].password
        })
        console.log(that.data.introduction)
    })
      .catch(err => {
        console.log(err)
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

  },

firstbind:function () {
  this.showView();
},
  secondbind: function () {
    wx.navigateTo({
      url: '../myHouse/setgoal/setgoal?houseID=' + this.data.id,
    })
  },
  thirdbind: function () {
    wx.navigateTo({
      url: '../myHouse/looksore/looksore?houseID='+this.data.id,
    })
  }, 
  fourthbind: function () {
    wx.navigateTo({
      url: '留给值全的',
    })
  },
  //遮罩层部分
  // bindImage:function(){//展示内容
  //   this.showView();
  // },
  bindChange(e) {
    this.setData({
         swiperIndex: e.detail.current
    })
    },
  showView: function() { //展示遮罩层
    this.setData({
      display: "block"
    })
  },
  hideView: function() {
    //关闭遮罩层，display：none的意思是隐藏该元素，其他的display：block or inline都默认设置为元素可见
    this.setData({
      display: "none"
    })
  },

})