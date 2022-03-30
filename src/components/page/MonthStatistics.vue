<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 每月统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-form :model="form" :inline="true" >
        <el-form-item label="时间:">
          <el-date-picker
            v-model="form.value"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <h3 style="margin-top: 10px;margin-bottom: 10px">每月统计</h3>
      <!-- 表格---start -->
      <el-table :data="tableData" v-loading="listLoading" class="table" border style="width: 100%;font-size: 15px"
                ref="codeListTable">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column property="rank" sortable label="排名" width="80"></el-table-column>
        <el-table-column property="code" label="邀请码"></el-table-column>
        <el-table-column property="password" label="密码"></el-table-column>
        <el-table-column property="registerNum" label="注册人数"></el-table-column>
        <el-table-column property="certificateNum" label="认证人数"></el-table-column>
        <el-table-column property="dayCard" label="日卡" width="80px"></el-table-column>
        <el-table-column property="monthCard" label="月卡" width="80px"></el-table-column>
        <el-table-column property="seasonCard" label="季卡" width="80px"></el-table-column>
        <el-table-column property="yearCard" label="年卡" width="80px"></el-table-column>
        <el-table-column property="sum" sortable label="费用合计">
        </el-table-column>
      </el-table>
    </div>

    <div class="container" style="margin-top: 20px">
      <h3 style="margin-top: 10px;margin-bottom: 10px">总统计</h3>
      <!-- 表格---start -->
      <el-table :data="tableData" v-loading="listLoading" class="table" border style="width: 100%;font-size: 15px"
                ref="codeListTable">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column property="rank" sortable label="排名" width="80"></el-table-column>
        <el-table-column property="code" label="邀请码"></el-table-column>
        <el-table-column property="password" label="密码"></el-table-column>
        <el-table-column property="registerNum" label="注册人数"></el-table-column>
        <el-table-column property="certificateNum" label="认证人数"></el-table-column>
        <el-table-column property="dayCard" label="日卡" width="80px"></el-table-column>
        <el-table-column property="monthCard" label="月卡" width="80px"></el-table-column>
        <el-table-column property="seasonCard" label="季卡" width="80px"></el-table-column>
        <el-table-column property="yearCard" label="年卡" width="80px"></el-table-column>
        <el-table-column property="sum" sortable label="费用合计">
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
    export default {
      name: "MonthStatistics",
      data(){
        return{
          url:'/static/codeOperate.json',
          listLoading:false,
          tableData1:[],
          form:{
            value:'',
          },
          prices:{
            day:1,
            month:2,
            season:3,
            year:4
          },
        }
      },
      created(){
        this.getData()
        this.getTime()
      },
      computed:{
        //计算合计内容
        tableData(){
          this.tableData1.map((v,i)=>{
            v.sum = this.prices.day*v.dayCard+this.prices.month*v.monthCard+this.prices.season*v.seasonCard+this.prices.year*v.yearCard
          })
          return this.tableData1;
        },
      },
      methods:{
        // 获取数据
        getData() {
          this.$axios.get(this.url).then((res) => {
            this.tableData1 = res.data.list;
          })
        },
        //获取当前时间
        getTime(){
          this.form.value = new Date()
        },
        //查询
        onSubmit(){

        },
      }
    }
</script>

<style scoped>
  .table{
    width: 100%;
    font-size:14px;
  }
</style>
