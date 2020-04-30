Page({
  data: {
    display:'',//设置是否展示遮罩层
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
