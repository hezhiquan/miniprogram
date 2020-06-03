// pages/looksore/looksore.js
const db = wx.cloud.database();
const app = getApp();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    treehouseId: '',
    list: [],
    list2: [],
    num: 0,
    currentTab: 0
  },

  myCheck(e) { 
    console.log(e.currentTarget.dataset.check)
    const banner = db.collection("treeHouseGoal")
    const that = this
    if (!e.currentTarget.dataset.check)
      wx.showModal({
        title: "通过小目标",
        content: "小目标完成了吗？",
        success: res => {
          if (res.confirm) {
            console.log('确定')
            // wx.showModal({
            //   title: '提醒',
            //   content: '成功'
            // })
            wx.showToast({
              title: '成功完成小目标',
            })
            banner.doc(e.currentTarget.dataset.id).update({
                data: {
                  myCheck: true
                }
              }).then(res => {
                console.log(res)
                banner.where({
                  treeHouseID: that.data.treehouseId,
                  _openid: that.data.openid
                }).get().then(res => {
                  console.log(res.data)
                  that.setData({
                    list: res.data
                  })
                  console.log(that.data.list)
                })
              })
              .catch(err => {
                console.log(err)
              }) 
          }
          if (res.cancel) {
            console.log('取消')
          }
        }
      })
    else {
      wx.showModal({
        title: "提醒",
        content: "小目标已经完成了哦",
        showCancel:false
      })
      
    }
  },
 
  myCancel(e)
  {
    const banner = db.collection("treeHouseGoal")
    const that = this
    wx.showModal({
      title: '放弃任务',
      content: '你确定放弃当前任务吗？',
      success: res=>{
        if(res.confirm)
        {
          banner.doc(e.currentTarget.dataset.id).remove()
          .then(res=>{
            console.log(res)
            banner.where({
              treeHouseID: that.data.treehouseId,
              _openid: that.data.openid
            }).get().then(res => {
              console.log(res.data)
              that.setData({
                list: res.data,
              })
              console.log(that.data.list)
            }).catch(err => {
              console.log(err) 
            }) 
            // wx.showModal({
            //   title: '提醒',
            //   content: '任务已移除',
            //   showCancel:false
            // })
            wx.showToast({
              title: '任务已移除',
            })
            
          })
        }
      },
    })
  },

  Checkothers(e) {
    console.log(e.currentTarget.dataset.checklist)
    const banner = db.collection("treeHouseGoal")
    const that = this
      wx.showModal({ 
        title: "为队友的目标打分", 
        content: "队友的目标完成了吗？",
        success: res => {
          if (res.confirm) {
            console.log('确定')
            wx.cloud.callFunction({
                name: 'confirmTeammateGoal',
                data: {
                  id: e.currentTarget.dataset.id,
                  length: parseInt(that.data.num / 2)
                }
              }).then((res) => {
                console.log(res)
                banner.where({
                  treeHouseID: that.data.treehouseId,
                  _openid: _.neq(app.userInfo._openid),
                  myCheck: true,
                  checkOtherList: _.neq(app.userInfo._openid),
                  isAchieve: false
                }).get().then(res => {
                  console.log(res.data)
                  that.setData({
                    list2: res.data
                  })
                  console.log(that.data.list2)
                })
              })
              .catch((err) => {
                console.log(err)
              })
          }
          if (res.cancel) {
            console.log('取消')
          }
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '查看目标'
    })
    this.setData({
      openid: app.userInfo._openid,
      treehouseId: options.houseID
    })
    console.log(this.data.openid)
    console.log(options.houseID)
    const banner = db.collection("treeHouseGoal")
    const banner2 = db.collection("treeHouse")
    var length = 0
    banner2.doc(options.houseID).get().then(res => {     
      length = res.data.openidList.length
      console.log(length)
    })
    banner.where({
      treeHouseID: this.data.treehouseId,
      _openid: this.data.openid
    }).get().then(res => {
      console.log(res.data) 
      this.setData({
        list: res.data,
        num: length
      })
      console.log(this.data.list)
    })

    banner.where({
      treeHouseID: this.data.treehouseId,
      _openid: _.neq(app.userInfo._openid),
      myCheck: true,
      checkOtherList: _.neq(app.userInfo._openid),
      isAchieve: false
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        list2: res.data,
        num: length
      })
      console.log(this.data.list2)
    })

  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})