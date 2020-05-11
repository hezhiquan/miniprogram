// miniprogram/pages/tree/singleTree/showGoals/showGoals.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display:'',//设置是否展示遮罩层
    goals:[],
    slideButtons:[
      {text:"完成"},
      {type:'warn', text:"删除该任务"}],
      dialogShow:false,
      buttons: [{text: '取消'}, {text: '确定'}],
      confirmResult:0,//0为取消删除，1为确认删除,
      tempId:"",
      bgSrc:["https://i.loli.net/2020/05/10/KtzYaRCsNunme19.jpg"],
      detail:"",
      info:""
  },
 

 
  onLoad: function () {
    //展示所有的未完成列表
    this.showGoals();
  },
  showGoals:function(){
    let that=this;
    db.collection("goals").where({
      _openid:'openid',
      isAchieve:false
    })
    .orderBy("createdDate","desc")
    .limit(18).get({
    success:function(res){
      
      console.log("查询成功",res)
      that.setData({
        goals:res.data
      })
      
    },
    fail:function(err){
      console.log("查询失败",err);
    }
    })
  },
  // slideButtonTap:function(e){
  //   let that=this;
  //   console.log('slide button tap', e.detail.index)
  //   if(!e.detail.index){
  //     db.collection("goals").doc(e.currentTarget.dataset['id']).update({
  //       data:{
  //         finishedTime:new Date(),
  //         isAchieve:true
  //       },
  //       success:function(res){
  //         console.log("任务完成",res)
  //         //重新展示未完成列表
  //         that.showGoals();
  //       },
  //       fail:function(err){
  //         console.log("完成任务失败",err)
  //       }
  //     })
  //   }else{
      
  //     that.setData({
  //       dialogShow:true,
  //       tempId:e.currentTarget.dataset['id']
  //     })
  //     //此时触发了弹窗，之后在弹窗里解决

  //   }
  // },
  // tapDialogButton(e) {
  //   let that=this;
  //   console.log("弹出的是否删除弹窗结果为",e)
  //   this.setData({
  //       dialogShow: false,
  //       confirmResult:e.detail.index
  //   })
  //   console.log(this.data.confirmResult)
          
  //   if(that.data.confirmResult==1){
  //     console.log("继续删除")
  //     db.collection("goals").doc(that.data.tempId).remove({
  //       success:function(res){
  //         console.log("删除成功",res)
  //         that.setData({
  //           confirmResult:0,
  //           tempId:""//重新置为空
  //         })
  //         //重新展示未完成列表
  //         that.showGoals();
          
  //       },
  //       fail:function(err){
  //         console.log("删除失败",err)
  //       }
  //     })
  //   }else{
  //     console.log("取消删除")
  //   }
  // },
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
  },
  showDetail:function(e){
    this.showview();
    let index=e.currentTarget.dataset.index;
    console.log("e is ",e)
    this.setData({
      detail:this.data.goals[index]
    })

  },
  bindDelete:function(){
    let that=this;
    db.collection("goals").doc(this.data.detail._id).remove({
      success:function(res){
        console.log("删除成功",res)
        that.setData({
          info:"小目标已删除"
        })
        //重新展示未完成列表
        that.showGoals();
        
      },
      fail:function(err){
        console.log("删除失败",err)
      }
    })
  },
  bindFinish:function(){
    let that=this;
    console.log("detail is ",this.data.detail)
    db.collection("goals").doc(this.data.detail._id).update({
      data:{
        finishedTime:new Date(),
        isAchieve:true
      },
      success:function(res){
        console.log("任务完成",res)
        that.setData({
          info:"小目标已完成 ง (•̀ᴗ•́)و ̑̑"
        })
        //重新展示未完成列表
        that.showGoals();
      },
      fail:function(err){
        console.log("完成任务失败",err)
      }
    })
  }


})