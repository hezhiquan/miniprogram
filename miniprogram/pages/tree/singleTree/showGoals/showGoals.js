// miniprogram/pages/tree/singleTree/showGoals/showGoals.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goals:[],
    slideButtons:[
      {text:"完成"},
      {type:'warn', text:"删除该任务"}],
      dialogShow:false,
      buttons: [{text: '取消'}, {text: '确定'}],
      confirmResult:0,//0为取消删除，1为确认删除,
      tempId:""
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
  slideButtonTap:function(e){
    let that=this;
    console.log('slide button tap', e.detail.index)
    if(!e.detail.index){
      db.collection("goals").doc(e.currentTarget.dataset['id']).update({
        data:{
          finishedTime:new Date(),
          isAchieve:true
        },
        success:function(res){
          console.log("任务完成",res)
          //重新展示未完成列表
          that.showGoals();
        },
        fail:function(err){
          console.log("完成任务失败",err)
        }
      })
    }else{
      
      that.setData({
        dialogShow:true,
        tempId:e.currentTarget.dataset['id']
      })
      //此时触发了弹窗，之后在弹窗里解决

    }
  },
  tapDialogButton(e) {
    let that=this;
    console.log("弹出的是否删除弹窗结果为",e)
    this.setData({
        dialogShow: false,
        confirmResult:e.detail.index
    })
    console.log(this.data.confirmResult)
          
    if(that.data.confirmResult==1){
      console.log("继续删除")
      db.collection("goals").doc(that.data.tempId).remove({
        success:function(res){
          console.log("删除成功",res)
          that.setData({
            confirmResult:0,
            tempId:""//重新置为空
          })
          //重新展示未完成列表
          that.showGoals();
          
        },
        fail:function(err){
          console.log("删除失败",err)
        }
      })
    }else{
      console.log("取消删除")
    }
  }


})