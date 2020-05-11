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
  const _= db.command;
  const record= await db.collection("treeHouseGoal").doc(event.id).get();
  console.log(record);

  console.log("record.data is ",record.data)
  let isAchieve=false;
  if(record.data.myCheck && (record.data.otherCheck+1)>=event.length){
    isAchieve=true
  }
  console.log(isAchieve);

  
  try {
    return await db.collection("treeHouseGoal").doc(event.id)
      .update({
        data: {
          checkOtherList:_.push(wxContext.OPENID),
          otherCheck:_.inc(1),
          isAchieve:isAchieve,
          finishedTime:new Date()
        }
      })
  } catch (e) {
    console.log(e)
  }
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}