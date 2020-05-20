Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    animationContact: {},
    animationSave: {},
    animationShare: {},
    animationHome: {},
    animationModal: {},
    animationContainer:{}
  },
  contorlAnimate(){
    if(this.data.isShow){
      this.closeAnimate()
    }else{
      this.showAnimate()
    }
  },
  closeAnimate() {
    var animationModal = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in'
    })
    animationModal.opacity(0).scale(0.0, 0.0).step()

    var animationContact = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in'
    })
    animationContact.opacity(0).scale(0.0, 0.0).translateX(0).step()

    var animationSave = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in'
    })
    animationSave.opacity(0).scale(0.0, 0.0).translateX(0).step()

    var animationShare = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in'
    })
    animationShare.opacity(0).scale(0.0, 0.0).translateX(0).step()

    var animationHome = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in'
    })
    animationHome.opacity(0).scale(0.0, 0.0).translateX(0).step()
    this.data.isShow = false
    this.setData({
      animationContact: animationContact.export(),
      animationSave: animationSave.export(),
      animationShare: animationShare.export(),
      animationHome: animationHome.export(),
      animationModal: animationModal.export()
    })
  },
  showAnimate() {
    var animationModal = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationModal.opacity(0.0).scale(300, 300).step()
    var animationContact = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationContact.opacity(1).scale(0.8, 0.8).translateX(-120).step()
    var animationSave = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationSave.opacity(1).scale(0.8, 0.8).translateX(-104).translateY(-60).step()

    var animationShare = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationShare.opacity(1).scale(0.8, 0.8).translateX(-60).translateY(-104).step()

    var animationHome = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-out'
    })
    animationHome.opacity(1).scale(0.8, 0.8).translateX(0).translateY(-120).step()
    this.data.isShow = true
    this.setData({
      animationContact: animationContact.export(),
      animationSave: animationSave.export(),
      animationShare: animationShare.export(),
      animationHome: animationHome.export(),
      animationModal: animationModal.export()
    })
  },
  clickHome(){
    wx.showToast({
      icon:"none",
      title: '点击了Home',
    })
  },
  clickShare() {
    wx.showToast({
      icon: "none",
      title: '点击了分享',
    })
  },
  clickContact() {
    wx.showToast({
      icon: "none",
      title: '点击了联系',
    })
  },
  clickSave() {
    wx.showToast({
      icon: "none",
      title: '点击了保存',
    })
  }
})
