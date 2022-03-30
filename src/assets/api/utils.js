export function isNullOrEmpty(obj) {
  return obj == null || obj === '' || typeof(obj) === "undefined";
}

export function changeTime(time){
  if(time){
    let oDate = new Date(time),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth()+1,
      oDay = oDate.getDate(),
      oTime = oYear +'-'+ getBz(oMonth) +'-'+ getBz(oDay);//拼接时间
    return oTime;
  }else{
    return "";
  }
}
//补0
function getBz(num){
  if(parseInt(num) < 10){
    num = '0'+num;
  }
  return num;
}

export function dateToTime(time) {
  return time.getTime();
}
