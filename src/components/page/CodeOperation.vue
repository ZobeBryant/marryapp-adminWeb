<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>邀请码统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-row>
        <el-button type="primary" @click="goManage" style="margin-bottom: 10px">邀请码管理</el-button>
       <!-- <el-button type="primary" @click="handlePrice" style="margin-bottom: 10px">价格设置</el-button>-->
      </el-row>

      <el-form :model="form" :inline="true">
        <!--<el-form-item label="邀请码:">
          <el-input v-model="form.code" placeholder="请输入邀请码"></el-input>
        </el-form-item>-->
        <el-form-item label="时间:">
          <el-date-picker
            v-model="form.time"
            @change="onSubmit"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="选择起始日期"
            end-placeholder="选择结束日期"
            :picker-options="pickerOptions2"
            :format="'yyyy-MM-dd HH:mm:ss'">
          </el-date-picker>
        </el-form-item>
       <!-- <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLast">昨日</el-button>
        </el-form-item>-->
      </el-form>


     <!-- <el-button size="small" round type="danger" @click="saveMany" style="margin-bottom: 10px">批量保存</el-button>-->
      <!-- 表格---start -->
      <el-table :data="tableData" v-loading="listLoading" class="table" border style="width: 100%"
                ref="codeListTable"
              >
        <el-table-column type="selection" width="60"></el-table-column>
        <!--<el-table-column property="rank" sortable label="排名" width="80"></el-table-column>-->
        <el-table-column property="cCode" label="邀请码" width="180px"></el-table-column>
        <el-table-column property="cPassword" label="密码" width="180px"></el-table-column>
        <el-table-column property="zcNumber" label="注册人数" width="100px"></el-table-column>
        <el-table-column property="rzNumber" label="认证人数" width="100px"></el-table-column>
        <el-table-column property="xnBjNumber" label="终身白金卡（校内）" width="100px"></el-table-column>
        <el-table-column property="xnZkNumber" label="周卡（校内）" width="100px"></el-table-column>
        <el-table-column property="xnYkNumber" label="月卡（校内）" width="100px"></el-table-column>
        <el-table-column property="xnNkNumber" label="年卡（校内）" width="100px"></el-table-column>
        <el-table-column property="xwBjNumber" label="终身白金卡（校外）" width="100px"></el-table-column>
        <el-table-column property="xwZkNumber" label="周卡（校外）" width="100px"></el-table-column>
        <el-table-column property="xwYkNumber" label="月卡（校外）" width="100px"></el-table-column>
        <el-table-column property="xwNkNumber" label="年卡（校外）" width="100px"></el-table-column>
        <!--<el-table-column property="sum" label="费用合计" width="100px">
          <template slot-scope="scope" align="center" width="150">
            <span>{{ sumTotal(scope.row)}}</span>
          </template>
        </el-table-column>-->
        <!--<el-table-column property="flag" label="费用">-->
          <!--<template slot-scope="scope">
            <el-row>
              <el-select v-model="scope.row.flag" style="width: 80px">
                <el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <el-button type="text" icon="el-icon-success" class="red" @click="handleSave(scope.$index, scope.row)">保存</el-button>
            </el-row>
          </template>-->

       <!-- <el-table-column label="数据操作">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>-->
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

      <!-- 修改价格弹出框 -->
     <!-- <el-dialog title="数据" :visible.sync="priceUpdateVisible" width="30%">
        <el-form ref="priceForm" :model="priceForm" label-width="50px">

          <el-form-item label="日卡">
            <el-input v-model="priceForm.day"></el-input>
          </el-form-item>
          <el-form-item label="月卡">
            <el-input v-model="priceForm.month"></el-input>
          </el-form-item>
          <el-form-item label="终生卡">
            <el-input v-model="priceForm.season"></el-input>
          </el-form-item>
          <el-form-item label="年卡">
            <el-input v-model="priceForm.year"></el-input>
          </el-form-item>

          <el-form-item label="认证">
            <el-input v-model="priceForm.certificate"></el-input>
          </el-form-item>
          <el-form-item label="注册">
            <el-input v-model="priceForm.regi"></el-input>
          </el-form-item>
          <el-form-item label="校外周卡">
            <el-input v-model="priceForm.offWeek"></el-input>
          </el-form-item>
          <el-form-item label="校外月卡">
            <el-input v-model="priceForm.offMonth"></el-input>
          </el-form-item>
          <el-form-item label="校外年卡">
            <el-input v-model="priceForm.offYear"></el-input>
          </el-form-item>
          <el-form-item label="校外终生卡">
            <el-input v-model="priceForm.offLife"></el-input>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="priceUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePrice">确 定</el-button>
        </span>
      </el-dialog>
