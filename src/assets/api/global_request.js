import global_url from "./global_url";
import axios from './base'
import qs from 'qs'
import {isNullOrEmpty} from "./utils";

export function login(account, password){
  return axios.post(global_url.URL_LOGIN, {"token":null,
    "adminId":null,
    "params":{
      "account":account,
      "password":password
    }})

    .then(data => data.data)
    .catch()

}

export function getCertificatePortrait(token,adminId,auditFlag, pageIndex, pageSize ) {
  return axios.post(global_url.URL_CERTIFICATE_PORTRAIT, /*{passStatus:auditFlag, pageNum:pageIndex, pageSize:pageSize}*/
    {
      "token":token,
      "adminId":adminId,
      "params": {
        "passStatus":auditFlag,
        "pageNum":pageIndex,
        "pageSize":pageSize
      }}
  )
    .then(data => data.data);
}

export function getCertificateHouse(auditFlag, pageIndex, pageSize ) {
  return axios.post(global_url.URL_CERTIFICATE_HOUSE,
    {
      "params": {
        "auditStatus":auditFlag,
        "pageNum":pageIndex,
        "pageSize":pageSize
      }}
  )
    .then(data => data.data);
}

export function getCertificateVehicle(auditFlag, pageIndex, pageSize ) {
  return axios.post(global_url.URL_CERTIFICATE_VEHICLE,
    {
      "params": {
        "auditStatus":auditFlag,
        "pageNum":pageIndex,
        "pageSize":pageSize
      }}
  )
    .then(data => data.data);
}


export function getCertificateCredentials(token,adminId,auditFlag, pageIndex, pageSize ) {
  return axios.post(global_url.URL_CERTIFICATE_CREDENTIALS, /*{passStatus:auditFlag, pageNum:pageIndex, pageSize:pageSize}*/
    {
      "token":token,
      "adminId":adminId,
      "params": {
        "passStatus":auditFlag,
        "pageNum":pageIndex,
        "pageSize":pageSize
      }}
  )
    .then(data => data.data);
}

export function getCertificateIdCard(auditFlag, pageIndex, pageSize) {
  return axios.post(global_url.URL_CERTIFICATE_ID_CARD, {auditFlag:auditFlag, pageIndex:pageIndex, pageSize:pageSize})
    .then(data => data.data);
}

export function getCertificateEdu(auditFlag, pageIndex, pageSize) {
  return axios.post(global_url.URL_CERTIFICATE_EDU, {auditFlag:auditFlag, pageIndex:pageIndex, pageSize:pageSize})
    .then(data => data.data);
}

/*举报审核待完成*/
export function getReport(auditFlag, pageIndex, pageSize) {
  return axios.post(global_url.URL_REPORT, /*{auditFlag:auditFlag, pageIndex:pageIndex, pageSize:pageSize}*/
    {
      "params": {
        "passStatus":auditFlag,
        "pageNum":pageIndex,
        "pageSize":pageSize
      }}
  )
    .then(data => data.data);
}

export function updateReportState(tipId, status) {
  return axios.post(global_url.URL_CHANGE_REPORT_STATE, {tipId:tipId, status:status})
    .then(data => data.data);
}

/*
export function getVipList() {
  return axios.post(global_url.URL_VIP_TYPE_LIST, {})
    .then(data => data.data);
}
*/

export function inventCode(codeId, startTime, endTime) {
  return axios.post(global_url.URL_INVENT_CODE, {codeId:codeId, startTime:startTime, endTime:endTime})
    .then(data => data.data);
}

export function addCode(token,adminId,code,password) {
  return axios.post(global_url.URL_ADD_CODE,
    {
      "token":token,
      "adminId":adminId,
      "params": {
        "code":code,
        "password":password
      }}
    )
    .then(data => data.data)
}

export function deleteCode(token,adminId,id) {
  return axios.post(global_url.URL_DELETE_CODE,
    {
      "token":token,
      "adminId":adminId,
      "params": {
        "id":id

      }}
    )
    .then(data=>data.data)
}

/*export function queryUser(token,adminId,nickName,name,userId,pageNum,pageSize) {
  return axios.post(global_url.URL_QUERY_USER,
    {
      "token":token,
      "adminId":adminId,
      "params": {
        "nickName":nickName,
        "name":name,
        "userId":userId,
        "pageNum":pageNum,
        "pageSize":pageSize

      }}
  )
    .then(data => data.data)
}*/

