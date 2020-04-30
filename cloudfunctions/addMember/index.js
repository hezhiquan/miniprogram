// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "we-chat-test-25sxs",
  traceUser: true,
})

// 云函数入口函数
exports.main = async (event, context) => {

  const db = cloud.database()
  const _= db.command
  console.log("传进来的event是 ",event)
  try {
    return await db.collection("treeHouse").doc(event.id)
      .update({
        data: {
          openidList:_.push([event.openid]),
          memberList:_.push([event.name])
        }
      })
  } catch (e) {
    console.log(e)
  }
}