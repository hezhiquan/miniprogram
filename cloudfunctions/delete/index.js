// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "we-chat-test-25sxs",
  traceUser: true,
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  return await db.collection("goals").where({
    _openid:wxContext.OPENID
  }).remove();

}