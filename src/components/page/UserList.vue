<!--suppress ALL -->
<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="用户ID:">
          <el-input v-model="form.userId" placeholder="请输入用户ID"  @keyup.enter.native="onSubmit(1)"></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input v-model="form.userName" placeholder="请输入姓名" @keyup.enter.native="onSubmit(2)"></el-input>
        </el-form-item>
        <el-form-item label="昵称:">
          <el-input v-model="form.nickName" placeholder="请输入昵称" @keyup.enter.native="onSubmit(3)"></el-input>
        </el-form-item>
        <el-form-item label="账号:">
          <el-input v-model="form.account" placeholder="请输入账号" @keyup.enter.native="onSubmit(4)" style="width: 200px"></el-input>
        </el-form-item>
       <!-- <el-form-item label="邂逅ID">
          <el-input v-model="form.serialNumber" placeholder="请输入邂逅ID"></el-input>
        </el-form-item>-->

      </el-form>

<!--      <div><h3>筛选条件</h3></div>
      <br/>

      <el-form ref="filterForm" :model="filterForm" :inline="true">
        <el-form-item label="性别">
          <el-select v-model="filterForm.sex">
            <el-option v-for="item in sex" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="认证状态">
          <el-select v-model="filterForm.certificate">
            <el-option v-for="item in certificates" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示状态">
          <el-select v-model="filterForm.showType">
            <el-option v-for="item in showTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-select v-model="filterForm.accountType">
            <el-option v-for="item in accountTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业状态">
          <el-select v-model="filterForm.graduate" >
            <el-option v-for="item in graduates" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="VIP状态">
          <el-select v-model="filterForm.vipType" style="width: 120px">
            <el-option v-for="item in vipTypes" :label="item.label" :value="item.value" :key="item.value" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身高">
          <el-col :span="11">
            <el-input type="number" v-model="filterForm.highStart" placeholder="起始身高" style="width: 100px"></el-input>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-input type="number" v-model="filterForm.highEnd" placeholder="结束身高" style="width: 100px"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="注册时间">
          &lt;!&ndash;<el-select v-model="filterForm.createTime"  style="width: 100px">&ndash;&gt;
            &lt;!&ndash;<el-option v-for="item in createTimes" :label="item.label" :value="item.value" :key="item.value"></el-option>&ndash;&gt;
          &lt;!&ndash;</el-select>&ndash;&gt;
        </el-form-item>
        &lt;!&ndash;<el-button type="primary" @click="onShow">自定义</el-button>&ndash;&gt;
        <el-form-item v-if="selectTime">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择起始日期" v-model="filterForm.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="filterForm.endTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        &lt;!&ndash;<el-button type="success" @click="onMoreSelect">更多</el-button>&ndash;&gt;
        <el-button type="danger" @click="onFilter">筛选</el-button>

        <div v-if="showMoreSelect">
          <el-form-item label="最后活跃时间">
            <el-select v-model="filterForm.lastActive">
              <el-option v-for="item in lastActives" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校">
            <el-select v-model="filterForm.school" filterable>
              <el-option v-for="item in schools" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="filterForm.education">
              <el-option v-for="item in educations" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在地区">
            <el-select v-model="filterForm.region" filterable>
              <el-option v-for="item in regions" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户标签">
            <el-select v-model="filterForm.tag">
              <el-option v-for="item in tags" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>-->

      <div>
       <!-- <el-button type="primary" @click="exportForm" :disabled="isExport" style="margin-bottom: 10px">导出表格</el-button>-->



        <el-table :data="tableData" ref="userListTable" border class="table" id="userListTable">
          <el-table-column label="序号" type="index" width="50"></el-table-column>

          <el-table-column property="userId" label="用户ID" width="120">
            <template slot-scope="scope">
              <el-button type="text" @click="handleDetail(scope.$index, scope.row)">{{scope.row.userId}}</el-button>
            </template>
          </el-table-column>

          <el-table-column property="account" label="账号" width="130"></el-table-column>
          <el-table-column property="userName" label="姓名" width="120"></el-table-column>
          <el-table-column property="nickName" label="昵称" width="120"></el-table-column>
          <el-table-column property="sex" label="性别" width="120"></el-table-column>
          <el-table-column property="show" label="是否屏蔽" width="120"></el-table-column>
          <!--
          <el-table-column property="region" label="所在地"></el-table-column>
          -->
        </el-table>
        <div class="pagination">
          <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" :page-size="filterForm.size">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    import {queryUserByName,queryUserByAccount,queryUserById,queryUserByNickName, screenUser} from "../../assets/api/global_request";
    import {timestamp2DateString, timestamp2DateString_} from "../../assets/api/date";
    export default {
      name: "UserList",
      data(){
        return{
          type:0,
          form:{
            userId:'',
            userName:'',
            nickName:'',
            account:'',
            serialNumber:'',
          },
          total:1,
          filterForm:{
            sex:-2,
            exit:-2,
            size:20,
            index:1,
            certificate:0,
            showType:-2,
            accountType:0,
            graduate:-2,
            vipType:0,
            highStart:0,
            highEnd:0,
            createTime:0,
            startTime:'',
            endTime:'',
            lastActive:0,
            school:0,
            education:0,
            region:0,
            tag:0
          },
          tags:[
            {
              label:"不限",
              value:0
            },
            {
              label:"颜值在线",
              value:1
            },
            {
              label:"颜值低，照片不认真",
              value:2
            },
          ],
          regions:[
            {
              label:"不限",
              value:0
            },
            {
              label:"北京",
              value:1
            },
            {
              label:"上海",
              value:2
            },
          ],
          educations:[
            {
              label:"不限",
              value:0
            },
            {
              label:"本科",
              value:1
            },
            {
              label:"硕士",
              value:2
            },
            {
              label:"博士及以上",
              value:3
            },
            {
              label:"专科",
              value:4
            },
          ],
          schools:[
            {
              label:"不限",
              value:0
            },
            {
              label:"清华",
              value:1
            },
            {
              label:"北大",
              value:2
            },
          ],
          lastActives:[
            {
              label:"不限",
              value:0
            },
            {
              label:"3天内",
              value:1
            },
            {
              label:"7天内",
              value:2
            },
            {
              label:"一个月内",
              value:3
            },
            {
              label:"一个月外",
              value:4
            },
          ],
          createTimes:[
            {
              label:"不限",
              value:0
            },
            {
              label:"今日",
              value:1
            },
            {
              label:"昨日",
              value:2
            },
            {
              label:"自然周",
              value:3
            },
            {
              label:"自然月",
              value:4
            },
            {
              label:"最近7天",
              value:5
            },
            {
              label:"最近30天",
              value:6
            },
          ],
          vipTypes:[
            {
              label:"不限",
              value:0
            },
            {
              label:"非VIP",
              value:1
            },
            {
              label:"充值VIP",
              value:2
            },
            {
              label:"体验VIP",
              value:3
            },
            {
              label:"钻石VIP",
              value:4
            },
          ],
          graduates:[
            {
              label:"不限",
              value:-2
            },
            {
              label:"毕业",
              value:1
            },
            {
              label:"在校",
              value:0
            },
          ],
          accountTypes:[
            {
              label:"不限",
              value:0
            },
            {
              label:"正常",
              value:1
            },
            {
              label:"注销",
              value:2
            },
            {
              label:"冻结",
              value:3
            }],
          showTypes:[
            {
              label:"不限",
              value:-2
            },
            {
              label:"显示",
              value:1
            },
            {
              label:"屏蔽",
              value:0
            }],
          certificates:[
            {
              label:"不限",
              value:0
            },
            {
              label:"全部认证",
              value:1
            },
            {
              label:"仅身份证认证",
              value:2
            },
            {
              label:"仅学生证认证",
              value:3
            },
            {
              label:"未认证",
              value:4
            }],
          sex:[
            {
              label:"不限",
              value:-2
            },
            {
              label:"男",
              value:0
            },
            {
              label:"女",
              value:1
            }],
          selectTime:true,
          showMoreSelect:false,
          url:'/static/userList.json',
          tableData:[],
          isExport:false,
          index:1
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
          var obj=this;
          this.index = val;
          console.log("当前页码：" + val);
          this.onSubmit(obj.type);

          //this.getData();
        },
        // 获取数据
        getData() {
          this.$axios.get(this.url).then((res) => {
            this.tableData = res.data.list;
          })
          /*this.$axios.post(this.url, {
            page: this.cur_page
          }).then((res) => {
            this.tableData = res.data.list;
          })*/
        },

        //查找

        onSubmit(type) {
          this.type=type;
          let nickName = this.form.nickName;
          let name = this.form.userName;
          let userId = parseInt(this.form.userId);
          let account = this.form.account;
          let token=localStorage.getItem("adminToken");
          let adminId=localStorage.getItem("adminId");
          let obj = this;
          let pageSize=this.filterForm.size;
          if(type==1){
            queryUserById(token,adminId,userId,this.index,pageSize)
              .then(function (data){
                  obj.tableData=[]
                  console.log("userListTest-----"+data);
                  data=data.result;
                  obj.total=data.total;
                  // console.log("total---"+obj.total);
                  for(let i = 0;i < data.total;i++){
                   /* console.log("i--"+i);*/
                    if(data.list[i].cSex==1)
                      data.list[i].cSex='女';
                    else
                      data.list[i].cSex ='男';
                    if(data.list[i].cShow==1)
                      data.list[i].cShow='显示'
                    else
                      data.list[i].cShow='屏蔽'
                    let json = {
                      "userId": data.list[i].cId,
                      "account":data.list[i].cAccount,
                      "userName":data.list[i].cName,
                      "nickName":data.list[i].cNickName,
                      "sex":data.list[i].cSex,
                      "show":data.list[i].cShow

                    };
                    obj.tableData.push(json);
                  }

                console.log(obj.tableData);
                obj.$message.success('查询成功！');

                }
              );

          }else if(type==2){
            queryUserByName(token,adminId,name,this.index,pageSize)
              .then(function (data){
                  obj.tableData=[]
                  console.log(data);
                  data=data.result;
                  obj.total=data.total;
                console.log("total---"+obj.total);
                  for(let i = 0;i < data.total;i++){
                  /*  console.log("i--"+i);*/
                    if(data.list[i].cSex==1)
                      data.list[i].cSex='女';
                    else
                      data.list[i].cSex ='男';
                    if(data.list[i].cShow==1)
                      data.list[i].cShow='显示'
                    else
                      data.list[i].cShow='屏蔽'
                    let json = {
                      "userId": data.list[i].cId,
                      "account":data.list[i].cAccount,
                      "userName":data.list[i].cName,
                      "nickName":data.list[i].cNickName,
                      "sex":data.list[i].cSex,
                      "show":data.list[i].cShow
                    };
                    obj.tableData.push(json);

                  }
                console.log(obj.tableData);
                obj.$message.success('提交成功！');
                }
              );
          }else if(type==3){
            queryUserByNickName(token,adminId,nickName,this.index,pageSize)
              .then(function (data){
                  obj.tableData=[]
                  console.log(data);
                  data=data.result;
                  obj.total=data.total;
                  for(let i = 0;i < data.total;i++){
                    if(data.list[i].cSex==1)
                      data.list[i].cSex='女';
                    else
                      data.list[i].cSex ='男';
                    if(data.list[i].cShow==1)
                      data.list[i].cShow='显示'
                    else
                      data.list[i].cShow='屏蔽'
                    let json = {
                      "userId": data.list[i].cId,
                      "account":data.list[i].cAccount,
                      "userName":data.list[i].cName,
                      "nickName":data.list[i].cNickName,
                      "sex":data.list[i].cSex,
                      "show":data.list[i].cShow
                    };
                    obj.tableData.push(json);

                  }
                console.log(obj.tableData);
                obj.$message.success('提交成功！');
                }
              );
          }else if(type==4){
            queryUserByAccount(token,adminId,account,this.index,pageSize)
              .then(function (data){
                  obj.tableData=[]
                  console.log(data);
                  data=data.result;
                  obj.total=data.total;
                  for(let i = 0;i < data.total;i++){
                    if(data.list[i].cSex==1)
                      data.list[i].cSex='女';
                    else
                      data.list[i].cSex ='男';
                    if(data.list[i].cShow==1)
                      data.list[i].cShow='显示'
                    else
                      data.list[i].cShow='屏蔽'
                    let json = {
                      "userId": data.list[i].cId,
                      "account":data.list[i].cAccount,
                      "userName":data.list[i].cName,
                      "nickName":data.list[i].cNickName,
                      "sex":data.list[i].cSex,
                      "show":data.list[i].cShow
                    };
                    obj.tableData.push(json);

                  }
                console.log(obj.tableData);
                obj.$message.success('提交成功！');
                }
              );
          }


        },

        handleDetail(index,row){
          //去到详情页

          this.$router.push({
            path:'/userDetail',
            query:{userId:row.userId}
          })
        },

        onFilter(){
          let sex = this.filterForm.sex;
          let show = this.filterForm.showType;
          let exit = this.filterForm.exit;
          let graduate = this.filterForm.graduate;
          let heightFrom = this.filterForm.highStart;
          let heightTo   = this.filterForm.highEnd;
          let createTimeFrom = timestamp2DateString_(this.filterForm.startTime);
          let createTimeTo  = timestamp2DateString_(this.filterForm.endTime);
          if(createTimeFrom.indexOf('NaN') !== -1){
            createTimeFrom = '';
          }
          if(createTimeTo.indexOf('NaN') !== -1){
            createTimeTo = '';
          }
          let size = this.filterForm.size;
          //let index = this.filterForm.index;
          let obj = this;
          screenUser(sex,show,exit,graduate,heightFrom,heightTo,createTimeFrom,createTimeTo,size,this.index)
            .then(function (data){
              obj.tableData=[]
              console.log(data)
              data=data.screenResult;
              for(let i = 0;i < data.length;i++){
                if(data[i].sex==1)
                  data[i].sex='女';
                if(data[i].sex==0)
                  data[i].sex ='男';
                if(data[i].show==1)
                  data[i].show='显示';
                if(data[i].show==0)
                  data[i].show='屏蔽';
                if(data[i].show=="")
                  data[i].show='无状态';
                let json = {
                  "userId": data[i].id,
                  "account":data[i].account,
                  "userName":data[i].name,
                  "nickName":data[i].nickName,
                  "sex":data[i].sex,
                  "show":data[i].show
                };
                obj.tableData.push(json);
                console.log(obj.tableData);
              }


              }
            );
          this.$message.success('筛选成功！');
        },
        onShow(){
          this.selectTime = !this.selectTime;
        },
        onMoreSelect(){
          this.showMoreSelect = !this.showMoreSelect;
        },
        exportForm(){
          /* generate workbook object from table */
          var wb = XLSX.utils.table_to_book(document.querySelector('#userListTable'))
          /* get binary string as output */
          var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
          try {
            FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
          } catch (e) {
            if (typeof console !== 'undefined')
              console.log(e, wbout)
          }
          this.$message.success("导出表格");
          this.isExport = true;
          return wbout
        }
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
