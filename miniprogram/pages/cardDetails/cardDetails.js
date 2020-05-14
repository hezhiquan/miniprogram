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
        word:'在人山人海中孤自一人，孤独的人，有着恣意欢笑的自由'
      },
      {
        id:1,
        src:"https://s1.ax1x.com/2020/04/28/J5jl7Q.png", 
        word:'我一人漂浪，岩浆滚烫漫过胸膛。心底的芬芳，向烈日生长'
      },
      {
        id:2,
        src:"https://s1.ax1x.com/2020/04/28/J5jMnS.png",
        word:'一只船孤独地航行在海上，它不寻求幸福，也不逃避幸福，它只是向前航行，底下是沉静碧蓝的大海，头顶是金色的太阳'
      },
      {
        id:3,
        src:"https://s1.ax1x.com/2020/04/28/J5jGhn.png",
        word:'在告别后坚强，受伤也决不投降，背影会解释我所有的去向，今后我与自己流浪'
      },
      {
        id:4,
        src:"https://s1.ax1x.com/2020/04/28/J5j8ts.png", 
        word:'记住该记住的，忘记该忘记的。能改变的改变，不能改变的接受'
      },
      {
        id:5,
        src:"https://s1.ax1x.com/2020/04/28/J5xXkQ.png", 
        word:'吾辈身处沟渠之处，然其必有仰望星空者'
      },
      {
        id:6,
        src:"https://s1.ax1x.com/2020/04/28/J5juX8.png", 
        word:'万物皆有裂痕，那是光进来的地方'
      },
      {
        id:7,
        src:"https://s1.ax1x.com/2020/04/28/J5jQ0g.png", 
        word:'一个能够升起月亮的身体，必然驮住了无数次日落'
      },
      {
        id:8,
        src:"https://s1.ax1x.com/2020/04/28/J5vzqO.jpg", 
        word:'你要做一个不动声色的大人了。不准情绪化，不准偷偷想念，不准回头'
      },
      {
        id:9,
        src:"https://s1.ax1x.com/2020/04/28/J5vxsK.jpg", 
        word:'我希望自己也是一颗星星。如果我会发光，就不必害怕黑暗'
      },
      {
        id:10,
        src:"https://s1.ax1x.com/2020/04/28/J5vvM6.jpg", 
        word:'你一会儿看我，一会儿看云，我觉得你看我时很远，看云时很近'
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