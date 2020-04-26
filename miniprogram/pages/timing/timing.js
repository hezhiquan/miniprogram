// pages/timing/timing.js
const db =wx.cloud.database();
const app=getApp();
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    ghour:0,
    gminute:0,  
    hours: 0,   
    minute: 0,   
    second: 0,
    centisecond:0,  
    timer:0 ,
    flag:false ,
    fag:false,
    showModalStatus: false, 
    time: '00:00',
    count:0,
    countTimer:0,
    goal:'',
    sidebars://侧边栏列表项的内容
    [
    {text:"我的树苗",url:"../tree/singleTree/singleTree",src:"https://s1.ax1x.com/2020/04/16/JizRnU.png"},
    {text:"树苗商店",url:"../purchase/purchase",src:"https://s1.ax1x.com/2020/04/16/JizBkj.png"},
    {text:"超级树屋",url:"../tree/multiTree/multiTree",src:"https://s1.ax1x.com/2020/04/16/Jiz610.png"}
    ],
    isLogin:false//判断用户是否登录
  }, 
  
countInterval: function(){
    this.data.countTimer = setInterval(()=>{
      if(this.data.count <= 60){
        this.progress_canvas(this.data.count/(60/2));
        this.data.count++;
      }else{
        this.data.count=0;
        this.progress_canvas(0); 
      } },1000)  
  },
  smile:function (e) {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('progress_bg')
    context.setLineWidth(5)    
    context.setStrokeStyle("#20180b")
    context.setLineCap('round')
    context.beginPath()
    context.arc(110, 110, 100, -Math.PI/2, 2 * Math.PI-Math.PI/2, false)    
    context.stroke()
    context.draw()
  },
  progress_canvas:function (step) {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('progress_canvas')
     var gradient = context.createLinearGradient(200,100,100,200)
     gradient.addColorStop('0','#2661DD')
     gradient.addColorStop('0.5','#40ED94')
     gradient.addColorStop('1.0','#5956cc')   
    context.setLineWidth(10)    
    context.setStrokeStyle(gradient)
    context.setLineCap('round')
    context.beginPath()
    context.arc(110, 110, 100, -Math.PI/2, step * Math.PI-Math.PI/2, false)    
    context.stroke()
    context.draw()
  },

  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value, 
      flag:true,
      count:0
    })
    const that = this 
    clearInterval(that.data.timer)
    clearInterval(that.data.countTimer)
    that.progress_canvas(0); 
    var second = 0
    var cent = 0
    if(that.data.time[0]==0)
    {
         var hours = that.data.time[1]
         that.setData({
            ghour:that.data.time[1]
         })
         console.log(that.data.ghour)
    }
    else
    {
        var hours = that.data.time[0]+that.data.time[1]
        that.setData({
            ghour:that.data.time[0]+that.data.time[1]
         })
         console.log(that.data.ghour)
    }
    if(that.data.time[3]==0)
    {
         var minute = that.data.time[4]
         that.setData({
             gminute:that.data.time[4]
         })
         console.log(that.data.gminute)
    }
    else
    { 
        var minute = that.data.time[3]+that.data.time[4]
        that.setData({
            gminute:that.data.time[3]+that.data.time[4]
        })
        console.log(that.data.gminute)
    }
    
    if (hours < 10) {
        // 少于10补零
        that.setData({
            hours: '0' + hours
        })
    } else {
        that.setData({
            hours: hours
        })
    }
    if (minute < 10) {
        // 少于10补零
        that.setData({
            minute: '0' + minute
        })
    } else {
        that.setData({
            minute: minute
        })
    }
    if (second < 10) {
        // 少于10补零
        that.setData({
            second: '0' + second
        })
    } else {
        that.setData({
            second: second
        })
    } 
    if (second < 10) {
        // 少于10补零
        that.setData({
            second: '0' + second
        })
    } else {
        that.setData({
            second: second
        })
    } 
    if (cent < 10) {
        that.setData({
            centisecond: '0' + cent
        })
     } 
     else {
        that.setData({
            centisecond: cent
        })
     }
  },


  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },  
  util: function(currentStatu){
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    })
    
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
 
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
 
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      
      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  
    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
   },
  onLoad: function (options) {
    // 调用函数
    this.Initi();   
  },  
  
