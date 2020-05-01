// pages/post/create.js
const appInstance = getApp();
var adds={};
const db=wx.cloud.database()

Page({
  data:{
    
    tempFilePaths: [],
    mycontent:"",
    disabledSubmitBtn: false,
    dialogShow: false,
    showOneButtonDialog: false,
    oneButton: [{text: '确定'}],
    title:"只能插入一张图片",
    num:0,
    // change:false
    Nickname:"",
    type:"error",
    tips:"" ,//用户输入错误的提示,
    items:[
      {value:"烦恼"},
      {value:"快乐",checked:'true'}
    ],
    emotion:"",
    selectdb:"Happy"
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

  formSubmit:function(){
    var that=this;
    console.log("传值")
    if(this.data.mycontent!=""){
      if(this.data.emotion==="烦恼"){
        this.setData({
          selectdb:"Annoy"
        })
      }
      else if(this.emotion==="快乐"){
        this.setData({
          selectdb:"Happy"
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
          wx.showToast({  
            title: '上传成功',  
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
      this.setData({
      
        tips:"输入不能为空"
      })
    }

  },

  
});