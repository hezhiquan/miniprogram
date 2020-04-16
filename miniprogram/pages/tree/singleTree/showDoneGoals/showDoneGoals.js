// miniprogram/pages/tree/singleTree/showDoneGoals/showDoneGoals.js
const db=wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage:0,
    pageSize:10,//每一页的大小
    dataList: [], //放置返回数据的数组  
    loadMore: true, //"上拉加载"的变量，默认true，隐藏  
    loadAll: false //“没有数据”的变量，默认false，隐藏  

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();

  },
  onReachBottom:function(e){
    console.log("触底了")
    console.log(this.data.loadMore)
    let that = this
    console.log("that is ",that)
    console.log(that.data.loadMore)
    if (that.data.loadMore) {
      //加载更多
      that.getData();     
    }
  },
   //访问网络,请求数据  
   getData() {
    wx.showLoading({         //滚动到底部，弹出Loading。
      title: '拼命加载中..',
      duration: 2000
    })
    let that = this;

    //云数据的请求
    db.collection("goals")
    .where({
      _openid:'openid',
      isAchieve:true
    })
    .orderBy("createdDate","desc")
      .skip(that.data.currentPage * that.data.pageSize) //从第几个数据开始
      .limit(that.data.pageSize)
      .get({
        success(res) {
          if (res.data.length > 0) {
            console.log("请求成功", res.data)
            
            //把新请求到的数据添加到dataList里  
            let list = that.data.dataList.concat(res.data)
            that.setData({
              dataList: list, //获取数据数组    
              currentPage:that.data.currentPage+1
            });
            if (res.data.length < pageSize) {
              that.setData({
                loadMore: false, //隐藏加载中。。
                loadAll: true //所有数据都加载完了
              });
            }
          } else {
            that.setData({
              loadAll: true, //把“没有数据”设为true，显示  
              loadMore: false //把"上拉加载"的变量设为false，隐藏  
            });
          }
          //隐藏加载动画
          wx.hideLoading()
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
  

})