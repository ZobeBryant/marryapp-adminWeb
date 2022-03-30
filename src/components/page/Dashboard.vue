<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 证件审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="container">
          <div class="handle-box">
            <el-row>
              <el-col :span="8">
                <el-button type="primary">审核条件</el-button>
                <el-select v-model="select_review" @change="selectReview" class="handle-select mr10">
                  <el-option v-for="item in review" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-col>

            </el-row>
          </div>

          <el-table :data="tableData" border style="font-size: 14px;">
            <el-table-column prop="date" label="日期" sortable width="150"></el-table-column>
            <el-table-column prop="id" show-overflow-tooltip label="用户ID" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDetail(scope.$index,scope.row)">{{scope.row.id}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="account" show-overflow-tooltip label="账号" width="150">
            </el-table-column>
            <el-table-column prop="name" show-overflow-tooltip label="姓名" width="150"></el-table-column>
            <el-table-column prop="nickName" show-overflow-tooltip label="昵称" width="150"></el-table-column>
            <el-table-column prop="sex" label="性别" width="100"></el-table-column>
            <!--<el-table-column prop="certificate" label="待认证项" width="200"></el-table-column>-->
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleCertificate(scope.$index, scope.row)">认证详情</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="page.pageSize" :total="page.pageTotal" :current-page="page.pageCurrent">
            </el-pagination>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="container" v-if="edit3">

        <div class="container" v-if="edit">


          <el-row >
            <h2 style="margin-bottom: 10px;margin-top: 10px">学历认证</h2>
            <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
              <el-col :span="24">
                <img :src="form.studentIDPhoto" class="image">
              </el-col>
              <el-col :span="20" :offset="2">
                <el-table :data="tableDataGra" :border="true" :show-header="false" class="table">
                  <el-table-column prop="graduate"  width="150"></el-table-column>
                  <el-table-column prop="ok"  width="350"></el-table-column>
                </el-table>
              </el-col>
              <el-radio-group v-model="radio3" class="radioSelect" v-if="show">
                <el-radio  label="1" @change="handle(3)">通过</el-radio>
                <el-radio  label="2" @change="handle(4)">驳回</el-radio>

              </el-radio-group>
            </el-card>
          </el-row>
        </div>
        <div class="container" v-if="edit1">
          <el-row >
            <h2 style="margin-bottom: 10px;margin-top: 10px">身份认证</h2>
            <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
              <el-col :span="24">
                <img :src="form.idCardFrontPhoto" class="image">
              </el-col>
              <el-col :span="24">
                <img :src="form.idCardReversePhoto" class="image">
              </el-col>
              <el-radio-group v-model="radio2" class="radioSelect" v-if="show">
                <el-radio  label="1" @change="handle(1)">通过</el-radio>
                <el-radio  label="2" @change="handle(2)">驳回</el-radio>
              </el-radio-group>
            </el-card>
          </el-row>
        </div>

          <div class="container" v-if="edit2&&show" >
            <el-row >

              <el-card :body-style="{ padding: '0px',marginTop:'10px'}">

                <el-radio-group v-model="radio2" class="radioSelect" >
                  <el-button type="primary" round class="box_button" @click="handle(5)">提交</el-button>

                </el-radio-group>

              </el-card>
            </el-row>


          </div>

        </div>
      </el-col>




    </el-row>

  </div>

</template>

