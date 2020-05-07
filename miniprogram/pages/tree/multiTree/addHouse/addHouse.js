// miniprogram/pages/tree/singleTree/demo2/demo2.js
const db=wx.cloud.database();
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:['https://s1.ax1x.com/2020/04/24/JDrg8P.md.jpg',
    'https://i.loli.net/2020/05/07/KBJiPlv3odVF4aO.jpg',
   'https://i.loli.net/2020/05/07/ijDhlGz3oF9mJxT.jpg','https://i.loli.net/2020/05/07/JHdgq5IFcaD9yrz.jpg',
   'https://i.loli.net/2020/05/07/QSVoEJKrBiZmuHs.jpg',
  'https://i.loli.net/2020/05/07/gfQZi1WN6PpjoXM.jpg',
   'https://i.loli.net/2020/05/07/qwOS6lPmJZgpcE1.jpg',
   'https://i.loli.net/2020/05/07/o5p4S1jdUKes8FZ.jpg',
   'https://i.loli.net/2020/05/07/rjMLtC5TREPHhn7.jpg',
   'https://i.loli.net/2020/05/07/o4fDaykqUCmpVPJ.jpg',
   'https://i.loli.net/2020/05/07/8hf4EwDX5sQ2HYb.jpg',
   'https://i.loli.net/2020/05/07/QrEgaVMblimnx9d.jpg',
   'https://i.loli.net/2020/05/07/GJLlA5Y3QfqPmId.jpg',
   'https://i.loli.net/2020/05/07/oijM7H61bGE2k9Z.jpg',
   'https://i.loli.net/2020/05/07/PrJtmNg8nbzGKkv.jpg',
   'https://i.loli.net/2020/05/07/z2gRGsLpd5ebnVc.jpg',
   'https://pic.downk.cc/item/5eb38698c2a9a83be5eef4d5.jpg',
'https://pic.downk.cc/item/5eb38698c2a9a83be5eef4d7.jpg',
'https://pic.downk.cc/item/5eb38698c2a9a83be5eef4da.jpg',
'https://pic.downk.cc/item/5eb3870fc2a9a83be5ef6a32.jpg',
'https://pic.downk.cc/item/5eb3870fc2a9a83be5ef6a35.jpg',
'https://pic.downk.cc/item/5eb3870fc2a9a83be5ef6a3b.jpg',
'https://pic.downk.cc/item/5eb3870fc2a9a83be5ef6a3f.jpg',
  ],
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
      console.log("openid 是 "+app.userInfo._openid)
      
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
        //日期格式化
        let date=new Date();
        let dateString=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
        db.collection("treeHouse").add({
          data:{
            name:that.data.name,
            introduction:that.data.introduction,
            password:that.data.password,
            bgSrc:that.data.imgUrls[that.data.swiperIndex],//对应的背景图片            
            createdDate:dateString,//树屋创建时间
            memberList:[app.userInfo.nickName],//所有树屋成员
            openidList:[app.userInfo._openid],//所有树屋成员的openid
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