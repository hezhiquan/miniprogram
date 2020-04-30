// miniprogram/pages/tree/multiTree/multiTree.js
const app = getApp();
const db = wx.cloud.database();
const _=db.command;
let id; //被点击的树屋id
let rightPassword; //被点击的树屋对应的密码
let index;//对应下标
Page({

  data: {
    currentPage: 0,
    pageSize: 10, //每一页的大小
    dataList: [], //放置返回数据的数组  
    loadMore: true, //"上拉加载"的变量，默认true，隐藏  
    loadAll: false, //“没有数据”的变量，默认false，隐藏 
    display: 'none', //设置是否展示遮罩层
    password: "", //树屋的密码
    tips: "", //提示信息
    type: "error", //提示类型

  },
  onLoad: function (options) {
    this.getData();

    //刚进入页面时，调用云函数尝试登录
    wx.cloud.callFunction({
        name: 'login',
        data: {}
      }).then((res) => {
        db.collection('users').where({
          _openid: res.result.openid
        }).get().then((res) => {
          if (res.data.length) {
            console.log("login函数调用结果为", res)
            app.userInfo = Object.assign(app.userInfo, res.data[0]);

          }
        });
      })
      .catch((err) => {
        console.log(err)
      })
  },
  onShow: function () {
    console.log("onShow begin")
    
   
  },
  onReachBottom: function (e) {
    console.log("触底了")
    let that = this
    console.log("that.data.loadmore is ",that.data.loadMore)
    if (that.data.loadMore) {
      //加载更多
      console.log("that.getData() begin")
      that.getData();
    }
  },
  //访问网络,请求数据  
  getData() {
    wx.showLoading({ //滚动到底部，弹出Loading
      title: '拼命加载中..',
      duration: 2000
    })
    let that = this;

    console.log("openid is",app.userInfo._openid)
    //云数据的请求
    db.collection("treeHouse")
      .orderBy("createdDate", "desc")
      .skip(that.data.currentPage * that.data.pageSize) //从第几个数据开始
      .limit(that.data.pageSize)
      
      .get({
        success(res) {
            console.log("请求成功", res.data)
            //把新请求到的数据添加到dataList里  
            let list = that.data.dataList.concat(res.data)
            that.setData({
              dataList: list, //获取数据数组    
              currentPage: that.data.currentPage + 1
            });
            if (res.data.length < that.data.pageSize) {
              console.log("001")
              that.setData({
                loadMore: false, //隐藏加载中。。
                loadAll: true //所有数据都加载完了
              });
            } else {
              console.log("002")
              that.setData({
                loadMore: true ,
                loadAll: false, 
                 
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
  enterHouse: function (e) {
    //如果是该树屋的成员，则进入树屋
    index=e.currentTarget.dataset['index'];
    id = e.currentTarget.dataset['id'];
    //this.data.dataList[index].openidList.indexOf(app.userInfo._openid)>-1
    if(this.data.dataList[index].openidList.indexOf(app.userInfo._openid)>-1){
      wx.navigateTo({
        url: './myHouse/myHouse?id=' + id
      })
    }else{
      rightPassword = e.currentTarget.dataset['password'];
      this.showView();
    }

    
  },
  showView: function () { //展示遮罩层
    this.setData({
      display: "block"
    })
  },
  hideView: function () {
    //关闭遮罩层，display：none的意思是隐藏该元素，其他的display：block or inline都默认设置为元素可见
    this.setData({
      display: "none"
    })
  },
  bindPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  bindSubmit: function () {
    let that=this;
    console.log("点击确认时，rightPsaaword is ", rightPassword);
    if (this.data.password == "") {
      this.setData({
        type: "error",
        tips: "请先输入密码"
      })
    } else if (this.data.password === rightPassword) {
      this.setData({
        type: "success",
        tips: "口令正确"
      })
      console.log("开始调用云函数")
      console.log("openid and nickName is", app.userInfo._openid, app.userInfo.nickName)
      wx.cloud.callFunction({
        name: 'addMember',
        data: {
          id: id,
          name: app.userInfo.nickName,
          openid: app.userInfo._openid
        },
        success: function (res) {
          console.log("已将该用户加入树屋", res)
          //加入树屋成功之后，除了在云端更新数据，也要在本地更新数据
          let openidList1=that.data.dataList[index].openidList;
          openidList1.push(app.userInfo._openid);
          let memberList1=that.data.dataList[index].memberList;
          memberList1.push(app.userInfo.nickName);
          console.log(" add ",memberList1,openidList1)
          let temp1="that.data.dataList["+index+"].openidList";
          let temp2="that.data.dataList["+index+"].memberList";
          that.setData({
            [temp1]:openidList1,
            [temp2]:memberList1,
          })
          that.hideView();
          wx.navigateTo({
            url: './myHouse/myHouse?id=' + id
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    } else {
      this.setData({
        type: "error",
        tips: "口令输入错误"
      })
    }
  },

})