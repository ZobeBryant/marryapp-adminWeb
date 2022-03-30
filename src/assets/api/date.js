export function timestamp2DateString(timestamp) {
  let d = new Date(timestamp);
  return (d.getFullYear()) + "-" +
    (d.getMonth() + 1) + "-" +
    (d.getDate()) + " " +
    (d.getHours()) + ":" +
    (d.getMinutes()) + ":" +
    (d.getSeconds());
}

export function timestamp2DateString_(timestamp) {
  let d = new Date(timestamp);
  let year=d.getFullYear();
  let month=d.getMonth()+1;
  let day=d.getDate();

  month=month<10?'0'+month:month;
  day=day<10?'0'+day:day;


  return year+"-"+month+"-"+day;
}
