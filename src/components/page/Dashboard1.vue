<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 头像审核</el-breadcrumb-item>
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
          <el-row  >
            <el-col>
              <h2 style="margin-bottom: 10px">头像</h2>
              <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
                <img :src="form.cPicture" class="image">
                <el-radio-group v-model="radio1" class="radioSelect" v-if="show">
                  <el-button type="primary" round class="box_button" @click="handle(1)">通过</el-button>
                  <el-button type="success" round class="box_button" @click="handle(2)">驳回</el-button>
                </el-radio-group>
              </el-card>
            </el-col>
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
        show:true,
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
          },
          {
            value:3,
            label:'更换头像'
          }
        ],
        select_review:0,
        /*certificates:[
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
        ],*/
        select_certificate:'请选择',
        url:'/static/vuetable.json',
        tableData: [],
        /*tableDataGra:[
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
        ],*/
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

      handleCertificate(index, row) {

        if (this.idx === index) {
          this.edit = !this.edit
        } else {

          this.edit = true
        }
        if (this.edit) {
          this.idx = index;
          const item = this.tableData[index];

          this.form = {
            cPicture:item.cPicture
          };
        }




          //console.log(this.form);

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
        this.page.pageSize = 20;
        this.edit = false;
        this.requestCertificate();
      },
      requestCertificate(){
        let key = this.select_certificate;
        let obj = this;
        this.edit=false;
        obj.tableData = [];
        if(this.select_review==1||this.select_review==2){
          this.show=false;
        }else{
          this.show=true;
        }
        let token=localStorage.getItem("adminToken");
        let adminId=localStorage.getItem("adminId");
          getCertificatePortrait(token,adminId,this.select_review, this.page.pageCurrent, this.page.pageSize)
            .then(function (data) {
              console.log(data);

              obj.page.pageTotal = data.result.pages;
              if(obj.select_review==3){
                for(let i = 0;i < data.result.list.length;i++){
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
                    "idCardReversePhoto":data.result.list[i].idCardReversePhoto,
                    "cPicture":data.result.list[i].facialPhoto
                  };
                  obj.tableData.push(json);
                  console.log("test----"+json);
                }
              }else{
                for(let i = 0;i < data.result.list.length;i++){
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
                    "idCardReversePhoto":data.result.list[i].idCardReversePhoto,
                    "cPicture":data.result.list[i].cPicture,
                  };
                  obj.tableData.push(json);
                  console.log("test----"+json);
                }
              }

              console.log("nextTick执行前--");
              //nextTick：在下次 DOM 更新循环结束之后执行延迟回调。
              obj.$nextTick(function(){
                console.log("nextTick--");
                if(obj.tableData!=""){
                  obj.handleCertificate(0,0)

                }

              })

            })

              //console.log(data);
            },

      handle(type){
        let token=localStorage.getItem("adminToken");
        let adminId=localStorage.getItem("adminId");
          const item = this.tableData[this.idx];
          console.log("----"+id);
          let id = item.id;
          console.log(item)
          let obj = this;
          if (type === 1) {
            let status = this.select_method;
            iconState(token,adminId,id,1)
              .then(function (data) {

                obj.$message.success('通过成功');
                obj.edit = false;
                obj.getData();

                console.log(2, data);
                obj.requestCertificate()
              })

          } else if (type === 2) {
            iconState(token,adminId,id,2)
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
   /* min-width: 300px;
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
