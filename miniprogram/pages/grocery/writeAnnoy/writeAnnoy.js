// pages/post/create.js
const appInstance = getApp();
var adds={};
const db=wx.cloud.database()

Page({
  data:{
    hidetextarea:"",
    tempFilePaths: [],
    mycontent:"",
    Nickname:"",
    disabledSubmitBtn: false,
    dialogShow: false,
    showOneButtonDialog: false,
    oneButton: [{text: '确定'}],
    title:"只能插入一张图片",
    num:0,
    // change:false
    type:"error",
    tips:"" ,//用户输入错误的提示,
    items:[
      {value:"烦恼"},
      {value:"快乐",checked:'true'}
    ],
    emotion:"",
    selectdb:"Happy",
    box:"享其乐"
  },

  content:function (e) {
    this.setData({
      mycontent:e.detail.value
    })
  },
  textInput:function (e) {
    this.setData({
      Nickname:e.detail.value
    })
  },

  tapDialogButton:function (e){//错误弹窗
    console.log(e);
    this.setData({
      showOneButtonDialog:false
    })
  },

  radiochange(e){
    console.log(e.detail.value+"1")
    this.setData({
      emotion:e.detail.value,
      selectdb:e.detail.value
    })
  },

  doUpload() {
    var that = this;
    console.log("that is ",that)
    if(that.data.num==0){
      wx.chooseImage({
        count:1,
        success(res) {
          const tempFilePaths = that.data.tempFilePaths.concat(res.tempFilePaths);
          if (tempFilePaths.length== 1) {

           that.setData({
             num:1
           })
          // that.tapDialogButton()
          }
          that.setData({
            tempFilePaths: tempFilePaths
          });
        },
        fail(err){
          console.log(err)
        }
        
      })
    }else{
       that.setData({
             showOneButtonDialog:true
           })
    }
    
  },
  
  doPreviewImage(event) {
    wx.previewImage({
      current: event.currentTarget.dataset.fileUrl,
      urls: this.data.tempFilePaths
    });
  },
  doDelImage(event) {//删除选择的图片
    const tempFilePaths = this.data.tempFilePaths.concat([]);
    const index = tempFilePaths.findIndex(filePath => event.currentTarget.dataset.url == filePath);
    tempFilePaths.splice(index, 1);
    this.setData({
      tempFilePaths
    });
  },

  submit:function(){
    var that=this;
    console.log("传值")
    if(this.data.mycontent!=""&&this.data.Nickname!=""){
      if(this.data.emotion==="烦恼"){
        this.setData({
          selectdb:"Annoy",
          box:"解我忧"
        })
      }
      else if(this.emotion==="快乐"){
        this.setData({
          selectdb:"Happy",
          box:"享其乐"
        })
      }
      console.log(that.data.selectdb+"99")
      db.collection(that.data.selectdb).add({
        data:{
          content:that.data.mycontent,
          NickName:that.data.Nickname,
          date:new Date(),
        },
        success:function(res){
          console.log("上传成功")
          console.log(that.data.emotion+that.data.box)
          wx.showToast({  
            title:'漂流至'+that.data.box,  
            icon: 'success',  
            mask: true,  
            duration: 2000 
          }) 
          console.log("开始跳转")
          //两秒后跳转回上一页
          setTimeout(function(){
            wx.navigateBack({
              delta:1
            })
          },2000) 
        },
        fail:function(err){
          console.log("提交失败",err)
        }
        
      })
    }else {
      console.log("输入不符合条件")
      if(this.data.mycontent==""&&this.data.Nickname==""){
        this.setData({
          tips:"请输入内容并填写昵称",
          // title:"输入不能为空"
        })
      }
      else if(this.data.mycontent==""&&this.data.Nickname!=""){
        this.setData({
          tips:"输入不能为空"
        })
      }
      else if(this.data.mycontent!=""&&this.data.Nickname==""){
        this.setData({
          tips:"请输入昵称"
        })
      }
    }

  },
  firstbind:function () {
    this.showView();
  },
    //遮罩层部分
    // bindImage:function(){//展示内容
    //   this.showView();
    // },
    bindChange(e) {
      this.setData({
           swiperIndex: e.detail.current
      })
      },
    showView: function() { //展示遮罩层
      this.setData({
        display: "block",
        hidetextarea:"none"
      })
    },
    hideView: function() {
      //关闭遮罩层，display：none的意思是隐藏该元素，其他的display：block or inline都默认设置为元素可见
      // inline预览貌似没用
      this.setData({
        display: "none",
        hidetextarea:"block"
      })
    },
  
});