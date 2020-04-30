// miniprogram/pages/tree/multiTree/allMyHouse/allMyHouse.js
const db=wx.cloud.database();
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllHouse();
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
  enterHouse: function (e) {
   let id = e.currentTarget.dataset['id'];   
      wx.navigateTo({
        url: '../myHouse/myHouse?id=' + id
      })
  },
  getAllHouse:function(){
    let that=this;
    db.collection("treeHouse").where({
      openidList:app.userInfo._openid
    })
    .orderBy("createdDate","desc")
    .get({
    success:function(res){
      
      console.log("已获得参加的所有树屋",res)
      that.setData({
        dataList:res.data
      })

      
    },
    fail:function(err){
      console.log("查询失败",err);
    }
    })
  }
})