// pages/grocery/postbox1/huixin1/huixin1.js
const app = getApp();
const db=wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hisopenid:"",
    content:"",
    NickName:"",
    display:"none",
    swiperIndex: 0 ,//这里不写第一次启动展示的时候会有问题
    select:0,//选择遮罩层内容
    hidetextarea:"",
  },

  submit:function(){
    var that=this;
    console.log("传值")
    if(this.data.mycontent!=""){
      db.collection("Back").add({
        data:{
          Hisopenid:that.data.hisopenid,
          content:that.data.mycontent,
          NickName:that.data.Nickname,
          date:new Date(),
        },
        success:function(res){
          console.log("上传成功")
          wx.showToast({  
            title: '上传成功',  
            icon: 'success',  
            mask: true,  
            duration: 2000 
          }) 
          console.log("开始跳转")
          //两秒后跳转回上一页
          setTimeout(function(){
            wx.navigateBack({
              delta:1
            })
          },2000) 
        },
        fail:function(err){
          console.log("提交失败",err)
        }
        
      })
    }else {
      console.log("输入不符合条件")
      this.setData({
      
        tips:"输入不能为空"
      })
    }

  },

  content:function (e) {
    this.setData({
      mycontent:e.detail.value
    })
  },
  textInput:function (e) {
    this.setData({
      Nickname:e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      hisopenid:options.openid
    })
    console.log(this.data.hisopenid)
  },

  firstbind:function () {
    this.showView();
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
        display: "block",
        hidetextarea:"none"
      })
    },
    hideView: function() {
      //关闭遮罩层，display：none的意思是隐藏该元素，其他的display：block or inline都默认设置为元素可见
      // inline预览貌似没用
      this.setData({
        display: "none",
        hidetextarea:"block"
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