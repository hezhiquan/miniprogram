// pages/cardDetails/cardDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:
      [{
        id:0,
        src:"https://s1.ax1x.com/2020/04/28/J5XIS0.png",
        word:'何值全牛逼'
      },
      {
        id:1,
        src:"https://s1.ax1x.com/2020/04/28/J5jl7Q.png", 
        word:'何值全666'
      },
      {
        id:2,
        src:"https://s1.ax1x.com/2020/04/28/J5jMnS.png",
        word:'全神666'
      },
      {
        id:3,
        src:"https://s1.ax1x.com/2020/04/28/J5jGhn.png",
        word:'为值全扣6'
      },
      {
        id:4,
        src:"https://s1.ax1x.com/2020/04/28/J5j8ts.png", 
        word:'为值全按下F键'
      },
      {
        id:5,
        src:"https://s1.ax1x.com/2020/04/28/J5xXkQ.png", 
        word:'为值全按下F键'
      },
      {
        id:6,
        src:"https://s1.ax1x.com/2020/04/28/J5juX8.png", 
        word:'为值全按下F键'
      },
      {
        id:7,
        src:"https://s1.ax1x.com/2020/04/28/J5jQ0g.png", 
        word:'为值全按下F键'
      },
      {
        id:8,
        src:"https://s1.ax1x.com/2020/04/28/J5vzqO.jpg", 
        word:'何值全牛逼'
      },
      {
        id:9,
        src:"https://s1.ax1x.com/2020/04/28/J5vxsK.jpg", 
        word:'何值全牛逼'
      },
      {
        id:10,
        src:"https://s1.ax1x.com/2020/04/28/J5vvM6.jpg", 
        word:'何值全666'
      }
      ],
      Selected:0, 
      SelectedPath:'',
      Selectedword:'' 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       console.log(options.index)
       this.setData({
        Selected:options.index
       })
       console.log(this.data.Selected)
       var list=this.data.list
       var i
       for(i=0;i<list.length;i++)
       {
         if(list[i].id==options.index)
         this.setData({
           SelectedPath:list[i].src,
           Selectedword:list[i].word
         })
       }
       console.log(this.data.Selectedword)
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