export function queryUserById(token,adminId,userId,pageNum,pageSize) {
  return axios.post(global_url.URL_QUERY_USER,
    {
      "token":token,
      "adminId":adminId,
      "params": {
        "userId":userId,
        "pageNum":pageNum,
        "pageSize":pageSize

      }}
  )
    .then(data => data.data)
}
export function queryUserByName(token,adminId,name,pageNum,pageSize) {
  return axios.post(global_url.URL_QUERY_USER,
    {
      "token":token,
      "adminId":adminId,
      "params": {

        "name":name,

        "pageNum":pageNum,
        "pageSize":pageSize

      }}
  )
    .then(data => data.data)
}

export function queryUserByNickName(token,adminId,nickName,pageNum,pageSize) {
  return axios.post(global_url.URL_QUERY_USER,
    {
      "token":token,
      "adminId":adminId,
      "params": {
        "nickName":nickName,
        "pageNum":pageNum,
        "pageSize":pageSize

      }}
  )
    .then(data => data.data)
}
export function queryUserByAccount(token,adminId,account,pageNum,pageSize) {
  return axios.post(global_url.URL_QUERY_USER,
    {
      "token":token,
      "adminId":adminId,
      "params": {
       "account":account,
        "pageNum":pageNum,
        "pageSize":pageSize

      }}
  )
    .then(data => data.data)
}

export function screenUser(sex,show,exit,graduate,heightFrom,heightTo,createTimeFrom,createTimeTo,size,index) {
  return axios.post(global_url.URL_SCREEN_USER,{sex:sex,show:show,exit:exit,graduate:graduate,heightFrom:heightFrom,heightTo:heightTo,createTimeFrom:createTimeFrom,createTimeTo:createTimeTo,size:size,index:index})
    .then(data=>data.data)
}

export function showQueen(sex,index) {
  return axios.post(global_url.URL_ACTIVE_QUEEN,{sex:sex,index:index})
    .then(data =>data.data)
}

export function iconAllow(iconId) {
  return axios.post(global_url.URL_ICON_ALLOW,{iconId:iconId})
    .then(data =>data.data)
}

export function iconRefuse(token,adminId,passStatus,userId) {
  return axios.post(global_url.URL_ICON_REFUSE,
    {
      "token":token,
      "adminId":adminId,
      params:{
        "userId":userId,
        "passStatus":passStatus
      }
    }
    )
    .then(data =>data.data)
}

export function iconState(token,adminId,userId,passStatus) {
  return axios.post(global_url.URL_ICON_STATE,
    {
      "token":token,
      "adminId":adminId,
      params:{
        "userId":userId,
        "passStatus":passStatus
      }
    })
    .then(data =>data.data)

}

export function houseState(pkId,auditStatus) {
  return axios.post(global_url.URL_HOUSE_STATE,
    {
      params:{
        "pkId":pkId,
        "auditStatus":auditStatus
      }
    })
    .then(data =>data.data)

}

export function vehicleState(pkId,auditStatus,licensePlate,brand) {
  return axios.post(global_url.URL_VEHICLE_STATE,
    {
      params:{
        "pkId":pkId,
        "auditStatus":auditStatus,
        "licensePlate":licensePlate,
        "brand":brand
      }
    })
    .then(data =>data.data)

}
export function vehicleStateReject(pkId,auditStatus,licensePlate) {
  return axios.post(global_url.URL_VEHICLE_STATE,
    {
      params:{
        "pkId":pkId,
        "auditStatus":auditStatus,
        "licensePlate":licensePlate,

      }
    })
    .then(data =>data.data)

}

export function credAllow(token,adminId,passStatus,userId,type) {
  return axios.post(global_url.URL_CRED_ALLOW,
    {
      "token":token,
      "adminId":adminId,
      params:{
        "userId":userId,
        "passStatus":passStatus,
        "type":type
      }
    })
    .then(data =>data.data)
}

export function credRefuse(userId) {
  return axios.post(global_url.URL_CRED_REFUSE,{userId:userId})
    .then(data =>data.data)
}

