function formatTime(date){
  let y = date.getFullYear()
  let m = date.getMonth() + 1 <10? '0'+(date.getMonth()+1) : date.getMonth()+1
  let d = date.getDate()
  return y + '-' + m + '-' + d;
}

function userDetail(userId){
  alert("UserDetail执行"+userId)
}

export default {
  // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function (Vue) {
    Vue.prototype.userDetail = (userId) => userDetail(userId)
    Vue.prototype.formatTime = (date) => formatTime(date)
  }
}


