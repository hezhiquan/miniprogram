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
    nickName:"",//用户昵称，用来判断用户是否登录
    bgSrcList:[
      {
        bgColor:"#E5A454",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4MUX9.png"
      },
      {
        bgColor:"#35A8BA",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4MGfU.jpg"
      },
      {
        bgColor:"#AECF78",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y47OfJ.jpg"
      },
      {
        bgColor:"#3196FF",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4MN6J.png"
      },
      {
        bgColor:"#E86A41",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4MYpF.png"
      },
      {
        bgColor:"#E58E09",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4MdmR.jpg"
      },
      {
        bgColor:"#EBDB3E",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4hYdJ.jpg"
      },
      {
        bgColor:"#E77F86",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4hto9.jpg"
      },
      {
        bgColor:"#B3A5C9",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4hJZ4.png"
      },
      {
        bgColor:"#E86A41",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4h3sU.jpg"
      },
      {
        bgColor:"#7969EE",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4h8LF.jpg"
      },
      {
        bgColor:"#027F7B",
        bgSrc:"https://s1.ax1x.com/2020/05/19/Y4hUiR.png"
      }
    ],//每个树屋的背景图片
    //更多动画
    isShow: false,
    animationCreatHouse: {},
    animationHelp: {},
    animationAllMyHouse: {},
    animationSearch: {},
    animationModal: {},
  },
  onLoad: function (options) {
    this.setData({
      nickName:app.userInfo.nickName
    })
    this.getData();
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
      .orderBy("date", "desc")//date主要用来降序排列
      .skip(that.data.currentPage * that.data.pageSize) //从第几个数据开始
      .limit(that.data.pageSize)
      
      .get({
        success(res) {
            console.log("请求成功", res.data)
            //把新请求到的数据添加到dataList里 
            let data=res.data;
            for(let i=0;i<data.length;i++){
              // console.log("introduction is",data[i].introduction)
              if(data[i].introduction.length>10){
                data[i].introduction=data[i].introduction.substring(0,10)+"...";
              }
            }
            let list = that.data.dataList.concat(data)
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
  getUserInfo(event){
    //console.log(ev);
    let userInfo = event.detail.userInfo;
    if(  userInfo ){
      db.collection('users').add({
        data : {
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          signature : '', //寄语          
          friendList : [],
          gray:[],
          times:0
        }
      }).then((res)=>{
         db.collection('users').doc(res._id).get().then((res)=>{
           //console.log(res.data);
           app.userInfo = Object.assign( app.userInfo , res.data );
           this.setData({
            
             nickName : app.userInfo.nickName
                      
           });
         });
      });
    }
 },
 //加号旋转动画
 contorlAnimate(){
  if(this.data.isShow){
    this.closeAnimate()
  }else{
    this.showAnimate()
  }
},
closeAnimate() {
  var animationModal = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-in'
  })
  animationModal.opacity(0).scale(0.0, 0.0).step()

  var animationCreatHouse = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-in'
  })
  animationCreatHouse.opacity(0).scale(0.0, 0.0).translateX(0).step()

  var animationHelp = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-in'
  })
  animationHelp.opacity(0).scale(0.0, 0.0).translateX(0).step()

  var animationAllMyHouse = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-in'
  })
  animationAllMyHouse.opacity(0).scale(0.0, 0.0).translateX(0).step()

  var animationSearch = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-in'
  })
  animationSearch.opacity(0).scale(0.0, 0.0).translateX(0).step()
  this.data.isShow = false
  this.setData({
    animationCreatHouse: animationCreatHouse.export(),
    animationHelp: animationHelp.export(),
    animationAllMyHouse: animationAllMyHouse.export(),
    animationSearch: animationSearch.export(),
    animationModal: animationModal.export()
  })
},
showAnimate() {
  var animationModal = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-out'
  })
  animationModal.opacity(0.0).scale(300, 300).step()
  var animationCreatHouse = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-out'
  })
  animationCreatHouse.opacity(1).scale(1, 1).translateX(-90).step()
  var animationHelp = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-out'
  })
  animationHelp.opacity(1).scale(1, 1).translateX(-75).translateY(-42).step()

  var animationAllMyHouse = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-out'
  })
  animationAllMyHouse.opacity(1).scale(1, 1).translateX(-43).translateY(-73).step()

  var animationSearch = wx.createAnimation({
    duration: 200,
    timingFunction: 'ease-out'
  })
  animationSearch.opacity(1).scale(1, 1).translateX(0).translateY(-90).step()
  this.data.isShow = true
  this.setData({
    animationCreatHouse: animationCreatHouse.export(),
    animationHelp: animationHelp.export(),
    animationAllMyHouse: animationAllMyHouse.export(),
    animationSearch: animationSearch.export(),
    animationModal: animationModal.export()
  })
},

  help(){//树屋玩法说明
      wx.showToast({
    icon: "none",
    title: '此处放置玩法说明',
  })
  },
  search(){//跳转到搜索界面
    wx.navigateTo({
      url: './searchHouse/searchHouse'
    })
  },
  allMyHouse(){//跳转到我加入的树屋
    wx.navigateTo({
      url: './allMyHouse/allMyHouse',
    })
  },
  creatHouse(){//跳转到创建树屋
    wx.navigateTo({
      url: './addHouse/addHouse',
    })
  }

})