export function credState(userId,state) {
  return axios.post(global_url.URL_CRED_STATE,{userId:userId,state:state})
    .then(data =>data.data)

}

export  function studentAllow(userId) {
  return axios.post(global_url.URL_STUDENT_ALLOW,{userId:userId})
    .then(data =>data.data)
}

export function studentRefuse(userId) {
  return axios.post(global_url.URL_STUDENT_REFUSE,{userId:userId})
    .then(data =>data.data)
}

export function studentState(userId,state) {
  return axios.post(global_url.URL_STUDENT_STATE,{userId:userId,state:state})
    .then(data =>data.data)
}
export function getDistrictDate() {
  return axios.post(global_url.URL_STATIC_DISTRICT,{})
    .then(data =>data.data)
}
export function submitStaticLogin(startTime, endTime) {
  return axios.post(global_url.URL_STATIC_LOGIN,{startTime:startTime, endTime:endTime})
    .then(data =>data.data)
}

export function getStaticSex() {
  return axios.post(global_url.URL_STATIC_SEX,{})
    .then(data =>data.data)
}

export function getStaticSchool() {
  return axios.post(global_url.URL_STATIC_SCHOOL,{})
    .then(data =>data.data)
}

export function singleSave(token,adminId,id,password) {
  return axios.post(global_url.URL_CODE_SAVE,
    {
      "token":token,
      "adminId":adminId,
      params:{
        "id":id,
        "password":password
      }
    })
    .then(data =>data.data)
}

export function userRespond(pageIndex,pageSize) {
  return axios.post(global_url.URL_USER_RESPOND,{pageIndex:pageIndex,pageSize:pageSize})
    .then(data =>data.data)
}

export function allSave(num,message) {
  return axios.post(global_url.URL_ALL_SAVE,{num:num,message:message})
    .then(data =>data.data)
}

export function userIntroduce(adminId,token,userId) {
  return axios.post(global_url.URL_USER_INTRODUCE,{
    "params": {
      "userId":userId
    }})
    .then(data =>data.data)
}



export function updateUser(token,adminId,userId,sex,edu,vipTime,show,graduate,exit) {

  return axios.post(global_url.URL_UPDATE_USER,/*{userId:userId,sex:sex,vipTime:vipTime,show:show,graduate:graduate,tip:tip,exit:exit}*/
    {"token":token,
    "adminId":adminId,
    "params": {
      "id":userId,
      "sex":sex,
      "edu":edu,
      "vipTime":vipTime,
      "show":show,
      "graduate":graduate,
      "exit":exit
  }}
  )
    .then(data =>data.data)
}

export function getPicture(userId) {

  return axios.post(global_url.URL_GET_PICTURE,{userId:userId})
    .then(data =>data.data)
}

export function updatePrice(vipId,price,name,day,status) {

  return axios.post(global_url.UEL_VIP_UPDATE,{vipId:vipId,price:price,name:name,day:day,status:status})
    .then(data =>data.data)
}

export function getNewUser(startTime,endTime) {

  return axios.post(global_url.URL_STATIC_USERNEW,{startTime:startTime,endTime:endTime})
    .then(data =>data.data)
}

export function getCodeStatic(token,adminId,startTime,endTime) {
  return axios.post(global_url.URL_CODE_STATIC, {
    "token":token,
    "adminId":adminId,
    "params": {
      "startTime":startTime,
      "endTime":endTime
    }})
    .then(data =>data.data)
}

export function getAddressList(token,adminId,userId) {
  return axios.post(global_url.URL_STATIC_CITY,{
    "token":token,
    "adminId":adminId,
    "params": {
      "userId":userId
    }})
    .then(data =>data.data)
}
export function getSchoolList(token,adminId,userId) {
  return axios.post(global_url.URL_STATIC_SCHOOL,{
    "token":token,
    "adminId":adminId,
    "params": {
      "userId":userId
    }})
    .then(data =>data.data)
}
export function getEduList(token,adminId,userId) {
  return axios.post(global_url.URL_STATIC_EDUCATION,{
    "token":token,
    "adminId":adminId,
    "params": {
      "userId":userId
    }})
    .then(data =>data.data)
}

function createJSONBody(json){
  let token = localStorage.getItem("adminToken");
  let adminId = localStorage.getItem("adminId");
  let body = {};
  if(token != null && adminId != null){
    body['token'] = token;
    body['adminId'] = adminId;
  }
  body['params'] = json;
  return body;
}