<script>
  import ax from 'axios';
  import {getSchoolList, getEduList, getCertificateCredentials,iconAllow,iconRefuse,credAllow,credRefuse,studentAllow,studentRefuse,userIntroduce,iconState,studentState} from "../../assets/api/global_request";
  import {timestamp2DateString, timestamp2DateString_} from "../../assets/api/date";
  export default{
    name:'dashboard',

    data(){
      return {
        show:true,
        showHeader:false,
        review:[
          {
            value:0,
            label:'待审核'
          },
          {
            value:1,
            label:'已通过'
          },
          {
            value:2,
            label:'未通过'
          }
        ],
        select_review:0,
        certificates:[
          {
            value:'请选择',
            label:'请选择'
          },
          {
            value:'头像',
            label:'头像'
          },
          {
            value:'身份证',
            label:'身份证'
          },
          {
            value:'学生证',
            label:'学生证'
          }
        ],
        select_certificate:'请选择',
       /* url:'/static/vuetable.json',*/
        tableData: [],
        tableDataGra:[
          {
            graduate:'学历',
            ok:'无'
          },
          {
            graduate:'学校',
            ok:'无'
          },
          {
            graduate:'是否毕业',
            ok:'无'
          },
          {
            graduate:'专业',
            ok:'无'
          },

        ],
        form: {
          date: '',
          id:'',
          account:'',
          name: '',
          nickName:'',
          sex:'',
          certificate:''
        },
        eduState:3,
        idState:1,
        idx: -1,
        radio1:1,
        radio2:"1",
        radio3:"1",
        edit:false,
        edit1:false,
        edit2:false,
        edit3:false,
        page:{
          pageSize:20,
          pageTotal:0,
          pageCurrent:1,
        }
      }
    },

    created(){

      this.requestCertificate();


    },


    computed:{

    },

    methods:{

      // 分页导航
      handleCurrentChange(val) {
        this.page.pageCurrent = val;
        this.requestCertificate();
        console.log("当前页码："+val)
        //this.getData();
      },

      routerTo(id){
        this.$router.push({
          name:'UserDetail',
          params:{
            userId : id
          }
        })
      },

      // 获取数据
      getData() {
       /* ax.get(this.url).then((res)=>{
          console.log(res.data.list);
          this.tableData = res.data.list;
        })*/
        /*this.$axios.post(this.url, {
          page: this.cur_page
        }).then((res) => {
          this.tableData = res.data.list;
        })*/
      },

      handleCertificate(index,row) {
        //console.log("test----"+index);
       /* let graud =null
        let schoolna =""*/
       // console.log("handCertificate");
        let token=localStorage.getItem("adminToken");
        let adminId=localStorage.getItem("adminId");
        let obj = this;
        let schoolId;
        let eduId;
        const item1 = this.tableData[index];
        if(item1.studentIDPhoto!=null){
          this.edit=true;
        }else{
          this.edit=false;
        }
       // console.log(this.edit);
        if(item1.idCardFrontPhoto&&item1.idCardReversePhoto!=null){
          this.edit1=true;
        }else{
          this.edit1=false;
        }
       // console.log(this.edit1);
        if(this.edit||this.edit1){
          this.edit2=true;
        }else{
          this.edit2=false;
        }
        //console.log(this.edit2);
        if (this.idx === index) {
          this.edit3 = !this.edit3
        } else {
          this.edit3 = true
        }
        //console.log(this.edit3);
        if (this.edit) {
          this.idx = index;
          const item = this.tableData[index];

          this.form = {
            date: item.date,
            id: item.id,
            account: item.account,
            name: item.name,
            nickName: item.nickName,
            sex: item.sex,
            portrait: item.portrait,
            certificate: item.certificate,
            studentIDPhoto:item.studentIDPhoto,
            idCardFrontPhoto:item.idCardFrontPhoto,
            idCardReversePhoto:item.idCardReversePhoto,
            school:item.school,
            graduate:item.graduate=0?"是":"否",
            major:item.major,
            edu:item.edu
          };


            //console.log("----"+item.id);
           /* userIntroduce(adminId,token,item.id)
              .then(function (data){
                //console.log("test1-----"+data.user)
                obj.tableDataGra[1].ok  ='无'
                if (data.result.detailInfo.school!=null) {
                  obj.tableDataGra[1].ok  =data.result.detailInfo.school.name
                }
                obj.tableDataGra[0].ok=data.result.detailInfo.graduate === 0 ? '否' : '是';
                if (data.result.detailInfo.major !=null)
                {
                  obj.tableDataGra[2].ok = data.result.detailInfo.major;
                }
                if (data.result.detailInfo.edu !=null)
                {
                  obj.tableDataGra[3].ok = data.result.detailInfo.edu;
                }

                //
                // this.tableDataGra[3].ok = data.user.detailInfo.edu;


                // schoolna =data.user.detailInfo.school.name
              });*/

          if (this.form.school!=null) {
           // obj.tableDataGra[1].ok  =this.form.school;
            schoolId=this.form.school;
          }
          obj.tableDataGra[2].ok=this.form.graduate;
          if (this.form.major !=null)
          {
            obj.tableDataGra[3].ok = this.form.major;
          }
          if (this.form.edu !=null)
          {
           // obj.tableDataGra[0].ok = this.form.edu;
            eduId=this.form.edu;
          }

          getSchoolList(token,adminId,this.form.id)
            .then(function (data) {

              var len=data.result.length;

              for(let i=0;i<len;++i){
                if(data.result[i].cId==schoolId){

                  obj.tableDataGra[1].ok=data.result[i].cName;
                }


              }
              //console.log(obj.userDetailForm.location);

            });
          getEduList(token,adminId,this.form.id)
            .then(function (data) {
              var len=data.result.length;
              for(let i=0;i<len;++i){
                if(data.result[i].id==eduId){
                  obj.tableDataGra[0].ok=data.result[i].education;
                }
              }
            });
        }
      },

      handleDetail(index,row){
        //去到详情页

        this.$router.push({
          path:'UserDetail',
          query:{userId:row.id},

        })
      },

      selectReview(){
        this.requestCertificate();

      },
      requestCertificate(){
        //this.certificateChange=!this.certificateChange;
       // console.log("test---"+this.certificateChange);
        if(this.select_review==1||this.select_review==2){
          this.show=false;
        }else{
          this.show=true;
        }
        let obj = this;
        this.edit3=false;
        obj.tableData = [];
        let token=localStorage.getItem("adminToken");
        let adminId=localStorage.getItem("adminId");
          getCertificateCredentials(token,adminId,this.select_review, this.page.pageCurrent, this.page.pageSize)
            .then(function (data) {

              console.log(data);
              //查询记录的总数未设置
              obj.page.pageTotal = data.result.pages;
             // data = data.iconList;
              let length=data.result.list.length;
              for(let i = 0;i < length;i++){
                let json = {
                  "date":timestamp2DateString_(data.result.list[i].cCreateTime),
                  "id":data.result.list[i].cId,
                  "account":data.result.list[i].cAccount,
                  "name": data.result.list[i].cName,
                  "nickName":data.result.list[i].cNickName,
                  "sex":data.result.list[i].cSex === 0?'男':'女',
                  'portrait':data.result.list[i].cPicture.split(';'),
                  "edu":data.result.list[i].edu,
                  "school":data.result.list[i].schoolId,
                  "graduate":data.result.list[i].graduate,
                  "major":data.result.list[i].major,
                  "studentIDPhoto":data.result.list[i].studentIDPhoto,
                  "idCardFrontPhoto":data.result.list[i].idCardFrontPhoto,
                  "idCardReversePhoto":data.result.list[i].idCardReversePhoto
                  //'iconId':data.result[i].,
                  // "certificate":"身份证;头像;学生证"
                };

                obj.tableData.push(json);
                //console.log(json);
              }
              console.log("nextTick执行前--");
              //nextTick：在下次 DOM 更新循环结束之后执行延迟回调。
              obj.$nextTick(function(){
                console.log("nextTick--");
                if(obj.tableData!=""){
                  obj.handleCertificate(0,0)

                }

              })


            });




      },

      handle(type){
        console.log(type);
        let token=localStorage.getItem("adminToken");
        let adminId=localStorage.getItem("adminId");
        //身份证
        const item = this.tableData[this.idx];
        let id = item.id;
        //console.log(item)
        let obj = this;



        if(type==4){
          this.eduState=4;
        }
        if(type==3){
          this.eduState=3;
        }
        if(type==2){
          this.idState=2;
        }
        if(type==1){
          this.idState=1;
        }
        console.log("idState---"+this.idState);
        console.log("eduState---"+this.eduState);
          if(type==5){
            if (obj.idState=== 1) {
               //console.log("身份证测试-----");
              credAllow(token,adminId,1,id,1)
                .then(function (data) {

                /*  obj.$message.success('通过成功');*/
                 /* obj.edit3 = false;*/
                /*  obj.getData();*/

                  //console.log(2, data);
                 /* obj.requestCertificate()*/
                 console.log("身份证审核通过---");
                })

            } else if (obj.idState === 2) {
              credAllow(token,adminId,2,id,1)
                .then(function (data) {

                /*  obj.$message.success('驳回成功');
                  obj.edit = false;
                  obj.getData();

                  console.log(2, data);
                  obj.requestCertificate()*/
                console.log("身份认证驳回成功。")
                })
            }

            //学历认证
           /* const item1 = this.tableData[this.idx];
            let id1 = item1.id;
            //console.log(item)
            let obj1 = this;*/
            if ( obj.eduState=== 3) {

              credAllow(token,adminId,1,id,2)
                .then(function (data) {

                 /* obj1.$message.success('通过成功');
                  obj1.edit = false;
                  obj1.getData();

                  console.log(2, data);
                  obj1.requestCertificate()*/
                  console.log("学历审核通过---");
                })

            } else if (obj.eduState === 4) {
              credAllow(token,adminId,2,id,2)
                .then(function (data) {

                /*  obj1.$message.success('驳回成功');
                  obj1.edit = false;
                  obj1.getData();

                  console.log(2, data);
                  obj1.requestCertificate()*/
                  console.log("学历审核驳回---");
                });
              obj.edit3 = false;

            }

            obj.requestCertificate();
            obj.$message.success('提交成功');
          }



      }


    }
    /*beforeCreate:function () {
      this.handleCertificate(0,0);
    }*//*
   watch:{

      tableData:function(){
        var _this=this;
        console.log("changing!!");
        console.log(this.tableData)
        //console.log("change---");
     this.$nextTick(function(){

        _this.handleCertificate(0,0)
    })
  }
  }*/

  }
</script>


<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .table{
    width: 100%;
    font-size: 14px;
    min-width: 1000px;

  }
  .mr10{
    margin-right: 10px;
  }
  .image{
    margin-left:50%;
    transform: translate(-50%,0%);
    /*min-width: 300px;
    max-width: 300px;*/
    width: 350px;
    height: 350px;
  }
  .radioSelect{
    margin: 10px 0 10px 0;
    margin-left:50%;
    transform: translate(-50%,0%);
  }
  .box{
    width: 100%;
    text-align: center;
    vertical-align: middle;
    margin:20px 0 20px 0;
  }
  .box_button{
    width: 200px;
    height: 60px;
    font-size:20px;
  }
</style>