startTime()
{
  const that=this
  var second = that.data.second  
  var minute = that.data.minute
  var hours = that.data.hours
  var centisecond = that.data.centisecond
  if(!(second==0&&minute==0&&hours==0&&centisecond==0))  
  if(that.data.flag)   
  {
      that.smile();
      that.countInterval(); 
  }  
  if(that.data.flag)          
    that.setData({
        flag:false, 
        fag:true,
        timer:setInterval(function () {  
        if(centisecond>=0)  
           centisecond--     
        if(centisecond<0){ 
        if(second>0)
        centisecond=99        
        if(second>=0)  
        second--
        if (second <0) {
            if(minute>0)
              second = 60  
            if(minute>=0) 
            minute--
            if (minute < 0) {
               if(hours>0)
                minute = 60  
                if(hours>0)
                {
                 hours--
                 if (hours < 10) {
                    that.setData({
                        hours: '0' + hours
                    })
                } else {
                    that.setData({ 
                        hours: hours
                    })
                }
               } 
            }
            if(minute>=0)
            if (minute < 10) {
                that.setData({
                    minute: '0' + minute
                })
            } else {
                that.setData({
                    minute: minute
                })
            }
        }
        if(second>=0)
        if (second < 10) {
            that.setData({
                second: '0' + second
            })
         } else {
            that.setData({
                second: second
            })
         }
        }
        if(centisecond>=0)
        if (centisecond < 10) {
            that.setData({
                centisecond: '0' + centisecond
            })
         } 
         else {
            that.setData({
                centisecond: centisecond
            })
         }
         if(hours==0&&minute==0&&second==0&&centisecond==0)
         {      
                 that.progress_canvas(0); 
                 clearInterval(that.data.countTimer) 
                 clearInterval(that.data.timer)
                 wx.showModal({
                    title:'任务成功',
                    content:'恭喜你\^o^/！',
                })
                that.setData({
                    fag:false
                })
                
         }
        }, 8)
    })
  },

  Initi()
  {
    const that = this
    var second = that.data.second 
    var hours = that.data.hours
    var minute = that.data.minute
    var cent = that.data.centisecond
    that.setData({
        hours:0,
        minute:0, 
        second:0
    }) 
    if (hours < 10) {
        // 少于10补零
        that.setData({
            hours: '0' + hours
        })
    } else {
        that.setData({
            hours: hours
        })
    }
    if (minute < 10) {
        // 少于10补零
        that.setData({
            minute: '0' + minute
        })
    } else {
        that.setData({
            minute: minute
        })
    }
    if (second < 10) {
        // 少于10补零
        that.setData({
            second: '0' + second
        })
    } else {
        that.setData({
            second: second
        })
    } 
    if (second < 10) {
        // 少于10补零
        that.setData({
            second: '0' + second
        })
    } else {
        that.setData({
            second: second
        })
    } 
    if (cent < 10) {
        that.setData({
            centisecond: '0' + cent
        })
     } 
     else {
        that.setData({
            centisecond: cent
        })
     }
  },


  Finput(e)
  {
      this.setData({
         goal:e.detail.value
      })
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
    //判断是否登录
    // console.log(app)
    if(this.data.isLogin==false &&app.userInfo.nickName!=null){
        this.setData({
            isLogin:true
        })
    }
    // console.log(this.data.isLogin)
    // console.log("onshow 调用")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
         const that=this 
        if(that.data.fag) 
        {
           that.setData({
              centisecond:0,
              second:0,
              minute:0,
              hours:0,
              count:0,
          }) 
          clearInterval(that.data.countTimer)
          that.progress_canvas(0)
          clearInterval(that.data.timer)
          that.Initi()
          wx.showModal({
            title:'任务失败',
            content:'请重新开始',
          })
          that.setData({
              fag:false
          })
        }
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})