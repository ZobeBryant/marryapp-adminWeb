<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 认证审核</el-breadcrumb-item>
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
              <el-col :span="8" :offset="8">
                <el-button type="primary">待认证项</el-button>
                <el-select v-model="select_certificate" @change="selectCertificate" class="handle-select mr10">
                  <el-option v-for="item in certificates" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>

          <el-table :data="tableData" border style="font-size: 14px;">
            <el-table-column prop="date" label="日期" sortable width="150"></el-table-column>
            <el-table-column prop="id" show-overflow-tooltip label="用户ID" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDetail(scope.$index, scope.row)">{{scope.row.id}}</el-button>
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
        <div class="container" v-if="edit">
          <el-row  v-if="this.select_certificate === '头像'">
            <el-col>
              <h2 style="margin-bottom: 10px">头像</h2>
              <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
                <img :src="form.portrait" class="image">
                <el-radio-group v-model="radio1" class="radioSelect">
                  <el-button type="primary" round class="box_button" @click="handle(1)">通过</el-button>
                  <el-button type="success" round class="box_button" @click="handle(2)">驳回</el-button>
                </el-radio-group>
              </el-card>
            </el-col>
          </el-row>
          <el-row v-else-if="this.select_certificate === '身份证'">
            <h2 style="margin-bottom: 10px;margin-top: 10px">身份认证</h2>
            <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
              <el-col :span="24">
                <img :src="form.portrait[0]" class="image">
              </el-col>
              <el-col :span="24">
                <img :src="form.portrait[1]" class="image">
              </el-col>
              <el-radio-group v-model="radio2" class="radioSelect">
                <el-button type="primary" round class="box_button" @click="handle(1)">通过</el-button>
                <el-button type="success" round class="box_button" @click="handle(2)">驳回</el-button>
              </el-radio-group>
            </el-card>
          </el-row>
          <el-row v-else-if="this.select_certificate === '学生证'">
            <h2 style="margin-bottom: 10px;margin-top: 10px">学历认证</h2>
            <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
              <el-col :span="24">
                <img :src="form.portrait" class="image">
              </el-col>
              <el-col :span="20" :offset="2">
                <el-table :data="tableDataGra" border class="table">
                  <el-table-column prop="graduate" label="类型" width="150"></el-table-column>
                  <el-table-column prop="ok" label="是/否" width="100"></el-table-column>
                </el-table>
              </el-col>
              <el-radio-group v-model="radio3" class="radioSelect">
                <el-button type="primary" round class="box_button" @click="handle(1)">通过</el-button>
                <el-button type="success" round class="box_button" @click="handle(2)">驳回</el-button>
              </el-radio-group>
            </el-card>
          </el-row>

          <!--<div class="box">-->
            <!--<el-button type="primary" round class="box_button">确认提交</el-button>-->
          <!--</div>-->


        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ax from 'axios';
  import {getCertificateEdu, getCertificateIdCard, getCertificatePortrait,iconAllow,iconRefuse,credAllow,credRefuse,studentAllow,studentRefuse,userIntroduce,iconState,studentState} from "../../assets/api/global_request";
  import {timestamp2DateString, timestamp2DateString_} from "../../assets/api/date";
  export default{
    name:'dashboard',

    data(){
      return {
        review:[
          {
            value:0,
            label:'待审核'
          },
          {
            value:1,
            label:'已审核'
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
        url:'/static/vuetable.json',
        tableData: [],
        tableDataGra:[
          {
            graduate:'毕业状态',
            ok:'无'
          },
          {
            graduate:'学校',
            ok:'无'
          },
          {
            graduate:'专业',
            ok:'无'
          },
          {
            graduate:'学历',
            ok:'无'
          }
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
        idx: -1,
        radio1:1,
        radio2:1,
        radio3:1,
        edit:false,
        page:{
          pageSize:10,
          pageTotal:0,
          pageCurrent:1,
        }
      }
    },

    created(){
      this.getData()
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

      handleCertificate(index, row) {

        let graud =null
        let schoolna =""
        let obj = this;
        if (this.idx === index) {
          this.edit = !this.edit
        } else {
          this.edit = true
        }
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
          };
          if (this.select_certificate === '学生证') {

            console.log(item.id);
            userIntroduce(item.id)
              .then(function (data){
                console.log(data)
                obj.tableDataGra[1].ok  ='无'
                if (data.user.detailInfo.school!=null) {
                  obj.tableDataGra[1].ok  =data.user.detailInfo.school.name
                }
                obj.tableDataGra[0].ok=data.user.detailInfo.graduate === 0 ? '否' : '是';
                if (data.user.detailInfo.major !=null)
                {
                  obj.tableDataGra[2].ok = data.user.detailInfo.major;
                }
                if (data.user.detailInfo.edu !=null)
                {
                  obj.tableDataGra[3].ok = data.user.detailInfo.edu;
                }

                //
                // this.tableDataGra[3].ok = data.user.detailInfo.edu;


                // schoolna =data.user.detailInfo.school.name
              });





          }
          //console.log(this.form);
        }
      },

      handleDetail(index,row){
        //去到详情页

        this.$router.push({
          path:'/userDetail',
          query:{userId:row.id}
        })
      },

      selectReview(){
        this.requestCertificate();
      },
      selectCertificate(){
        this.page.pageCurrent = 1;
        this.page.pageTotal = 0;
        this.page.pageSize = 10;
        this.edit = false;
        this.requestCertificate();
      },
      requestCertificate(){
        let key = this.select_certificate;
        let obj = this;
        obj.tableData = [];
        if(key === '头像'){
          getCertificatePortrait(this.select_review, this.page.pageCurrent, this.page.pageSize)
            .then(function (data) {
              console.log(data);
              obj.page.pageTotal = data.iconNum;
              data = data.iconList;

              for(let i = 0;i < data.length;i++){
                let json = {
                  "date":timestamp2DateString_(data[i].createTime.time),
                  "id":data[i].user.id,
                  "account":data[i].user.account,
                  "name": data[i].user.name,
                  "nickName":data[i].user.nickName,
                  "sex":data[i].user.sex === 0?'男':'女',
                  'portrait':data[i]['picture'].split(';'),
                  'iconId':data[i].id,
                  // "certificate":"身份证;头像;学生证"
                };
                obj.tableData.push(json);
                console.log(json);
              }

            })
        }else if(key === '身份证'){
          getCertificateIdCard(this.select_review, this.page.pageCurrent, this.page.pageSize)
            .then(function(data){
              let date;
              obj.page.pageTotal = data.credNum;
              data = data.credList;
              for(let i = 0;i < data.length;i++){

                if(data[i].createTime !=null) {

                  date = timestamp2DateString_(data[i].createTime.time)
                }
                else {
                  date = " "
                }

                let json = {
                  "date":date,
                  "id":data[i].user.id,
                  "account":data[i].user.account,
                  "name": data[i].user.name,
                  "nickName":data[i].user.nickName,
                  "sex":data[i].user.sex === 0?'男':'女',
                  'portrait':data[i]['picture'].split(';'),
                  // "certificate":"身份证;头像;学生证"
                };
                obj.tableData.push(json);
              }
              console.log(data);
            })
        }else if(key === '学生证'){
          getCertificateEdu(this.select_review, this.page.pageCurrent, this.page.pageSize)
            .then(function (data) {
              obj.page.pageTotal = data.studentNum;
              data = data.studentList;
              let date;
              for(let i = 0;i < data.length;i++){
                // let school = data[i].edu.detailInfo.school;
                // if(school !== null){
                //   school = school.name;
                // }else{
                //   school = '';
                // }
                if(data[i].createTime !=null) {

                  date = timestamp2DateString_(data[i].createTime.time)
                }
                else {
                  date = " "
                }
                let json = {

                  "date":date,
                  "id":data[i].user.id,
                  "account":data[i].user.account,
                  "name": data[i].user.name,
                  "nickName":data[i].user.nickName,
                  "sex":data[i].user.sex === 0?'男':'女',
                  'portrait':data[i]['picture'],
                  // "certificate":"身份证;头像;学生证",
                  // 'school':school,
                  // 'major':data[i].edu.detailInfo.major,
                  // 'edu':data[i].edu.detailInfo.edu,
                  // 'graduate':data[i].edu.detailInfo.graduate,
                };
                obj.tableData.push(json);
              }
              console.log(data);
            });
        }
      },

      handle(type){
        if(this.select_certificate === '头像') {
          const item = this.tableData[this.idx];
          let id = item.iconId;
          console.log(item)
          let obj = this;
          if (type === 1) {
            let status = this.select_method;
            iconState(id,1)
              .then(function (data) {

                obj.$message.success('通过成功');
                obj.edit = false;
                obj.getData();

                console.log(2, data);
                obj.requestCertificate()
              })

          } else if (type === 2) {
            iconState(id,-1)
              .then(function (data) {
                obj.$message.success('驳回成功');
                obj.edit = false;
                obj.getData();

                console.log(2, data);
                obj.requestCertificate()
              })

          }
        }
        else if (this.select_certificate === '身份证')
        {
          const item = this.tableData[this.idx];
          let id = item.id;
          console.log(item)
          let obj = this;
          if (type === 1) {
            credAllow(id)
              .then(function (data) {

                obj.$message.success('通过成功');
                obj.edit = false;
                obj.getData();

                console.log(2, data);
                obj.requestCertificate()
              })

          } else if (type === 2) {
            credRefuse(id)
              .then(function (data) {

                obj.$message.success('驳回成功');
                obj.edit = false;
                obj.getData();

                console.log(2, data);
                obj.requestCertificate()
              })
          }
        }
        else {

          const item = this.tableData[this.idx];
          let id = item.id;
          console.log(item)
          let obj = this;
          if (type === 1) {
            studentState(id,1)
              .then(function (data) {

                obj.$message.success('通过成功');
                obj.edit = false;
                obj.getData();

                console.log(2, data);
                obj.requestCertificate()
              })

          } else if (type === 2) {
            studentRefuse(id,-1)
              .then(function (data) {

                obj.$message.success('驳回成功');
                obj.edit = false;
                obj.getData();

                console.log(2, data);
                obj.requestCertificate()
              })

          }
        }



      }


    }

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
    min-width: 300px;
    max-width: 300px;
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
