//index.js
//获取应用实例
const ctx = wx.createCanvasContext('myCanvas')
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    endTime:"",
    showClock: false,
    date: "",
    seconds:"",
    minutes: "",
    hours: "",
    days: "",
    weeks: "",
    months: "",
    years: "",
    timer:"",
    
    lists:[   
      // {
      //   value:"心之絮语",
      //   footer:"日记三行，纸短情长",
      //   src:"../../images/icons/xin.png",
      //   url:"../tree/multiTree/demo2/demo2"
      // },
      {
        value:"时光胶囊",
        footer:"愿你多年后不负所期",
        src:"../../images/icons/ziyuan.png",
        url:"../time_capsule/capsule"

      },
      {
        value:"解忧杂货铺",
        footer:"心绪漂流，解我苦忧",
        src:"../../images/icons/mail.png",
        url:"../grocery/grocery"
      },
      {
        value:"我的树苗",
        footer:"过去未去，未来已来",
        src:"https://s1.ax1x.com/2020/05/09/YMaFdH.png",
        url:"../tree/singleTree/singleTree"

      },
      {
        value:"树屋世界",
        footer:"愿有人与你并肩而行",
        src:"https://s1.ax1x.com/2020/05/09/YMUSbQ.png",
        url:"../tree/multiTree/multiTree"

      },
      
      
    ],
    cakeArr:null,
    info:"",//生日提示
    isFirst:true,//是否是第一次点击“获取生辰钟”
    toBall:false,//是否查看人生进度球
    isBallInit:false,//球是否是第一次被初始化
    remainMonth:"",
  },
  

  onLoad: function (options) {
  },
  getcake:function(i){
    //掉落时间
    var dropTime = Math.floor(Math.random() * (200-100)+100);
    var angle = Math.ceil(Math.random() * 30)-15;
    var marginLeft = Math.ceil(Math.random() * 690);
    var width = Math.floor(Math.random() * (100 - 60 + 1) + 60);
    var animation = Math.floor(Math.random() * (6-3)+3)
    console.log(marginLeft);
    var cake = {
      id: i,
      angle: angle,
      marginleft: marginLeft,
      width: width,
      height: width,
      animation: animation
    }
    var cakeA = this.data.cakeArr;
    if (cakeA == null){
      cakeA = new Array();
    }
    cakeA.push(cake);
    this.setData({
      cakeArr: cakeA,
     
    })
    var that = this;
    //一共要掉落多少个
    if(i <= 60){
      var timerTem =setTimeout(function () {
        i = i+ 1;
        console.log(i);
        that.getcake(i)
      }, dropTime)
    }
  },
  onReady: function () {
    //设置时间选择器的终止时间
    this.setData({
      endTime:getEndTime()
    })

    //刚进入页面时，调用云函数尝试登录
    wx.cloud.callFunction({
      name : 'login',
      data : {}
    }).then((res)=>{
      db.collection('users').where({
        _openid : res.result.openid
      }).get().then((res)=>{
        if( res.data.length ){         
          console.log("login函数调用结果为",res)
          app.userInfo = Object.assign(app.userInfo, res.data[0]);    
         
        }       
      });
    })
    .catch((err)=>{
      console.log(err)
    })
  },
  onShow: function (e) {
   
    setInterval(show,1000); //每秒执行1次
    function show() {
      secshow()
      minshow()
      houshow()
      backshow()
      ctx.draw()
    }

  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      date: e.detail.value,
      showClock: true,
      
    })
    console.log(this.data);
    
      this.getBirthday();
    
  },
  
  //生辰钟
  getBirthday:function() {
    console.log("getBirthday")
    clearInterval(this.data.timer);
    this.setData({
      timer:setInterval(this.getTime,1000)
    })
  },
  getTime:function(){//将对应的时间转换月，周，日，时，分，秒
      //出生时间    
    let that=this;
    let birthday = new Date(that.data.date);
    // console.log("that.data.date is " + that.data.date);
    //获取当前时间
    let today = new Date();
    let allMilliseconds = (today.getTime() - birthday.getTime()); //总毫秒数
    let secondsOld = Math.floor(allMilliseconds / 1000); //总秒数
    let minutes = Math.floor(secondsOld / 60); //相差分钟数
    let hours = Math.floor(minutes / 60); //相差小时数
    let days = Math.floor(hours / 24); //相差天数
    let weeks = Math.floor(days / 7);
    
    let date1 = that.data.date.split('-');
    date1 = parseInt(date1[0] * 12) + parseInt(date1[1]);    
    let date2 = today.getFullYear() * 12 + today.getMonth();

    //彩蛋，当当前月份与生辰钟的月份相同时，掉落生日蛋糕
    if(today.getMonth()==birthday.getMonth()&&this.data.isFirst){
      this.getcake(1);
      this.setData({
        info:"本月生日快乐！",
        isFirst:false,
      })
    }

    that.setData({
      seconds:(allMilliseconds/(1000*60*60*24*365)).toFixed(9),
      minutes: minutes,
      hours: hours,
      days: days,
      weeks: weeks,
      months: (date2 - date1+1),
      years: today.getFullYear() - birthday.getFullYear()
    })
  },
  toClock:function(){
    
    this.setData({
      toBall:false
    })
  },
  toBall:function(){
   
    this.setData({
      toBall:true
    })
    if(!this.data.isBallInit){

      let allMonth=900;//人的平均寿命为900个月
     
      console.log("months is"+this.data.months);
      let rate=Math.ceil((1-(this.data.months/900))*100);
      rate=rate>100?100:rate;
      this.setData({
        remainMonth:900-this.data.months
      })
      //创建并返回绘图上下文context对象。
    const ctx = wx.createCanvasContext('canvasArcCir')
    wave(ctx, rate);
      this.setData({
        isBallInit:true
      })
    }
    
  }

})
//秒针
function secshow() {
  var now = new Date()
  var sec = now.getSeconds()
  //角度弧度
  var angle = sec * Math.PI / 30
  var x = 70 * Math.sin(angle) + 100
  var y = 100 - 70 * Math.cos(angle)
  ctx.beginPath()
  ctx.setLineWidth(2)
  ctx.setStrokeStyle('red')
  ctx.moveTo(100, 100)
  ctx.lineTo(x, y)
  ctx.closePath()
  ctx.stroke()
}
//分针
function minshow() {
  var now = new Date()
  var min = now.getMinutes()
  var sec = now.getSeconds()
  var angle = (min + sec / 60) * Math.PI / 30
  var x = 55 * Math.sin(angle) + 100
  var y = 100 - 55 * Math.cos(angle)
  ctx.beginPath()
  ctx.setLineWidth(5)
  ctx.setStrokeStyle('black')
  ctx.moveTo(100, 100)
  ctx.lineTo(x, y)
  ctx.closePath()
  ctx.stroke()
}
//时针
function houshow() {
  var now = new Date()
  var hou = now.getHours()
  hou = hou % 12 //24小时制，取余数
  var min = now.getMinutes()
  var sec = now.getSeconds()
  var angle = (hou + min / 60 + sec / 3600) * Math.PI / 6
  var x = 40 * Math.sin(angle) + 100
  var y = 100 - 40 * Math.cos(angle)
  ctx.beginPath()
  ctx.setLineWidth(6)
  ctx.moveTo(100, 100)
  ctx.lineTo(x, y)
  ctx.closePath()
  ctx.stroke()
}
//表盘
function backshow() {
  ctx.beginPath()
  ctx.setLineWidth(6)
  ctx.arc(100, 100, 85, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.stroke()
}

//格式化endTime
function getEndTime(){
  //格式化endTime
  let date=new Date();
  let year = date.getFullYear();  
  let month = date.getMonth() + 1;  
  month = month < 10 ? '0' + month : month;  
  var day = date.getDate();  
  day = day < 10 ? ('0' + day) : day;  
  return year+'-'+month+"-"+day;
}
// 画球
var wave = function (ctx, oRange){
  var tid;
  //oRange = document.getElementsByName("range")[0];
  var M = Math;
  var Sin = M.sin;
  var Cos = M.cos;
  var Sqrt = M.sqrt;
  var Pow = M.pow;
  var PI = M.PI;
  var Round = M.round;
  var oW =  150;
  var oH =  150;
  // 线宽
  var lineWidth = 2;
  // 大半径
  var r = (oW / 2);
  var cR = r - 10 * lineWidth;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  // 水波动画初始参数
  var axisLength = 2 * r - 16 * lineWidth;  // Sin 图形长度
  var unit = axisLength / 9; // 波浪宽
  var range = .4 // 浪幅
  var nowrange = range;
  var xoffset = 8 * lineWidth; // x 轴偏移量
 
  var data = ~~(oRange) / 100;   // 数据量
 
  var sp = 0; // 周期偏移量
  var nowdata = 0;
  var waveupsp = 0.006; // 水波上涨速度
  // 圆动画初始参数
  var arcStack = [];  // 圆栈
  var bR = r - 8 * lineWidth;
  var soffset = -(PI / 2); // 圆动画起始位置
  var circleLock = true; // 起始动画锁
  // 获取圆动画轨迹点集
  for (var i = soffset; i < soffset + 2 * PI; i += 1 / (8 * PI)) {
    arcStack.push([
      r + bR * Cos(i),
      r + bR * Sin(i)
    ])
  }
  // 圆起始点
  var cStartPoint = arcStack.shift();
  ctx.strokeStyle = "#1c86d1";
  ctx.moveTo(cStartPoint[0], cStartPoint[1]);
  // 开始渲染
  render();
  function drawSine() {
    ctx.beginPath();
    ctx.save();
    var Stack = []; // 记录起始点和终点坐标
    for (var i = xoffset; i <= xoffset + axisLength; i += 20 / axisLength) {
      var x = sp + (xoffset + i) / unit;
      var y = Sin(x) * nowrange;
      var dx = i;
      var dy = 2 * cR * (1 - nowdata) + (r - cR) - (unit * y);
      ctx.lineTo(dx, dy);
      Stack.push([dx, dy])
    }
    // 获取初始点和结束点
    var startP = Stack[0]
    var endP = Stack[Stack.length - 1]
    ctx.lineTo(xoffset + axisLength, oW);
    ctx.lineTo(xoffset, oW);
    ctx.lineTo(startP[0], startP[1])
    ctx.fillStyle = "#4BEF8B";
 
    ctx.fill();
    ctx.restore();
  }
  function drawText() {
    ctx.globalCompositeOperation = 'source-over';
    var size = 0.4 * cR;
    ctx.font = 'bold ' + size + 'px Microsoft Yahei';
    var number = (nowdata.toFixed(2) * 100).toFixed(0);
    var txt = number+ '%';
    var fonty = r + size / 2;
    var fontx = r - size * 0.8;
 
    if (number >= 50)
    {
      ctx.fillStyle = "#FFFFFF";
    }
    else{
      ctx.fillStyle = "#38D560";
    }
    ctx.textAlign = 'center';
    ctx.fillText(txt, r + 5, r + 20)
  }
  //最外面淡黄色圈
  function drawCircle() {
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#fff89d';
    ctx.arc(r, r, cR + 7, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  }
  //灰色圆圈
  function grayCircle() {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#7ce99e';
    ctx.arc(r, r, cR - 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
    ctx.beginPath();
  }
  //橘黄色进度圈
  function orangeCircle() {
    ctx.beginPath();
    ctx.strokeStyle = '#fbdb32';
    //使用这个使圆环两端是圆弧形状
    ctx.lineCap = 'round';
    ctx.arc(r, r, cR - 5, 0 * (Math.PI / 180.0) - (Math.PI / 2), (nowdata * 360) * (Math.PI / 180.0) - (Math.PI / 2));
    ctx.stroke();
    ctx.save()
  }
  //裁剪中间水圈
  function clipCircle() {
    ctx.beginPath();
    ctx.arc(r, r, cR - 10, 0, 2 * Math.PI, false);
    ctx.clip();
  }
  //渲染canvas
  function render() {
    abortAnimationFrame(tid);
 
    ctx.clearRect(0, 0, oW, oH);
    //最外面淡黄色圈
    // drawCircle();
    //灰色圆圈
    grayCircle();
    //橘黄色进度圈
    // orangeCircle();
    //裁剪中间水圈
    clipCircle();
    // 控制波幅
    //oRange.addEventListener("change", function () {
    //  data = ~~(oRange.value) / 100;
    //  console.log("data=" + data)
    //}, 0);
    if (data >= 0.85) {
      if (nowrange > range / 4) {
        var t = range * 0.01;
        nowrange -= t;
      }
    } else if (data <= 0.1) {
      if (nowrange < range * 1.5) {
        var t = range * 0.01;
        nowrange += t;
      }
    } else {
      if (nowrange <= range) {
        var t = range * 0.01;
        nowrange += t;
      }
      if (nowrange >= range) {
        var t = range * 0.01;
        nowrange -= t;
      }
    }
    if ((data - nowdata) > 0) {
      nowdata += waveupsp;
    }
    if ((data - nowdata) < 0) {
      nowdata -= waveupsp
    }
    sp += 0.07;
    // 开始水波动画
    drawSine();
    // 写字
    drawText();
 
    ctx.draw();
 
    tid = doAnimationFrame(render);
  }
 
  var lastFrameTime = 0;
  // 模拟 requestAnimationFrame
  function doAnimationFrame(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime));
    var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
    lastFrameTime = currTime + timeToCall;
    return id;
  };
  // 模拟 cancelAnimationFrame
  function abortAnimationFrame(id) {
    clearTimeout(id)
  }
}