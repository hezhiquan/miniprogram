// pages/postbox1/postbox1.js
const app = getApp();
const db=wx.cloud.database()
const search = db.command


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hui:{
      value:"写回信",
      url1:"huixin1/huixin1"
    },
    openid:"",
    mycontent:"",
    loadMore:true,
    loadAll:false,
    dataList:[],
    currentPage:0,
    pageSize:5,
    nickName:"",
    content:"",
    contents:[],//空数组用于存放获取的内容
    display:"none",
    swiperIndex: 0 ,//这里不写第一次启动展示的时候会有问题
    select:0,//选择遮罩层内容
    tip:"青山飞鸟拾信鸽……",
  },


  bindChange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
    console.log("dsada");
  },
    
  test: function (e) {
    //云数据的请求
    console.log("分页")
    let that=this;
    db.collection("Back").where({
      Hisopenid:app.userInfo._openid
      // _openid:app.userInfo._openid
    })
    .orderBy("date", "desc")
    .skip(that.data.currentPage * that.data.pageSize) //从第几个数据开始
    .limit(that.data.pageSize)
    .get({
      success(res) {
          console.log("请求成功", res.data)
          console.log("请求成功002", res.data.length)
 
        if (res.data.length<=0) {
            console.log("数量不够")
            wx.showToast({
              title: '还没有回信的朋友哦',
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

          that.setData({
            dataList:res.data
          })
        
          
          that.data.currentPage++;
        
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

 firstbind: function (e) {
  this.showView();
  
  this.setData({
    mycontent:e.currentTarget.dataset.hiscontent
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

 update:function (e) {
   this.test();
   
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.hideView();
    this.test();
    console.log(app.userInfo._openid);
    // setData({
    //   openid:app.userInfo._openid,
    // })
  },
  //获取用户openid
  userid:function (params) {
    console.log(app.userInfo._openid)
  },
 
})

