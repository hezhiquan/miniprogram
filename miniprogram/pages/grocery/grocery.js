// pages/grocery/grocery.js
const app=getApp();
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",//用户昵称，用来判断用户是否登录
    isTiptrue:true,
    msg:"",
    writerA:"",//annoy
    writerE:"",//enjoy
    xinxiang:{
      value:"书写烦恼",
      // url:"../../images/icons/xinxiang.png",
      // footer:"心绪有三千，倾诉我一言",
      shouurl:"shouxin/shouxin",
      url2:"writeAnnoy/writeAnnoy",

    },

    lists:[   
      {
        value:"解我忧",
        // footer:"心绪有三千，倾诉我一言",
        // src:"../../images/icons/xin.png",
        url:"postbox1/postbox1"
      },
      {
        value:"享其乐",
        // footer:"今日小确幸，想与你共享",
        // src:"../../images/icons/xin.png",
        url:"postbox2/postbox2"
      }
    ]
  },

/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("亲爱的心绪漂流者，这里是解忧杂货铺，点击左侧按钮可以写漂流信，右侧收件箱中可以浏览回信，解我忧漂流箱中可以查看其他人的苦恼，享其乐漂流箱中可以查看其他人分享的快乐，浏览的过程中您还可以给对方写回信");
    let firstOpen = wx.getStorageSync("loadOpen")
    console.log("是否首次打开本页面==",firstOpen)
    if (firstOpen == undefined || firstOpen == '') { //根据缓存周期决定是否显示新手引导
      this.setData({
        isTiptrue: true,
        msg:"亲爱的心绪漂流者，这里是解忧杂货铺，点击左侧按钮可以写漂流信，右侧收件箱中可以浏览回信，解我忧漂流箱中可以查看其他人的苦恼，享其乐漂流箱中可以查看其他人分享的快乐，浏览的过程中您还可以给对方写回信"
      })
    } else {
      this.setData({
        isTiptrue: false,
      })
    }
  },
  
  closeThis(e){
    wx.setStorage({
      key: 'loadOpen',
      data: 'OpenTwo'
    })
    this.setData({
      isTiptrue:false
    })
  },
  getUserInfo(event){
    //console.log(ev);
    let userInfo = event.detail.userInfo;
   
   
    if(userInfo){
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
             
             nickName : app.userInfo.nickName,
                    
           });
         });
      });
    }
      
    
 }
})