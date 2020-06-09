// pages/my/my.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    nickName:null,
    avatarUrl:null,
    lists:[     
      {
        value:"帮助与技巧",
        
        src:"https://s1.ax1x.com/2020/05/09/YMUlP1.png"
      },
      
     
      {
        value:"生辰树由来",
        footer:"",
        src:"https://s1.ax1x.com/2020/05/09/YMUUVH.png"

      },
      {
        value:"",//反馈意见
        footer:"",
        src:"https://s1.ax1x.com/2020/05/09/YMUFCq.png"
      }
      
      
    ],
    display:'',//设置是否展示遮罩层
    myIndex:0,//被点击的列表下标
  },

    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    

    this.setData({
      isLogin:(app.userInfo.nickName==null)?false:true,
      nickName:(app.userInfo.nickName==null)?null:app.userInfo.nickName,
      avatarUrl:(app.userInfo.avatarUrl==null)?null:app.userInfo.avatarUrl 
    });
      // console.log(app.userInfo)

  },

  getUserInfo(event){
     //console.log(ev);
     let userInfo = event.detail.userInfo;
     if( !this.data.isLogin && userInfo ){
       db.collection('users').add({
         data : {
           avatarUrl: userInfo.avatarUrl,
           nickName: userInfo.nickName,
           signature : '', //寄语          
           friendList : [],
           gray:[],
           times:25
         }
       }).then((res)=>{
          db.collection('users').doc(res._id).get().then((res)=>{
            //console.log(res.data);
            app.userInfo = Object.assign( app.userInfo , res.data );
            this.setData({
              avatarUrl : app.userInfo.avatarUrl,
              nickName : app.userInfo.nickName,
              isLogin : true              
            });
          });
       });
     }
  },
  bindOther:function(e){
    this.setData({
      myIndex:e.currentTarget.dataset["index"]
    })
    if(this.data.myIndex==2){
      // wx.showToast({
      //   icon:"none",
      //   title: '反馈意见的url还没写',
      // })
      //填写完url后把toast删掉
      // wx.navigateTo({
      //   url: 'url',//跳转到反馈意见界面
      // })
    }else{
      this.showview();
    }

  },
  showview: function() { //展示遮罩层
    this.setData({
      display: "block"
    })
  },
  hideview: function() {
    //关闭遮罩层，display：none的意思是隐藏该元素，其他的display：block or inline都默认设置为元素可见
    this.setData({
      display: "none"
    })
  }
})
