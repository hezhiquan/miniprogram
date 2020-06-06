// pages/purchase/purchase.js
const db=wx.cloud.database();
const app=getApp();
Page({
  data: {
      Balance:0,
      list:
      [{
        id:0,
        src:"https://s1.ax1x.com/2020/06/05/tsyVN8.jpg",
        gray:0.8,
        price:15
      },
      {
        id:1,
        src:"https://i.loli.net/2020/05/27/adI47KGzsXS9r3o.jpg",
        gray:0.8,
        price:20  
        
      },
      {
        id:2,
        src:"https://s1.ax1x.com/2020/04/28/J5jl7Q.png", 
        gray:0.8,
        price:5
      },
      {
        id:3,
        src:"https://s1.ax1x.com/2020/04/28/J5jGhn.png",
        gray:0.8,
        price:4 
      },
      {
        id:4,
        src:"https://s1.ax1x.com/2020/04/28/J5j8ts.png", 
        gray:0.8,
        price:10
      },
      {
        id:5,
        src:"https://s1.ax1x.com/2020/04/28/J5xXkQ.png", 
        gray:0.8,
        price:13
      },
      {
        id:6,
        src:"https://s1.ax1x.com/2020/04/28/J5juX8.png", 
        gray:0.8,
        price:4
      },
      {
        id:7,
        src:"https://s1.ax1x.com/2020/04/28/J5jQ0g.png", 
        gray:0.8,
        price:10
      },
      {
        id:8,
        src:"https://s1.ax1x.com/2020/04/28/J5vzqO.jpg", 
        gray:0.8,
        price:12
      },
      {
        id:9,
        src:"https://s1.ax1x.com/2020/04/28/J5vxsK.jpg", 
        gray:0.8,
        price:18
      },
      {
        id:10,
        src:"https://s1.ax1x.com/2020/04/28/J5vvM6.jpg", 
        gray:0.8,
        price:17
      },
      {
        id:11,
        src:"https://s1.ax1x.com/2020/05/06/YEJAY9.jpg", 
        gray:0.8,
        price:17
      }
      ],
      info:""//购买失败的通知
  },

  /**
   * 生命周期函数--监听页面加载
   */
  purChase(e)
  { 
    const that=this
    var up="list["+e.currentTarget.dataset.id+"].gray"
    //console.log(that.data.list[e.currentTarget.dataset.id].gray)
    let index=e.currentTarget.dataset.id
    if(that.data.list[e.currentTarget.dataset.id].gray>0)
    wx.showModal({
       title:'兑换卡片',
       content:'确定要购买这张图片吗？',
       success (res) {
        if (res.confirm) {   
        const banner=db.collection("users")
        banner.doc(app.userInfo._id).get()
        .then(res=>{
                   if(res.data.times<that.data.list[e.currentTarget.dataset.id].price)
                   {
                    //  wx.showModal({
                    //    title:'余额不足',
                    //    content:'通过完成任务获取'
                    //  })
                    that.setData({
                      info:"哎呀，当前余额不足，快去做点小任务吧(๑¯∀¯๑)"
                    })
                   }
                 else
                 {
                  var bb=res.data.gray
                  bb.push(e.currentTarget.dataset.id)
                  banner.doc(app.userInfo._id).update({
                        data:{
                           times:parseInt(res.data.times)-that.data.list[e.currentTarget.dataset.id].price,
                           gray:bb                     
                         }
                    })
                    .then(res=>{
                      banner.doc(app.userInfo._id).get()
                      .then(res=>{
                        that.setData({  
                          [up]:0,
                          Balance:res.data.times
                          })
                        console.log(res) 
                        wx.navigateTo({
                          url: '../../cardDetails/cardDetails?index='+index,
                        }) 
                      })
                        console.log(res) 
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    console.log(res)
                    /*that.setData({
                        [up]:0,
                        Balance:res.data.times
                        })*/ 
                   }
                })
                .catch(err=>{
                  
                    console.log(err)

                })         
        } else if (res.cancel) {
        console.log('用户点击取消')
          }
        }  
     })
     else
     wx.navigateTo({
      url: '../../cardDetails/cardDetails?index='+index,
     })
  },

  onLoad: function (options) {
    const banner=db.collection("users")
    if(app.userInfo._id){
      banner.doc(app.userInfo._id).get()
      .then(res=>{
        this.setData({
          Balance:res.data.times,
        })
        var i,len;
        for(i=0,len=res.data.gray.length;i<len;i++)
        {
          var up="list["+res.data.gray[i]+"].gray"
          this.setData({
            [up]:0
          })
        }
      })
    }else{
      wx.showModal({
        content:"请至个人信息界面登录",
        showCancel:false
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // if(!app.userInfo._id){
    //   app=getApp()
    // }
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