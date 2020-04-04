//index.js
//获取应用实例
const ctx = wx.createCanvasContext('myCanvas')

Page({
  data: {
    endTime:"",
    showClock: false,
    date: "",
    minutes: "",
    hours: "",
    days: "",
    weeks: "",
    months: "",
    years: "",
    timer:"",
    
    lists:[
      {
        value:"时光胶囊",
        footer:"愿你多年后不负所期",
        src:"../../images/icons/ziyuan.png"
      },
      {
        value:"见字如面",
        footer:"一信千行，纸短情长",
        src:"../../images/icons/xin.png"
      },
      {
        value:"树洞",
        footer:"你说，我听",
        src:"../../images/icons/mail.png"
      },
      {
        value:"生辰树",
        footer:"看看今天自己又学习了多少吧",
        src:"../../images/icons/tree.png"
      }
    ]
  },
  onReady: function () {
    
    this.setData({
      endTime:getEndTime()
    })
  },
  onShow: function (e) {
   
    setInterval(show,1000); //每秒执行1次
    function show() {
      secshow()
      minshow()
      houshow()
      backshow()
      // numbershow()
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
    let that = this;
    that.setData({
      timer:setInterval(function(){
        //出生时间    
    let birthday = new Date(that.data.date);
    console.log("that.data.date is " + that.data.date);
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
  
    that.setData({
      minutes: minutes,
      hours: hours,
      days: days,
      weeks: weeks,
      months: (date2 - date1),
      years: today.getFullYear() - birthday.getFullYear()
    })},1000)

    })
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
//数字
function numbershow() {
  ctx.beginPath()
  ctx.setFontSize(20)
  for (var i = 1; i < 13; i++) {
    var angle = i * Math.PI / 6
    var x = 80 * Math.sin(angle) + 145 //微调
    var y = 158 - 80 * Math.cos(angle)
    ctx.fillText(i, x, y)
  }
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
