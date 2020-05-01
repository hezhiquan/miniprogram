// miniprogram/pages/tree/multiTree/searchHouse/searchHouse.js
const db = wx.cloud.database();
const app = getApp();
let id;
let rightPassword;
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
      name: e.detail.value
    })
    let that = this;
    db.collection("treeHouse").where({
        name: that.data.name
      })
      .get({
        success: function (res) {

          console.log("查询成功", res)
          that.setData({
            resultList: res.data
          })

        },
        fail: function (err) {
          console.log("查询失败", err);
        }
      })
  },
  enterHouse: function (e) {
    //如果是该树屋的成员，则进入树屋
    let index = e.currentTarget.dataset['index'];
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