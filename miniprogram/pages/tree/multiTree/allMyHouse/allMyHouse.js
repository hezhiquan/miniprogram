// miniprogram/pages/tree/multiTree/allMyHouse/allMyHouse.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    bgSrcList: [{
        bgColor: "#E5A454",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4MUX9.png"
      },
      {
        bgColor: "#35A8BA",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4MGfU.jpg"
      },
      {
        bgColor: "#AECF78",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y47OfJ.jpg"
      },
      {
        bgColor: "#3196FF",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4MN6J.png"
      },
      {
        bgColor: "#E86A41",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4MYpF.png"
      },
      {
        bgColor: "#E58E09",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4MdmR.jpg"
      },
      {
        bgColor: "#EBDB3E",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4hYdJ.jpg"
      },
      {
        bgColor: "#E77F86",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4hto9.jpg"
      },
      {
        bgColor: "#B3A5C9",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4hJZ4.png"
      },
      {
        bgColor: "#E86A41",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4h3sU.jpg"
      },
      {
        bgColor: "#7969EE",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4h8LF.jpg"
      },
      {
        bgColor: "#027F7B",
        bgSrc: "https://s1.ax1x.com/2020/05/19/Y4hUiR.png"
      }
    ] //每个树屋的背景图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllHouse();
  },

  enterHouse: function (e) {
    let id = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../myHouse/myHouse?id=' + id
    })
  },
  getAllHouse: function () {
    let that = this;
    db.collection("treeHouse").where({
        openidList: app.userInfo._openid
      })
      .orderBy("createdDate", "desc")
      .get({
        success: function (res) {

          console.log("已获得参加的所有树屋", res)
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            // console.log("introduction is",data[i].introduction)
            if (data[i].introduction.length > 10) {
              data[i].introduction = data[i].introduction.substring(0, 10) + "...";
            }
          }
          that.setData({
            dataList: data
          })


        },
        fail: function (err) {
          console.log("查询失败", err);
        }
      })
  }
})