export function getOssForActivity(type) {
  return axios.post(global_url.URL_CONFIG_OSS,{
    "params": {
      "type":type
    }})
    .then(data =>data.data)
}
export function addActivity(eventName,activityListDisplay,activityHomePopup,activityLink,activeStatus,isShowList,isShowHome,popUpDeadline) {
  return axios.post(global_url.URL_ADD_ACTIVITY,{
    "params": {
      "eventName":eventName,
      "activityListDisplay":activityListDisplay,
      "activityHomePopup":activityHomePopup,
      "activityLink":activityLink,
      "activeStatus":activeStatus,
      "isShowList":isShowList,
      "isShowHome":isShowHome,
      "popUpDeadline":popUpDeadline
    }})
    .then(data =>data.data)
}
export function deleteActivity(pkId,eventName,activityListDisplay,activityHomePopup,activityLink,activeStatus,isShowList,isShowHome,popUpDeadline,gmtCreate,gmtModified) {
  return axios.post(global_url.URL_DELETE_ACTIVITY,{
    "params": {
      "pkId": pkId,
      "eventName":eventName,
      "activityListDisplay":activityListDisplay,
      "activityLink":activityLink,
      "activityHomePopup":activityHomePopup,
      "activeStatus":activeStatus,
      "isShowList":isShowList,
      "isShowHome":isShowHome,
      "popUpDeadline":popUpDeadline,
      "gmtCreate":gmtCreate,
      "gmtModified":gmtModified
    }})
    .then(data =>data.data)
}

export function getActivity() {
  return axios.post(global_url.URL_GET_ACTIVITY,{
    "params": {

    }})
    .then(data =>data.data)
}
export function updateActivity(pkId,eventName,activityListDisplay,activityHomePopup,activityLink,activeStatus,isShowList,isShowHome,popUpDeadline,gmtCreate,gmtModified) {
  return axios.post(global_url.URL_UPDATE_ACTIVITY,{
    "params": {
      "pkId": pkId,
      "eventName":eventName,
      "activityListDisplay":activityListDisplay,
      "activityLink":activityLink,
      "activityHomePopup":activityHomePopup,
      "activeStatus":activeStatus,
      "isShowList":isShowList,
      "isShowHome":isShowHome,
      "popUpDeadline":popUpDeadline,
      "state":"A",
      "gmtCreate":gmtCreate,
      "gmtModified":gmtModified

    }})
    .then(data =>data.data)
}

export function getVipList(param) { /*获取vip类型集合*/
  return axios.post(global_url.URL_VIP_TYPE_LIST, createJSONBody(param))
    .then(data => data.data); //这一步表示返回的是对象里面的data,获取的时候少一步操作
}
export function addVip(param) { /*添加vip信息*/
  return axios.post(global_url.URL_VIP_ADD,createJSONBody(param))
    .then(data=>data.data);
}
export function updateVip(param) { /*修改vip信息*/
  return axios.post(global_url.URL_VIP_UPDATE,createJSONBody(param))
    .then(data=>data.data);
}
export function getConfigList(param) { /*获取配置信息*/
  return axios.post(global_url.URL_CONFIG_GET,createJSONBody(param))
    .then(data=>data.data);
}
export function updateConfig(param) { /*更新配置信息*/
  return axios.post(global_url.URL_CONFIG_UPDATE,createJSONBody(param))
    .then(data=>data.data);
}

export function getOssToken(param) { /*文件上传获取oss的token*/
  return axios.post(global_url.URL_CONFIG_OSS,createJSONBody(param))
    .then(data=>data.data);
}
export function getStatisticalData(param) { /*数据统计获取*/
  return axios.post(global_url.URL_STATISTICAL_DATA,createJSONBody(param))
    .then(data=>data.data);
}
export function getSchoolMessage(param) { /*获取学校列表*/
  return axios.post(global_url.URL_GET_SCHOOLLIST,createJSONBody(param))
    .then(data=>data.data);
}
export function getAddressMessage(param) { /*获取地区列表*/
  return axios.post(global_url.URL_GET_ADDRESSLIST,createJSONBody(param))
    .then(data=>data.data);
}


