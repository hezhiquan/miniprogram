// miniprogram/pages/tree/singleTree/addGoal/addGoal.js
const db=wx.cloud.database();
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myGoal:"",
    expectedTime:"",
    isAchieve:false,
    type:"error",
    tips:"" //用户输入错误的提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  bindGoal:function(e){
    this.setData({
      myGoal:e.detail.value
    })
  },
  bindTime:function(e){
    this.setData({
      expectedTime:e.detail.value
    })
  },
  //提交小目标
  bindSubmit:function(){
    let that=this;
    if(this.data.myGoal!="" && this.data.expectedTime!=""){
      db.collection("goals").add({
        data:{
          goal:this.data.myGoal,
          expectedTime:this.data.expectedTime,
          isAchieve:this.data.isAchieve,
          finishedTime:"",
          createdDate:new Date()
        },
        success:function(res){
          console.log("提交成功",res)
          that.setData({
            type:"success",
            tips:"提交成功"
          })
          console.log("开始跳转")
          //一秒半后跳转回上一页
          setTimeout(function(){
            wx.navigateBack({
              delta:1
            })
          },1500) 
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

 



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})