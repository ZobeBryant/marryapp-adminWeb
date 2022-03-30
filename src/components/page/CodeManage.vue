<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>邀请码管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-row>
        <el-button type="primary" @click="goStatics" style="margin-bottom: 10px">邀请码统计</el-button>
        <el-button type="primary" @click="addInvideCode" style="margin-bottom: 10px">添加邀请码</el-button>
      </el-row>

      <el-table :data="tableData" v-if="dataShow" v-loading="listLoading" class="table" border style="width: 100%"
                ref="codeListTable"
              >
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column property="cCode" label="邀请码" width="180px"></el-table-column>
        <el-table-column property="cPassword" label="密码" width="180px"></el-table-column>


       <el-table-column label="数据操作"  width="180px">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>



      <!-- 添加邀请码 -->
      <el-dialog title="新增邀请码" :visible.sync="addVisible" width="30%">
        <el-form ref="formAdd" :model="formAdd" label-width="80px">
          <el-form-item label="邀请码:" style="width: 200px;">
            <el-input v-model="formAdd.code"></el-input>
          </el-form-item>

          <el-form-item label="密码:" style="width: 200px;">
            <el-input v-model="formAdd.password"></el-input>
          </el-form-item>

        </el-form>





        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="数据" :visible.sync="updateVisible" width="30%">
        <el-form ref="codeForm" :model="codeForm" label-width="50px">
          <el-form-item label="密码">
            <el-input v-model="codeForm.password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUpdate">确 定</el-button>
        </span>
      </el-dialog>


      <!-- 删除提示框 -->
      <el-dialog title="删除VIP" :visible.sync="delVisible" width="300px" center>
        <div class="del-dialog-cnt">你确定要删除该条记录吗？</div>
        <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import {timestamp2DateString, timestamp2DateString_} from "../../assets/api/date";
  import {addCode, deleteCode, inventCode,singleSave,allSave,getCodeStatic} from "../../assets/api/global_request";

    export default {

      name: "CodeOperation",

    /*  inject:['reload'],*/
      data(){
        return{
          dataShow:true,
          codeForm:{
            rank: "",
            code:"",
            cId:"",
            password:"",
            registerNum: "",
            certificateNum:"",
            dayCard:"",
            monthCard:"",
            seasonCard:"",
            yearCard:"",
            offWeek:"",
            offMonth:"",
            offYear:"",
            offLife:"",
            sum:"",
            flag:""
          },
          form:{
            code:'',
            time:''
          },
          url:'/static/codeOperate.json',
          numAll:[],
          listLoading:false,
          multipleSelection: [],
          tableData:[],
          idx:-1,
          formAdd:{
            code:'',
            password:''
          },
          formEdit:{
          },

          delVisible:false,
          updateVisible:false,
          addVisible:false,
          priceUpdateVisible:false,
        }
      },
      computed:{

      },
      methods:{
        goStatics(){

          this.$router.push({
            path:'inviteCodeOperation',
          })
        },

        getTimeNow(val){
          this.form.time = val;
          console.log("时间值")
          console.log(val)
        },

        // 获取数据
        getData() {

        },
        //查询
        onSubmit(){
          let start = '';
          let end = '';
          let obj = this;
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");
         getCodeStatic(token,adminId, start, end)
            .then(function (data) {

              obj.tableData = [];
              for(let i = 0;i < data.result.length;i++){

                let json = {
                  "cCode": data.result[i].cCode,
                  "cPassword":data.result[i].cPassword,
                  "cId":data.result[i].cId
                };
                obj.tableData.push(json);
              }
              console.log(data);

            });
        },



        //添加邀请码
        addInvideCode(){
          this.addVisible = true;
        },

        //确定保存修改的新增邀请码
        saveAdd(){
          let code = this.formAdd.code;
          let password = this.formAdd.password;
          let obj = this;
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");
          addCode(token,adminId,code,password).then(function (data) {
            obj.addVisible = false;
            obj.$message.success(`新增邀请码成功`);
            obj.onSubmit();
          });


        },
        //删除显示
        handleDelete(index, row) {
          this.idx = index;
          this.$refs.codeListTable.setCurrentRow(row);
          this.delVisible = true;
        },

        handleUpdate(index, row) {
          this.idx = index;
          const item = this.tableData[index];
          console.log("显示")
          console.log(index)
          console.log(row)
          console.log(this.tableData[index])

          this.codeForm.password = this.tableData[index].cPassword;
         this.codeForm.cId= this.tableData[index].cId;

          this.$refs.codeListTable.setCurrentRow(row);
         // this.dataShow=false;
          this.updateVisible = true;
        },
        //保存修改
        saveUpdate(){
          let cId = this.codeForm.cId;
          let password = this.codeForm.password;
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");
          let obj = this;


          singleSave(token,adminId,cId,password)
            .then(function (data) {
              obj.updateVisible = false;
              obj.$message.success("修改成功");
              //obj.dataShow=true;
              obj.onSubmit();
              //obj.$forceUpdate();
              /*obj.reload()*/
            });
         /* obj.onSubmit();*/
          //obj.dataShow=true;
          //console.log(this.dataShow);
         // this.$forceUpdate();

         /* this.$router.go(0) //页面刷新
          obj.onSubmit();*/
          //obj.onSubmit();

          //this.$set(this.tableData, this.idx, cPassword);
          /*this.updateVisible = false;
          this.$message.success(`修改第 ${this.idx+1} 行成功`);*/
        },

        //删除确定
        deleteRow(){
          let row = this.tableData[this.idx];
          //console.log("row---"+row);
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");
          let code = row.cId;console.log("cid---"+code);
          let obj = this;
        deleteCode(token,adminId,code).then(function (data) {

            obj.$message.success('删除成功');
          });
          this.tableData.splice(this.idx, 1);
          this.delVisible = false;

        },

      },
      mounted(){
        this.onSubmit();
      }
    }
</script>

<style scoped>
  .table{
    width: 100%;
    font-size:14px;
    min-width: 1000px;
  }
</style>
