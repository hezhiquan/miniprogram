// miniprogram/pages/tree/multiTree/searchHouse/searchHouse.js
const db = wx.cloud.database();
const app = getApp();
let id;
let rightPassword;
let index;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "", //被搜索的树屋名字
    resultList: [], //所有结果数组
    display: '', //设置是否展示遮罩层
    password: "", //树屋的密码
    tips: "", //提示信息
    type: "error", //提示类型
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
    msg:false,//用户查询结果提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },
  search: function (value) {
    // ????此函数一直未触发
    console.log("value is", value);
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
    //     }, 200)
    // })
  },
  startSearch: function (e) {
    console.log(e);
    this.setData({
      name: e.detail.value,
      msg:false
    })
    if(this.data.name){//树屋名不为空才开始查询
      let that = this;
      db.collection("treeHouse").where({
          name: db.RegExp({
            regexp: that.data.name,
            options: 'i',
          })
        })
        .get({
          success: function (res) {
  
            console.log("查询成功", res)
            let data=res.data;
              for(let i=0;i<data.length;i++){
                // console.log("introduction is",data[i].introduction)
                if(data[i].introduction.length>10){
                  data[i].introduction=data[i].introduction.substring(0,10)+"...";
                }
              }
            that.setData({
              resultList: data,
            })
            if(data.length==0){
              that.setData({
                msg:true
              })
            }
  
          },
          fail: function (err) {
            console.log("查询失败", err);
          }
        })
    }
    
  },
  enterHouse: function (e) {
    //如果是该树屋的成员，则进入树屋
     index = e.currentTarget.dataset['index'];
    id = e.currentTarget.dataset['id'];

    if (this.data.resultList[index].openidList.indexOf(app.userInfo._openid) > -1) {
      wx.navigateTo({
        url: '../myHouse/myHouse?id=' + id
      })
    } else {
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
    //关闭遮罩层
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
    let that = this;
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
          console.log("已将该用户加入树屋", res)
          //加入树屋成功之后，除了在云端更新数据，也要在本地更新数据
          let openidList1=that.data.resultList[index].openidList;
          openidList1.push(app.userInfo._openid);
          let memberList1=that.data.resultList[index].memberList;
          memberList1.push(app.userInfo.nickName);
          console.log(" add ",memberList1,openidList1)
          let temp1="that.data.resultList["+index+"].openidList";
          let temp2="that.data.resultList["+index+"].memberList";
          that.setData({
            [temp1]:openidList1,
            [temp2]:memberList1,
          })
          that.hideView();
          wx.navigateTo({
            url: '../myHouse/myHouse?id=' + id
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