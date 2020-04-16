// miniprogram/pages/tree/singleTree/singleTree.js
let app = getApp();
let animTreeSwing; //树苗摆动的动画变量
let  clearTimeOut=0;//控制对话框，若是在对话框未开始之前多次点击，则消失时间设为最后一次点击时间



Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:"",
    //下面五个个属性针对侧边栏
    open: false,
    // mark 是指原点x轴坐标
    mark: 0,
    // nweMark 是指移动的最新点的x轴坐标 
    nweMark: 0,
    istoright: true,
    sidebars:
    [
    {text:"成就列表",url:"./showDoneGoals/showDoneGoals",src:"https://s1.ax1x.com/2020/04/16/JizRnU.png"},
    {text:"设定小目标",url:"./addGoal/addGoal",src:"https://s1.ax1x.com/2020/04/16/JizBkj.png"},
    {text:"待完成的小目标",url:"./showGoals/showGoals",src:"https://s1.ax1x.com/2020/04/16/Jiz610.png"}
    ],//侧边栏列表项的内容

    //下面六个属性针对小树苗
    animTreeSwingData: {}, //设定树苗动画所需的动画对象
    talk: "种树，与学习更配哦",
    talkList: ["爱种树的人，运气都不会太差", "今天，你种树了么", "你好啊", "种树,与学习更配哦"],
    dialogue1: "", //给对话框添加的动态属性，一开始为无，之后添加dialogue类的css，使对话框能够显示
    treeUrl: "../../../images/tree/tree_1.png",
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("获取的app信息为",app)
    this.setData({
      avatarUrl:app.userInfo.avatarUrl,
      nickName:app.userInfo.nickName
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
      open:!this.data.open
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
      clearTimeOut(clearTimeOut);
    }

    clearTimeOut=setTimeout(function () {
      console.log("重置对话");
      that.setData({
        dialogue1: ""
      })
      clearTimeOut=0
    }, 5000)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


})