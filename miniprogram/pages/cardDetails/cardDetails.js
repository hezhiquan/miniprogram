// pages/cardDetails/cardDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:
      [{
        id:0,
        src:"https://i.loli.net/2020/05/27/HePmpltyNV4uqrk.jpg",
        word:'愿有岁月可回首\n且以深情共白头'
      },
      {
        id:1,
        src:"https://i.loli.net/2020/05/27/adI47KGzsXS9r3o.jpg",
        word:'最是人间留不住\n朱颜辞镜花辞树'
        
      },
      {
        id:2,
        src:"https://s1.ax1x.com/2020/04/28/J5jl7Q.png", 
        word:'我一人流浪 \n 岩浆滚烫，漫过胸膛\n 心中的不屈，向烈日生长'
      },
      {
        id:3,
        src:"https://s1.ax1x.com/2020/04/28/J5jGhn.png",
        word:'在告别后坚强\n受伤也决不投降\n背影会解释我所有的去向\n今后我与自己流浪'
      },
      {
        id:4,
        src:"https://s1.ax1x.com/2020/04/28/J5j8ts.png", 
        word:'记住该记住的\n忘记该忘记的\n能改变的改变\n不能改变的接受'
      },
      {
        id:5,
        src:"https://s1.ax1x.com/2020/04/28/J5xXkQ.png", 
        word:'身处沟渠之中\n 仰望星空之上'
      },
      {
        id:6,
        src:"https://s1.ax1x.com/2020/04/28/J5juX8.png", 
        word:'万物皆有裂痕\n那是光进来的地方'
      },
      {
        id:7,
        src:"https://s1.ax1x.com/2020/04/28/J5jQ0g.png", 
        word:'一个能够升起月亮的身体\n必然驮住了无数次日落'
      },
      {
        id:8,
        src:"https://s1.ax1x.com/2020/04/28/J5vzqO.jpg", 
        word:'你要做一个不动声色的大人了\n不准情绪化\n不准偷偷想念\n不准回头'
      },
      {
        id:9,
        src:"https://s1.ax1x.com/2020/04/28/J5vxsK.jpg", 
        word:'我希望自己也是一颗星星\n如果我会发光\n就不必害怕黑暗'
      },
      {
        id:10,
        src:"https://s1.ax1x.com/2020/04/28/J5vvM6.jpg", 
        word:'你一会儿看我\n一会儿看云\n我觉得你看我时很远\n看云时很近'
      },
      {
        id:11,
        src:"https://s1.ax1x.com/2020/05/06/YEJAY9.jpg", 
        word:"晓看天色暮看云\n行也思君\n坐也思君"
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