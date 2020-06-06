// pages/postbox1/postbox1.js
const app2 = getApp();
const db2=wx.cloud.database()
const search2 = db2.command


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hui:{
      value:"写回信",
      url1:"../postbox1/huixin1/huixin1"
    },
    openid:"",
    loadMore:true,
    loadAll:false,
    dataList:[],
    currentPage:0,
    pageSize:5,
    nickName:"",
    content:"",
    contents:[],//空数组用于存放获取的内容
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
    tip:"青山飞鸟拾信鸽……",
  },


  bindChange(e) {
   
    this.setData({
         swiperIndex: e.detail.current,
        
    })
    },
    hideView(e){
      console.log("change")
      const db2 = wx.cloud.database()
      db2.collection('Happy').field({
      content: true,
      NickName:true,
      _openid:true,
      date:true,
      // _openid:true,
      })
      .get()
      .then((res)=>{
        this.setData({
          contents:res.data
        })
        console.log("res.data")
        console.log(res.data);
      }
      )
      .catch(console.error)
    },
    
  test: function (e) {
    //云数据的请求
    console.log("分页")
    var that=this
    db2.collection("Happy").where({
      _openid:search2.neq(app2.userInfo._openid)
      // _openid:app.userInfo._openid
    })
    .orderBy("date", "desc")
    .skip(that.data.currentPage * that.data.pageSize) //从第几个数据开始
    .limit(that.data.pageSize)
    .get({
      success(res) {
          console.log("请求成功", res.data)

          //把新请求到的数据添加到dataList里 ,concat是将数组一个一个加进去，而push则是直接加入
          // let list = that.data.dataList.concat(res.data)
          that.setData({
            dataList: res.data, //获取数据数组    
            
          });
          that.data.currentPage++;
          if (res.data.length <=0) {
            console.log("数量不够")
            wx.showToast({
              title: '信囊已经空了哦',
              icon:"none"
            })
            this.setData({
              tip:'数据已全部加载'
            })
            that.setData({
              loadMore: false, //隐藏加载中。。
              loadAll: true //所有数据都加载完了
            });
          } else {
            console.log("加载")
            that.setData({
              loadMore: true ,
              loadAll: false, 
               
            });
          }
          //隐藏加载动画
          // wx.hideLoading()

        
      },
      fail(res) {
        console.log("请求失败", res)
        that.setData({
          loadAll: false,
          loadMore: true
        });
      }
    })
   
 },

 update:function (params) {
   this.test();
   
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.hideView();
    this.test();
    console.log(app2.userInfo._openid);
    // setData({
    //   openid:app.userInfo._openid,
    // })
  },
  bindchange(e) {
    this.setData({
         swiperIndex: e.detail.current
    })
    },
  //获取用户openid
  userid:function (params) {
    console.log(app.userInfo._openid)
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

