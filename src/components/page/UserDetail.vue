<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 用户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="container">
            <el-row :gutter="20">
              <el-col :span="4" style="margin-top: 2px">{{this.name}}</el-col>
              <el-col :span="4" style="margin-top: 3px">{{this.nickName}}</el-col>
              <el-col :span="4" style="margin-top: 5px">{{this.account}}</el-col>
              <el-col :span="8">
                <span>显示状态：</span>
                <el-select v-model="value" style="width: 100px" @change="saveUpdate">
                  <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                  </el-option>
                </el-select>

              </el-col>
              <el-col :span="4">
                <el-button type="primary">发送消息</el-button>
              </el-col>
            </el-row>

            <div class="myTable">
              <el-form ref="userDetailForm" :model="userDetailForm" label-width="80px" label-position="left">
                <el-row>
                  <el-col :span="6" class="name">序号</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.userId}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >账号创建时间</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.createTime}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >最后活跃时间</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.lastActivityTime}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >用户ID</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.userId}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >性别</el-col>
                  <el-col :span="18" class="value">
                    <el-select v-model="userDetailForm.sex" style="width: 80px">
                      <el-option v-for="item in sexs" :label="item.label" :value="item.label" :key="item.label">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >身高</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.high}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >年龄</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.age}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >所在地</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.location}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >家乡</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.homeTown}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >学校</el-col>

                    <!--<el-form-item label="邀请码:">-->
                     <!-- <el-input v-model="userDetailForm.school" placeholder="没有填写"></el-input>-->
                    <el-col :span="18" class="value">{{userDetailForm.school}}</el-col>
                    <!--</el-form-item>-->
                    <!--<el-select v-model="userDetailForm.school" filterable>-->
                      <!--<el-option v-for="item in schools" :label="item.label" :value="item.value" :key="item.label">-->
                      <!--</el-option>-->
                    <!--</el-select>-->

                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >学院</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.college}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >专业</el-col>
                  <el-col :span="18" class="value">{{userDetailForm.profession}}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >学历</el-col>

                  <!--<el-col :span="18" class="value">{{userDetailForm.education}}</el-col>-->
                  <el-col :span="18" class="value">
                    <el-select v-model="userDetailForm.education" filterable>
                      <el-option v-for="item in edus" :label="item.label" :value="item.value" :key="item.label">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >Vip到期时间</el-col>
                  <el-col :span="18" class="value">
                    <el-date-picker v-model="userDetailForm.vipTime" type="date" placeholder="选择日期" >
                    </el-date-picker>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >账号状态</el-col>
                  <el-col :span="18" class="value">
                    <el-select v-model="userDetailForm.accountStatus" filterable>
                      <el-option v-for="item in accounts" :label="item.label" :value="item.value" :key="item.label">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >用户标签</el-col>
                  <el-col :span="18" class="value">
                    <el-select v-model="userDetailForm.userTag" filterable>
                      <el-option v-for="item in userTags" :label="item.label" :value="item.value" :key="item.label">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="name" >毕业状态</el-col>
                  <el-col :span="18" class="value">
                    <el-select v-model="userDetailForm.graduateStatus" filterable>
                      <el-option v-for="item in graduates" :label="item.label" :value="item.value" :key="item.label">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
               <!-- <el-row>
                  <el-col :span="6" class="name" >备注</el-col>
                  <el-col :span="18" class="value">
                    <el-input type="textarea" v-model="userDetailForm.remarks" style="width: 400px"></el-input>
                  </el-col>
                </el-row>-->
                <el-row>
                  <el-col :span="6" class="name" >Vip充值详情</el-col>
                  <el-col :span="18" class="value">
                    <el-row v-for="item in userDetailForm.vipRechargeDetail" :key="item.time" v-if="showDetailInfo">
                      <el-col :span="12">{{item.time}}</el-col>
                      <el-col :span="12">{{item.type}}</el-col>
                    </el-row>
                    <el-button type="primary" @click="moreDetail" style="margin-top: 5px">详 情</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <!--<el-col :span="6" class="name" >备注</el-col>-->
                  <!--<el-col :span="18" class="value">-->
                    <!--<template slot-scope="scope">-->
                    <el-button type="text" icon="el-icon-edit" @click="handleCertif()">认证详情</el-button>
                    <!--</template>-->
                  <!--</el-col>-->
                </el-row>
              </el-form>
            </div>
            <div slot="footer" style="margin-top: 20px;text-align: center">
                <el-button type="primary" round @click="saveUpdate" class="boxButton">保 存 修 改</el-button>
            </div>
          </div>
        </el-col>


        <!--<el-col :span="12">
          <div class="container">
            <h2>已审核</h2>



            <div v-for="(item,index) in show" :key="index" v-if="edit">
              <el-row v-for="(item1,key,index1) in item" :key="key">
                <h3 style="margin-bottom: 10px;margin-top: 10px">{{key}}</h3>
                <el-col>

                  <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
                    <el-row :gutter="20">
                      <el-col v-if="item1.length==3" :span="8"  :key="index2">
                        <img :src="item2" class="image" v-if="standb">
                        <img :src="item2" class="image" v-if="formal">
                        <el-button v-if="key!='头像'" type="primary" round class="button_select" @click="turnDown(key,item1)">驳回</el-button>
                      </el-col>

                      <el-col v-if="item1.length==2" :span="12" v-for="(item2,index2) in item1" :key="index2">
                        <img :src="item2" class="image">
                        <img :src="item2" class="image">
                        <el-button v-if="key!='头像'" type="primary" round class="button_select" @click="turnDown(key,item1)">驳回</el-button>
                      </el-col>

                      <el-col v-if="item1.length==1" v-for="(item2,index2) in item1" :key="index2">
                        <img :src="iconPortrait" class="image" v-if="key=='头像' && formalIcon">
                        <img :src="item2" class="image" v-if="key=='头像' && standbIcon">
                        <el-button v-if="key=='头像'" type="primary" round class="button_select" @click="turnDown(1)">驳回</el-button>

                        <img :src="studentPortrait" class="image" v-if="key=='学历认证' && formalStudent">
                        <img :src="item2" class="image" v-if="key=='学历认证' && standbStudent">
                        <el-button v-if="key=='学历认证'" type="primary" round class="button_select" @click="turnDown(2)">驳回</el-button>

                        <img :src="credPortrait[0]" class="image" v-if="key=='身份认证' && formalCred">
                        <img :src="item2" class="image" v-if="key=='身份认证' && standbCred">

                        <img :src="credPortrait[1]" class="image" v-if="key=='身份认证' && formalCred">
                        <img :src="item2" class="image" v-if="key=='身份认证' && standbCred">

                        <el-button v-if="key=='身份认证'" type="primary" round class="button_select" @click="turnDown(3)">驳回</el-button>
                      </el-col>

                    </el-row>
                  </el-card>

                </el-col>
              </el-row>
            </div>

          </div>

        </el-col>-->
        <el-col :span="12">
          <div class="container" v-if="edit">
            <h2>已审核</h2>

              <el-row >
                <el-col>
                  <h3 style="margin-bottom: 10px;margin-top: 10px">头像</h3>
                  <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
                        <img :src="picture" class="image" >
                        <el-button  type="primary" round class="button_select" @click="turnDown(1)">驳回</el-button>
                  </el-card>
                      </el-col>
              </el-row>

              <el-row >
                <el-col>
                  <h3 style="margin-bottom: 10px;margin-top: 10px">身份认证</h3>
                  <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
                    <img :src="idCardFrontPhoto" class="image" >
                    <img :src="idCardReversePhoto" class="image" >

                    <el-button  type="primary" round class="button_select" @click="turnDown(2)">驳回</el-button>
                  </el-card>
                </el-col>
              </el-row>

              <el-row >
                <el-col>
                  <h3 style="margin-bottom: 10px;margin-top: 10px">学历认证</h3>
                  <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
                    <img :src="studentIDPhoto" class="image" >
                    <el-button  type="primary" round class="button_select" @click="turnDown(3)">驳回</el-button>
                  </el-card>
                </el-col>
              </el-row>



          </div>

        </el-col>

      </el-row>


      <!-- 驳回提示框 -->
      <el-dialog title="驳回" :visible.sync="turnDownVisible" width="300px" center>
        <div class="del-dialog-cnt">你确定要驳回吗？</div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="turnDownVisible = false">我再想想</el-button>
                <el-button type="primary" @click="turnDownSure">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import {updateUser, userIntroduce,getAddressList,getSchoolList,credAllow,iconRefuse,getEduList} from "../../assets/api/global_request";
  import {timestamp2DateString, timestamp2DateString_} from "../../assets/api/date";
    export default {
      name: "UserDetail",
      data(){
        return{
          //url1:require("@/assets/logo.png"),
          //url1:"../../assets/logo.png",
          // https://lb-xuehou-test.oss-cn-hangzhou.aliyuncs.com/cred9839xiehou35654df2e71f44daa0cbb348810b3353.jpeg"
          picture:"",
          studentIDPhoto:"",
          idCardFrontPhoto:"",
          idCardReversePhoto:"",
          show:[
            {"头像":[require("@/assets/logo.png")]},
            {"身份认证":[require("@/assets/logo.png")]},
            {"学历认证":[require("@/assets/logo.png")]}
          ],
          name:"",
          nickName:"",
          edit:false,
         /* formalStudent:false,
          standbStudent:false,
          standbIcon:false,
          formalIcon:false,
          formalCred:false,
          standbCred:false,*/
          userIcon:"",
          account:"",
          turnDownVisible:false,
          value:"屏蔽",
          auditType:"",
          showDetailInfo:false,
          userDetailForm:{
            serialNum:"1",
            createTime:"",
            lastActivityTime:"",
            userId:"60001",
            sex:1,
            high:175,
            age:25,
            location:"",
            homeTown:"",
            school:"",
            college:"无",
            profession:"",
            education:"",
            vipTime:'',
            accountStatus:"正常",
            userTag:"无",
            graduateStatus:"学生",
           /* remarks:"该用户曾被举报",*/
            studentPortrait:"",
            iconPortrait:"",
            credPortrait:"",
            vipRechargeDetail:[
              {
                time:"充值时间：2018/10/01/19:00",
                type:"月卡"
              },
              {
                time:"充值时间：2018/10/01/19:00",
                type:"年卡"
              },
              {
                time:"充值时间：2018/10/01/19:00",
                type:"季卡"
              },
              {
                time:"充值时间：2018/10/01/19:00",
                type:"月卡"
              },
            ]
          },
          graduates:[
            {
              label:"学生",
              value:"学生"
            },
            {
              label:"已毕业",
              value:"已毕业"
            },
          ],
          userTags:[
            {
              label:"无",
              value:"无"
            },
            {
              label:"颜值在线(优质用户)",
              value:"颜值在线(优质用户)"
            },
            {
              label:"颜值低，照片不认证",
              value:"颜值低，照片不认证"
            },
          ],
          accounts:[
            {
              label:"正常",
              value:"正常"
            },
            {
              label:"冻结中",
              value:"冻结中"
            },
            {
              label:"已注销",
              value:"已注销"
            },
          ],
          edus:[
            {
              label:"专科",
              value:"1"
            },
            {
              label:"本科",
              value:"2"
            },
            {
              label:"硕士",
              value:"3"
            },
            {
              label:"博士",
              value:"4"
            },
          ],
          schools:[
            {
              label:"清华大学",
              value:"清华大学"
            },
            {
              label:"北京大学",
              value:"北京大学"
            },
            {
              label:"杭州电子科技大学",
              value:"杭州电子科技大学"
            },
          ],
          sexs:[
            {
              label:"男",
              value:0,
            },
            {
              label:"女",
              value:1,
            }
          ],
          options:[
            {
              label:"屏蔽",
              value:"屏蔽"
            },
            {
              label:"显示",
              value:"显示"
            },
          ],
          turnDownMsg:{},
        }
      },

      mounted(){
        this.getRouterData();
      },
      /*beforeUpdate(){
        this.getRouterData();
      },*/

      methods:{
        getRouterData(){
         // let userId=this.$route.query.userId;
         // console.log(userId);
          var newDistrictProvinceId;
          var newDistrictCityId;
          var newDistrictId;
          var oldDistrictProvinceId;
          var oldDistrictCityId;
          var oldDistrictId;
          var schoolId;
          var eduId;
          this.userDetailForm.userId =this.$route.query.userId;
          let obj =this;
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");

          userIntroduce(adminId,token,this.userDetailForm.userId)
            .then(function (data) {
              console.log(data);
              let vipuptime;
              obj.name =data.result.name;
              obj.nickName =data.result.nickName;
              obj.account = data.result.account;
              if(data.result.show ==0)
                obj.value ='屏蔽';
              else
                obj.value ='显示';
              if (data.result.sex==0)
                obj.userDetailForm.sex = '男';
              else
                obj.userDetailForm.sex ='女';

              obj.userDetailForm.height = data.result.height;
              obj.userDetailForm.age    = data.result.age;

              if(data.result.newDistrictId!=null) {

                newDistrictProvinceId = data.result.newDistrictProvinceId;
                newDistrictCityId=data.result.newDistrictCityId;
                newDistrictId=data.result.newDistrictId;
                //console.log( newDistrictProvinceId+"--"+ newDistrictCityId+"--"+newDistrictId)
              }

              if(data.result.oldDistrictId!=null){
                //obj.userDetailForm.homeTown = data.result.oldDistrictProvinceId + data.result.oldDistrictCityId + data.result.oldDistrictId;
                oldDistrictProvinceId = data.result.oldDistrictProvinceId;
                oldDistrictCityId=data.result.oldDistrictCityId;
                oldDistrictId=data.result.oldDistrictId;
              }
            /*  if(data.result.tip!=null){
                obj.userDetailForm.remarks = data.result.tip
              }
*/            console.log("exit---"+data.result.exit);
              if(data.result.exit==0){
                obj.userDetailForm.accountStatus = '正常'

              }
              else if(data.result.exit==1){
                obj.userDetailForm.accountStatus ='冻结中';

              }
              else {

                obj.userDetailForm.accountStatus = '已注销';
              }

              if(data.result.school!=null)
                //obj.userDetailForm.school = data.result.school;
                schoolId=data.result.school;
              if(data.result.major!=null)
                obj.userDetailForm.profession = data.result.major

              if(data.result.vipTime!=null) {
                obj.userDetailForm.vipTime = data.result.vipTime.toString()

              }

            /*  if (data.result.exit==0)
                obj.userDetailForm.accountStatus = "正常"
              else
                obj.userDetailForm.accountStatus = "已注销"*/

              if(data.result.graduate==0)
                obj.userDetailForm.graduateStatus ="学生"
              else
                obj.userDetailForm.graduateStatus ="已毕业"

              eduId = data.result.edu;
              obj.userDetailForm.createTime = timestamp2DateString_(data.result.createTime);
              console.log(data);
              /*console.log(obj.userDetailForm.vipTime);*/
              obj.picture=data.result.picture;
              obj.studentIDPhoto=data.result.studentIDPhoto;
              obj.idCardReversePhoto=data.result.idCardReversePhoto;
              obj.idCardFrontPhoto=data.result.idCardFrontPhoto;
              obj.userDetailForm.lastActivityTime= timestamp2DateString_(data.result.lastOnlineTime);
              console.log(obj.lastActivityTime);
            });


          getAddressList(token,adminId,this.userDetailForm.userId)
            .then(function (data) {
             var len=data.result.length;
             var nProvince;
             var nCity;
             var nDistrict="";

              var province;
              var city;
              var district;

             for(let i=0;i<len;++i){
               if(data.result[i].id==newDistrictProvinceId){
                 nProvince=data.result[i].name;
               }
               if(data.result[i].id==newDistrictCityId){
                 nCity=data.result[i].name;
               }
               if(data.result[i].id==newDistrictId){
                 nDistrict=data.result[i].name;
               }

               if(data.result[i].id==oldDistrictProvinceId){
                 province=data.result[i].name;
               }
               if(data.result[i].id==oldDistrictCityId){
                 city=data.result[i].name;
               }
               if(data.result[i].id==oldDistrictId){

                 district=data.result[i].name;
               }

               if(newDistrictProvinceId==0){
                 nProvince="";
               }
               if(newDistrictCityId==0){
                 nCity="";
               }
               if(newDistrictId==0){
                 nDistrict="";
               }

               if(oldDistrictProvinceId==0){
                 province="";
               }
               if(oldDistrictCityId==0){
                 city="";
               }
               if(oldDistrictId==0){
                 district="";
               }

             }
             obj.userDetailForm.location=nProvince+nCity+nDistrict;
              obj.userDetailForm.homeTown=province+city+district;

             //console.log(obj.userDetailForm.location);

            });

          getSchoolList(token,adminId,this.userDetailForm.userId)
            .then(function (data) {

              var len=data.result.length;

              for(let i=0;i<len;++i){
                if(data.result[i].cId==schoolId){

                  obj.userDetailForm.school=data.result[i].cName;
                }


              }
              //console.log(obj.userDetailForm.location);

            });
          getEduList(token,adminId,this.userDetailForm.userId)
            .then(function (data) {

              var len=data.result.length;

              for(let i=0;i<len;++i){
                if(data.result[i].id==eduId){

                  obj.userDetailForm.education=data.result[i].education;
                }


              }
              //console.log(obj.userDetailForm.location);

            });



          /*  getPicture(this.userDetailForm.userId)
               .then(function (data) {
                 // obj.studentPortrait = data.pictureStudent

                 console.log(data)
                 if (data.pictureStudent!="" && data.pictureStudentStatus ==1 ) {
                   obj.studentPortrait = data.pictureStudent
                   obj.formalStudent =true;
                   obj.standbStudent =false;
                 }
                 else {
                   obj.formalStudent =false;
                   obj.standbStudent =true;
                 }

                 if (data.pictureIcon!="" && data.pictureIconStatus==1) {
                   obj.iconPortrait = data.pictureIcon;
                   obj.userIcon = data.iconId;
                   obj.formalIcon =true;
                   obj.standbIcon =false;
                 }
                 else {
                   obj.formalIcon =false;
                   obj.standbIcon =true;
                 }

                 if(data.pictureCred!="" && data.pictureCredStatus==1){
                   obj.credPortrait = data.pictureCred.split(';');
                   console.log(obj.credPortrait)
                   obj.formalCred =true;
                   obj.standbCred =false;
                 }
                 else {
                   obj.formalCred =false;
                   obj.standbCred =true;

                 }


               });*/




        },


        handleCertif(){

          this.edit = !this.edit


        },
        //保存修改
        saveUpdate(){
          let obj =this;
          var shType;
          var seType;
          var viptime='';
          var graduateType;
          var exitType;
          var edu;
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");
          if (this.value =='显示') {
            shType =1
          }
          else {
            shType = 0
          }

          console.log("性别---"+this.userDetailForm.sex);
          if(this.userDetailForm.sex =='女'){
            seType = 1;
          }
          else {
            seType = 0;

          }
          if (this.userDetailForm.vipTime=='')
            viptime = '';
          else {
            viptime =  timestamp2DateString_(obj.userDetailForm.vipTime)
            //console.log(viptime);

          }




          if (this.userDetailForm.accountStatus=='正常'){
            exitType =0
          }
          else if(this.userDetailForm.accountStatus=='冻结中'){
            exitType=1
          }else{
            exitType=2
          }


          if (this.userDetailForm.graduateStatus=='学生'){
            graduateType =0
          }
          else {
            graduateType =1
          }

          if (this.userDetailForm.education==1){
            edu=1;
            console.log("edu--");
          }
          else if(this.userDetailForm.education==2){
            edu=2;
          }
          else if(this.userDetailForm.education==3){
            edu=3;
          }else{
            edu=4;
          }


          /* console.log(shType)
           console.log(seType)
           console.log(viptime)*/
          updateUser(token,adminId,this.userDetailForm.userId,seType,edu,viptime,shType,graduateType,exitType)
            .then(function (data){
             // console.log("updateTest---"+data)


              obj.getRouterData(obj.userDetailForm.userId)
              obj.$message.success('保存成功');
            })


           /* .catch(function (data) {
            obj.$message.error('保存失败');
          })*/
        },

        //驳回操作
        turnDown(auditTypeg){
          this.auditType = auditTypeg;
          // this.turnDownMsg.key = key;
          // this.turnDownMsg.listImg = listImg;
          this.turnDownVisible = true;
        },
        //驳回确认
        turnDownSure(){
          let obj = this;
          // var key = this.turnDownMsg.key
          // var listImg = this.turnDownMsg.listImg
          // console.log(key)
          // console.log(JSON.stringify(listImg))
          // this.turnDownVisible = false
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");



          if (this.auditType=='1'){
            iconRefuse(token,adminId,2,this.userDetailForm.userId)
              .then(function (data) {


                obj.getRouterData(obj.userDetailForm.userId)
              });
          }

          if (this.auditType=='2') {
            credAllow(token,adminId,2,this.userDetailForm.userId,1)
              .then(function (data) {

                obj.getRouterData(obj.userDetailForm.userId)
              });
          }
          if (this.auditType=='3')
          {
            credAllow(token,adminId,2,this.userDetailForm.userId,2)
              .then(function (data) {

                obj.getRouterData(obj.userDetailForm.userId)
              });
          }

          this.turnDownVisible = false;
        },
        //详情显示
        moreDetail(){
          this.showDetailInfo = !this.showDetailInfo;
        }

      },
      beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        /!*console.log(from);*!/
        //from.meta.keepAlive = false; // 让 A 不缓存，即刷新*!/
        //this.$destroy();
        to.meta.keepAlive = false;
        next();
      },
      /*watch: {
        '$route': 'getRouterData'
      },*/
    }
</script>

<style scoped>
  .container{
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .myTable{
    margin-top: 20px;
    border:1px solid #cccccc;
    border-radius: 5px;
  }
  .myTable .el-row{
    border-bottom: 1px solid #cccccc;
    padding: 5px
  }
  .myTable .name{
    text-align: center
  }
  .myTable .value{
    text-align: center;
    border-left:1px solid #cccccc;
  }
  .boxButton{
    width: 180px;
    height: 50px;
    font-size:20px;
  }
  .image{
    margin-left:50%;
    transform: translate(-50%,0%);
    width: 350px;
    height: 350px;
  }
  .button_select{
    margin: 10px 0 10px 0;
    margin-left:50%;
    transform: translate(-50%,0%);
    width: 180px;
    height: 50px;
    font-size:20px;
  }
  .radioSelect{
    margin: 10px 0 10px 0;
    margin-left:50%;
    transform: translate(-50%,0%);
  }
</style>
