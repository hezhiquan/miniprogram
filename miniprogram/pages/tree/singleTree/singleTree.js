// miniprogram/pages/tree/singleTree/singleTree.js
let app = getApp();
let animTreeSwing; //树苗摆动的动画变量
let  clearTimeOut=0;//控制对话框，若是在对话框未开始之前多次点击，则消失时间设为最后一次点击时间
const db=wx.cloud.database();
let isClick=false;//是否已经点击，多次点击时只展现第一个

Page({

  data: {
    nickName:"",
    avatarUrl:"",
    //下面五个个属性针对侧边栏
    open: false,
    // mark 是指原点x轴坐标
    mark: 0,
    // nweMark 是指移动的最新点的x轴坐标 
    nweMark: 0,
    istoright: false,
    sidebars:
    [
    {text:"成就列表",url:"./showDoneGoals/showDoneGoals",src:"https://s1.ax1x.com/2020/04/16/JizRnU.png"},
    {text:"设定小目标",url:"./addGoal/addGoal",src:"https://s1.ax1x.com/2020/04/16/JizBkj.png"},
    {text:"待完成的小目标",url:"./showGoals/showGoals",src:"https://s1.ax1x.com/2020/04/16/Jiz610.png"}
    ],//侧边栏列表项的内容

    //下面五个属性针对小树苗
    animTreeSwingData: {}, //设定树苗动画所需的动画对象
    talk: "听说种树，与学习更配哦",
    talkList: ["爱种树的人，运气都不会太差", "今天，你种树了么", "你好啊", "听说种树,与学习更配哦"],
    dialogue1: "", //给对话框添加的动态属性，一开始为无，之后添加dialogue类的css，使对话框能够显示
    treeUrl: ["../../../images/tree/tree_1.png","https://s1.ax1x.com/2020/04/18/JnMP8e.md.png","https://s1.ax1x.com/2020/04/18/JnEjFH.md.png",
    "https://s1.ax1x.com/2020/04/18/JnVnlq.md.png"],
   
    //完成的成就数若少于10个则展示小树苗，否则展示大树
    
    appleSrc:["https://s1.ax1x.com/2020/04/18/JnEtL8.md.png"],
    dropApple:[false,false,false,false,false,false,false,false,false,false],
    drop:['drop0','drop1','drop2','drop3','drop4','drop5','drop6','drop7','drop8','drop9'],
    top10:[],
    isDisplay:'',
    myGoal:"",
    bgUrl:"",
    finishedTime:'',//完成时间
    createdTime:"",//创建时间
    expectedTime:"",//预计完成时间
    isLogin:false,//是否登录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    console.log("获取的app信息为",app)
    this.setData({
      avatarUrl:app.userInfo.avatarUrl,
      nickName:app.userInfo.nickName
    })
    console.log("name is",this.data.nickName)
    console.log(!this.data.nickName)
    this.getGoals();

  },
  // 初始时，获取最新完成的成就列表
  getGoals:function(){
    let that=this;
    db.collection("goals").where({
      _openid:'openid',
      isAchieve:true
    })
    .orderBy("createdDate","desc")
    .limit(10).get({
    success:function(res){
      
      console.log("查询成功",res)
      that.setData({
        top10:res.data
      })
      
    },
    fail:function(err){
      console.log("查询失败",err);
    }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 点击左上角小图标事件
  tap_ch: function (e) {
    console.log("点击小图标");
    
    this.setData({
      open:true
    })
    
  },

  tap_start: function (e) {
    // touchstart事件
    // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 nweMark
    this.data.mark = this.data.nweMark = e.touches[0].pageX;
  },

  tap_drag: function (e) {
    // touchmove事件
    this.data.nweMark = e.touches[0].pageX;

    // 手指从左向右移动
    console.log("111",this.data.istoright)
    if (this.data.mark < this.data.nweMark) {
      this.data.istoright = true;
    }

    // 手指从右向左移动
    if (this.data.mark > this.data.nweMark) {
      this.data.istoright = false;
    }
    this.data.mark = this.data.nweMark;
  },

  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.nweMark = 0;
    // 通过改变 opne 的值，让主页加上滑动的样式
    this.setData({
      open:this.data.istoright
    })

  },
  touchTree: function () {
    if (animTreeSwing == null) {
      animTreeSwing = wx.createAnimation({
        duration: 200,
        timingFunction: "linear"
      })
    }

    animTreeSwing
      .rotate(10)
      .step();

    animTreeSwing
      .rotate(-10)
      .step();

    animTreeSwing
      .rotate(0)
      .step();

    //随机选择对话内容
    let index = Math.floor(Math.random() * this.data.talkList.length );
    // console.log(this.data)
    this.setData({
      animTreeSwingData: animTreeSwing.export(),
      dialogue1: "dialogue",
      talk: this.data.talkList[index]
    })

    //弹出对话框结束后，将dialogue设为空，下次点击时才能重新加入dialogue类
    const that = this;

    //该值不为零，说明对话框还存在，则应取消上一次点击时设置的取消对话框行为
    if(clearTimeOut!=0){
      clearTimeout(clearTimeOut);
    }

    setTimeout(function () {
      console.log("重置对话");
      that.setData({
        dialogue1: ""
      })
     
    }, 5000)

  },

  //苹果掉落动画
  drop:function(e){
    if(isClick==false){
      isClick=true;
      let that=this;
    console.log("event 是 ",e);
    //返回的id为apple1，apple2之类
    let index=parseInt(e.target.id.substring(5));
    console.log(index);
    let temp='dropApple['+index+']';
   //e.currentTarget.dataset['goal'],得到点击果子的成就
   let index2=e.currentTarget.dataset['index'];
   let time=that.data.top10[index2].finishedTime.getFullYear()+"-"+that.data.top10[index2].finishedTime.getMonth()+"-"+that.data.top10[index2].finishedTime.getDate();
   let time1=that.data.top10[index2].createdDate.getFullYear()+"-"+that.data.top10[index2].createdDate.getMonth()+"-"+that.data.top10[index2].createdDate.getDate();
   let time2=that.data.top10[index2].expectedTime;
  
  //  https://s1.ax1x.com/2020/04/19/Jur24O.md.png
   let url='https://i.loli.net/2020/05/10/el36kFItYfMwOmU.jpg';
    this.setData({
      [temp]:true,
      myGoal:this.data.top10[index].goal,
      bgUrl:url,
      finishedTime:time,
      createdTime:time1,
      expectedTime:time2
    })
    console.log("修改后，data ",this.data);
    setTimeout(function(){
      that.setData({
        [temp]:false
      })
      that.showview();
      isClick=false;//改为未点击状态
      
      console.log("2修改后，data ",that.data);
    },5000)
    }

  },
  showview: function() { 
    this.setData({
      display: "block"
    })
  },
  hideview: function() {
    this.setData({
      display: "none"
    })
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
            
             nickName : app.userInfo.nickName,
                         
           });
         });
      });
    }
 }
})