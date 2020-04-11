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
        
        src:"../../images/icons/tree.png"
      },
      
     
      {
        value:"生辰树由来",
        footer:"",
        src:"../../images/icons/xin.png"

      },
      {
        value:"联系我们",
        footer:"",
        src:"../../images/icons/ziyuan.png"
      }
      
      
    ]
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
           friendList : []
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
  }
})
