// miniprogram/pages/tree/singleTree/demo2/demo2.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:['https://s1.ax1x.com/2020/04/24/JDrg8P.md.jpg','https://s1.ax1x.com/2020/04/24/JDroUs.md.jpg','https://s1.ax1x.com/2020/04/24/JDrq2V.md.png','https://s1.ax1x.com/2020/04/24/JrdTHA.md.jpg','https://s1.ax1x.com/2020/04/24/JrdzuQ.md.jpg','https://pic.downk.cc/item/5ea30d31c2a9a83be5ea6282.png'],
    isRepeat:true,
    name:'',
    introduction:"",
    password:"",
    swiperIndex: 0 ,//这里不写第一次启动展示的时候会有问题
    display:"none",//设置是否展示遮罩层
    type:"error",//提示类型
    tips:""//提示信息
  },
    bindName:function(e){
      this.setData({
        name:e.detail.value
      })
      if(e.detail.value!=''){
        this.findSameName();
      }
      
    },
    bindIntroduction:function(e){
      this.setData({
        introduction:e.detail.value
      })
    },
    bindPassword:function(e){
      this.setData({
        password:e.detail.value
      })
    },
    bindImage:function(){//展示图片
      this.showView();
    },
    bindChange(e) {
      this.setData({
           swiperIndex: e.detail.current
      })
      },
    showView: function() { //展示遮罩层
      this.setData({
        display: "block"
      })
    },
    hideView: function() {
      //关闭遮罩层，display：none的意思是隐藏该元素，其他的display：block or inline都默认设置为元素可见
      this.setData({
        display: "none"
      })
    },
    bindSubmit:function(){
      let that=this;
      if(that.data.name==""){
        console.log("名字输入不符合条件")
        that.setData({
          type:"error",
          tips:"树屋名不能为空"
        })
      }else if( that.data.isRepeat==true)  {
       
        that.setData({
          type:"error",
          tips:"名字重复，再想个其它名字吧",
        })
      }
      else if(that.data.password==""){
        console.log("密码输入不符合条件")
        that.setData({
          type:"error",
          tips:"暗号不能为空"
        })
      }else{//在名字不重复，暗号不为空的情况下，开始创建树屋
        db.collection("treeHouse").add({
          data:{
            name:that.data.name,
            introduction:that.data.introduction,
            password:that.data.password,
            src:that.data.imgUrls[that.data.swiperIndex],            
            createdDate:new Date()
          },
          success:function(res){
            console.log("提交成功",res)
            that.setData({
              type:"success",
              tips:"创建成功"
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
      }
    },
    findSameName:function(){
      let that=this;
      db.collection("treeHouse").where({
        name:that.data.name
      }).get({
      success:function(res){
        
        console.log("查询成功",res)
        if(res.data.length>0){
          that.setData({
            type:"error",
            tips:"名字重复，再想个其它名字吧",
          })
        }else{
          that.setData({
            type:"success",
            tips:"你的名字是独一无二的哟",
            isRepeat:false
          })
        }
        
        
      },
      fail:function(err){
        console.log("查询失败",err);
      }
      })
    }
})