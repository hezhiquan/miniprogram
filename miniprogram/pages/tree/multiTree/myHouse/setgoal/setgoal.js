//这个页面的主要内容是用户往输入框输入内容，判断用户输入的是否为空，不为空则存入数据库，为空则给用户提示

const db = wx.cloud.database();
const app = getApp();
Page({

  data: {
    myGoal: '',
    expectedTime: '',
    isAchieve: false,
    treeHouseID: "",
    type:"error",
    myCheck:'',
    otherCheck:'',
    tips:"" //用户输入错误的提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '设定目标'
    })
    this.setData({
      treeHouseID: options.houseID
    })
    console.log('传入的树屋ID为' + this.data.treeHouseID)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  bindGoal: function (e) {
    this.setData({
      myGoal: e.detail.value
    })
  },
  bindTime: function (e) {
    this.setData({
      expectedTime: e.detail.value
    })
  },
  bindSubmit: function () {
    let that = this;
    if (this.data.myGoal != "" && this.data.expectedTime != "") {
      db.collection("treeHouseGoal").add({
        data: {
          treeHouseID: this.data.treeHouseID,
          goal: this.data.myGoal,
          expectedTime: this.data.expectedTime,
          isAchieve: this.data.isAchieve,
          myCheck:false,
          otherCheck:0,
          Checkother:false,
          finishedTime:"",
          checkOtherList:[],
          createdDate: new Date()
        },
        success: function (res) {
          console.log("提交成功", res)
          that.setData({
            type:"success",
            tips:"提交成功"
          })
          console.log("开始跳转")
          //两秒后跳转回上一页
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 500)
        },
        fail: function (err) {
          console.log("提交失败", err)
        }

      })
    } else {
      console.log("输入不符合条件")
      this.setData({

        tips: "输入不能为空"
      })
    }

  },


})