-->
      <!-- 修改弹出框 -->
      <el-dialog title="数据" :visible.sync="updateVisible" width="30%">
        <el-form ref="codeForm" :model="codeForm" label-width="50px">
          <el-form-item label="密码">
            <el-input v-model="codeForm.password"></el-input>
          </el-form-item>
          <el-form-item label="注册人数">
            <el-input v-model="codeForm.registerNum"></el-input>
          </el-form-item>
          <el-form-item label="认证人数">
            <el-input v-model="codeForm.certificateNum"></el-input>
          </el-form-item>
          <el-form-item label="日卡">
            <el-input v-model="codeForm.dayCard"></el-input>
          </el-form-item>
          <el-form-item label="月卡">
            <el-input v-model="codeForm.monthCard"></el-input>
          </el-form-item>
          <el-form-item label="终生卡">
            <el-input v-model="codeForm.seasonCard"></el-input>
          </el-form-item>
          <el-form-item label="年卡">
            <el-input v-model="codeForm.yearCard"></el-input>
          </el-form-item>

          <el-form-item label="校外周卡">
            <el-input v-model="codeForm.offWeek"></el-input>
          </el-form-item>
          <el-form-item label="校外月卡">
            <el-input v-model="codeForm.offMonth"></el-input>
          </el-form-item>
          <el-form-item label="校外年卡">
            <el-input v-model="codeForm.offYear"></el-input>
          </el-form-item>
          <el-form-item label="校外终生卡">
            <el-input v-model="codeForm.offLife"></el-input>
          </el-form-item>

          <!--<el-form-item label="状态">-->
            <!--<el-select v-model="codeForm.flag" class="handle-select mr10">-->
              <!--<el-option v-for="item in types" :key="item.value" :value="item.value" :label="item.label"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->

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
      data(){
        return{
          pickerOptions2: {
            shortcuts: [{
              text: '昨天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [start, start]);
              }
            },{
              text: '最近7天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                console.log("7--"+start);
                picker.$emit('pick', [start, end]);
              }
            },
              {
                text: '上周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  const now=new Date();
                  let day=now.getDate();
                  let weekDay=now.getDay();
                  // console.log(weekDay+7)
                  start.setDate(day-weekDay-6);
                  start.setHours(0);
                  start.setMinutes(0);
                  start.setSeconds(0);
                  end.setDate(day-weekDay+1);
                  end.setHours(0);
                  end.setMinutes(0);
                  end.setSeconds(0);

                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: '上个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  const now=new Date();
                  let month=now.getMonth();
                  start.setMonth(month-1);
                  start.setDate(1);
                  start.setHours(0);
                  start.setMinutes(0);
                  start.setSeconds(0);
                  end.setDate(1);
                  end.setHours(0);
                  end.setMinutes(0);
                  end.setSeconds(0);
                  picker.$emit('pick', [start, end]);
                }
              },
              {
                text: '今天',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setHours(0);
                  start.setMinutes(0);
                  start.setSeconds(0);
                  picker.$emit('pick', [start, end]);
                }
              }


            ]
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
          types:[
            {
              label:'正常',
              value:'正常',
            },
            {
              label:'冻结',
              value:'冻结',
            }
          ],
          delVisible:false,
          updateVisible:false,
          addVisible:false,
          priceUpdateVisible:false,
          sums:'0',
          priceForm:{
            day:'0',
            month:'0',
            season:'0',
            year:'0',
            certificate:'0',
            regi:'0',
            offWeek:'0',
            offMonth:'0',
            offYear:'0',
            offLife:'0',
          },
          //每个条目
          codeForm:{
            rank: "",
            code:"",
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
        }
      },
      computed:{
        //计算合计内容
        sumTotal:function(){
          return function (row) {
            const dayCard = row.dayCard
            const monthCard = row.monthCard
            const seasonCard = row.seasonCard
            const yearCard = row.yearCard
            const dayMoney = row.dayCard
            const monthMoney = row.monthCard
            const seasonMoney = row.seasonCard
            const yearMoney = row.yearCard
            return dayCard*dayMoney+monthCard*monthMoney+seasonCard*seasonMoney+yearCard*yearMoney
          }
        }
      },
      methods:{
        goManage(){

          this.$router.push({
            path:'CodeManage',
          })
        },

        setFirst() {
          let obj =this;
          // console.log("价格")
          // this.priceForm.day = 1;
          // this.priceForm.month = 2;
          var a;


          for(let i = 0;i < obj.tableData.length;i++){
            console.log( obj.tableData[i].registerCount)
            console.log(this.priceForm.regi)
            a = obj.tableData[i].registerCount * this.priceForm.regi + obj.tableData[i].credCount * this.priceForm.certificate + obj.tableData[i].yearCardCount* this.priceForm.year+ obj.tableData[i].dayCardCount * this.priceForm.day + obj.tableData[i].monthCardCount * this.priceForm.month+obj.tableData[i].lifetimeOnCampus * this.priceForm.season + obj.tableData[i].offCampusCard *this.priceForm.offWeek + obj.tableData[i].offCampusMonthlyCard*this.priceForm.offMonth+obj.tableData[i].offCampusYearCard*this.priceForm.offYear + obj.tableData[i].offCampusLife*this.priceForm.offLife
            this.tableData[i].flag=a;
          //   console.log(item);
          //   let json = {
          //     "code.code": item.id,
          //     // "code.password":data[i].code.password,
          //     // "registerCount":data[i].registerCount,
          //     // "credCount":data[i].credCount,
          //     // "dayCardCount":data[i].dayCount,
          //     // "monthCardCount":data[i].monthCard,
          //     // "lifetimeOnCampus":data[i].lifetimeOnCampus,
          //     // "yearCardCount":data[i].yearCard,
          //     // "offCampusCard":data[i].offCampusCard,
          //     // "offCampusMonthlyCard":data[i].offCampusMonthlyCard,
          //     // "offCampusYearCard":data[i].offCampusYearCard,
          //     // "offCampusLife":data[i].offCampusLife,
          //   };
          //   obj.tableData.push(json);
          }
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
          if(this.form.time!=null){
            start = timestamp2DateString_(this.form.time[0]);
            end = timestamp2DateString_(this.form.time[1]);
          }
          if(start.indexOf('NaN') !== -1){
            start = '';
          }
          if(end.indexOf('NaN') !== -1){
            end = '';
          }

          //let code = this.form.code;

          let obj = this;
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");
         getCodeStatic(token,adminId, start, end)
            .then(function (data) {

             /* let sums;
              if(data.queryInviteResult === '0'){
                obj.tableData = data.inviteList;
              }*/
              console.log("static--"+data);
              obj.tableData=[];
              for(let i = 0;i < data.result.length;i++){
               /* sums = data[i].registerCount * this.priceForm.regi + data[i].credCount * this.priceForm.certificate + data[i].dayCount * this.priceForm.day + data[i].monthCard * this.priceForm.month+data[i].lifetimeOnCampus * this.priceForm.season + data[i].offCampusCard *this.priceForm.offWeek + data[i].offCampusMonthlyCard*this.priceForm.offMonth+data[i].offCampusYearCard*this.priceForm.offYear + data[i].offCampusLife*this.priceForm.offLife*/
                let json = {
                  "cCode": data.result[i].cCode,
                  "cPassword":data.result[i].cPassword,
                  "zcNumber":data.result[i].zcNumber,
                  "rzNumber":data.result[i].rzNumber,
                  "xnBjNumber":data.result[i].xnBjNumber,
                  "xnZkNumber":data.result[i].xnZkNumber,
                  "xnYkNumber":data.result[i].xnYkNumber,
                  "xwBjNumber":data.result[i].xwBjNumber,
                  "xwZkNumber":data.result[i].xwZkNumber,
                  "xwYkNumber":data.result[i].xwYkNumber,
                  "xwNkNumber":data.result[i].xwNkNumber,
                  "xnNkNumber":data.result[i].xnNkNumber,

                };
                obj.tableData.push(json);
              }
              console.log(data);
              //console.log(obj.tableData);
            });
        },


       /* onLast(){

          let obj = this;
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");
          getCodeStatic()
            .then(function (data){
              let sums;
              if(data.lastInviteCodeStaticResult === '0'){
                obj.tableData = data.lastInviteCodeStatic;
              }

              for(let i = 0;i < data.length;i++){
                console.log(data[i].offCampusCard)
                sums = data[i].registerCount * this.priceForm.regi + data[i].credCount * this.priceForm.certificate + data[i].dayCount * this.priceForm.day + data[i].monthCard * this.priceForm.month+data[i].lifetimeOnCampus * this.priceForm.season + data[i].offCampusCard *this.priceForm.offWeek + data[i].offCampusMonthlyCard*this.priceForm.offMonth+data[i].offCampusYearCard*this.priceForm.offYear + data[i].offCampusLife*this.priceForm.offLife
                let json = {
                  "code.code": data[i].code.code,
                  "code.password":data[i].code.password,
                  "registerCount":data[i].registerCount,
                  "credCount":data[i].credCount,
                  "dayCardCount":data[i].dayCount,
                  "monthCardCount":data[i].monthCard,
                  "lifetimeOnCampus":data[i].lifetimeOnCampus,
                  "yearCardCount":data[i].yearCard,
                  "offCampusCard":data[i].offCampusCard,
                  "offCampusMonthlyCard":data[i].offCampusMonthlyCard,
                  "offCampusYearCard":data[i].offCampusYearCard,
                  "offCampusLife":data[i].offCampusLife,
                  // "flag":sums,
                };
                obj.tableData.push(json);
              }

              console.log(data);
              obj.setFirst();

            });

        },*/
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
            this.$message.success(`新增邀请码成功`);
          });


        },
        //批量保存
        saveMany(){
          let obj = this;
          let o = {};
          let t={};
          this.numAll =[];
        for(let i = 0;i < obj.tableData.length;i++){

          const item = this.tableData[i];
          console.log(item);
          o['id'] = item.id;
          o['codeId'] = item.code.code;
          o['password'] = item.code.password;
          t['num'+i.toString()] = { id: item.id, codeId: item.code.code,password: item.code.password,registerCount:item.registerCount,credCount:item.credCount,dayCount:item.dayCount,monthCard:item.monthCard,quarterCardCount:item.quarterCardCount,yearCardCount:item.yearCardCount,offCampusCard:item.offCampusCard,offCampusMonthlyCard:item.offCampusMonthlyCard,offCampusYearCard:item.offCampusYearCard,offCampusLife:item.offCampusLife};
        }

        // this.numAll.push(o);
        this.numAll.push(t);

        // console.log(this.numAll)

          // var ids= this.multipleSelection.map(item => item.id);
          // if(ids.length==0){
          //   this.$message({message: '请选择要保存的项',type: "warn"});
          //   return;
          // }
          this.$confirm('此操作将批量保存文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.$message("全部保存")
            allSave(obj.tableData.length,JSON.stringify(this.numAll))
              .then(function (data){
              });
            console.log()
          })
        },

        //点击选择
        handleSelectionChange(val){
          this.multipleSelection = val;
          // this.$message({
          //     message: '选中的项是:' + JSON.stringify(this.multipleSelection),
          //     type: "success"
          // });
        },

        //修改
        handleUpdate(index, row) {
          this.idx = index;
          const item = this.tableData[index];
          console.log("显示")
          console.log(index)
          console.log(row)
          console.log(this.tableData[index])
/*          this.codeForm = {
            rank: item.rank,
            code: item.code,
            password:item.password,
            registerNum: item.registerNum,
            certificateNum: item.certificateNum,
            dayCard:item.dayCard,
            monthCard:item.monthCard,
            seasonCard:item.seasonCard,
            yearCard:item.yearCard,
            sum:item.sum,
            flag:item.flag
          }*/
          this.codeForm.password = this.tableData[index].code.password;
          this.codeForm.registerNum = this.tableData[index].registerCount;
          this.codeForm.certificateNum = this.tableData[index].credCount;
          this.codeForm.dayCard = this.tableData[index].dayCardCount;
          this.codeForm.monthCard = this.tableData[index].monthCardCount;
          this.codeForm.yearCard  = this.tableData[index].yearCardCount;
          this.codeForm.seasonCard = this.tableData[index].lifetimeOnCampus;
          this.codeForm.offWeek    =this.tableData[index].offCampusCard;
          this.codeForm.offMonth   = this.tableData[index].offCampusMonthlyCard;
          this.codeForm.offYear   = this.tableData[index].offCampusYearCard;
          this.codeForm.offLife   = this.tableData[index].offCampusLife;

          this.$refs.codeListTable.setCurrentRow(row);
          this.updateVisible = true;
        },

        //价格设置
        handlePrice(){
          this.priceUpdateVisible = true;
        },
        //保存价格修改
        savePrice(){
          this.priceUpdateVisible = false;
          this.setFirst()
          this.$message.success(`修改价格成功`);
        },

        //保存修改
        saveUpdate(){
          let code = this.formAdd.code;
          let password = this.formAdd.password;
          let obj = this;
          const item = this.tableData[this.idx+1];
          console.log(item.code.code);
          console.log(this.codeForm.password);
          console.log(item.id);
          console.log(this.codeForm.registerNum)
          console.log(this.codeForm.certificateNum)
          console.log(this.codeForm.dayCard)
          console.log(this.codeForm.monthCard)
          console.log(this.codeForm.seasonCard)
          console.log(this.codeForm.yearCard)
          code = item.code.code
          let id = item.id
          console.log(code)

          singleSave(code,this.codeForm.password,id,this.codeForm.registerNum,this.codeForm.certificateNum,this.codeForm.dayCard,this.codeForm.monthCard,this.codeForm.seasonCard,this.codeForm.yearCard,this.codeForm.offWeek,this.codeForm.offMonth,this.codeForm.offYear,this.codeForm.offLife)
            .then(function (data) {
              obj.addVisible = false;
              // this.$message.success(`新增邀请码成功`);
            });

          // addCode(code,password).then(function (data) {
          //
          //
          // });

          this.$set(this.tableData, this.idx, this.codeForm);
          this.updateVisible = false;
          this.$message.success(`修改第 ${this.idx+1} 行成功`);
        },


        //删除显示
        handleDelete(index, row) {
          this.idx = index;
          this.$refs.codeListTable.setCurrentRow(row);
          this.delVisible = true;
        },
        //删除确定
        deleteRow(){
          let row = this.tableData[this.idx];
          console.log(row);

          let code = row.id;
          let obj = this;
          deleteCode(code).then(function (data) {

            obj.$message.success('删除成功');
          });
          this.tableData.splice(this.idx, 1);
          this.delVisible = false;

        },

      },
      mounted(){
       /* this.onLast()*/
      /* this.onSubmit();*/
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
