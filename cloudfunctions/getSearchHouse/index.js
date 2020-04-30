// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "we-chat-test-25sxs",
  traceUser: true,
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  try {
    return await db.collection("treeHouse").doc(event.id)
      .update({
        data: {
          finishedTime: new Date(),
          isAchieve: true
        },
        success: function (res) {
          console.log("任务完成", res)
          //重新展示未完成列表
          that.showGoals();
        },
        fail: function (err) {
          console.log("完成任务失败", err)
        }
      })
  } catch (e) {
    console.log(e)
  }
  // return {
  //   sum:event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }

}