<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> Vip统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <h3>VIP{{daySum}}日概况</h3>
      <el-date-picker
        style="margin-top: 10px;margin-bottom: 10px"
        v-model="value7"
        type="daterange"
        align="right"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2">
      </el-date-picker>

      <el-table :data="tableData" border show-summary  style="width: 100%;font-size: 15px">
        <el-table-column prop="time" sortable label="时间">
        </el-table-column>
        <el-table-column prop="schInMon" sortable label="月卡人数(校内)">
        </el-table-column>
        <el-table-column prop="schInSea" sortable label="季卡人数(校内)">
        </el-table-column>
        <el-table-column prop="schInYear" sortable label="年卡人数(校内)">
        </el-table-column>
        <el-table-column prop="schOutMon" sortable label="月卡人数(校外)">
        </el-table-column>
        <el-table-column prop="schOutSea" sortable label="季卡人数(校外)">
        </el-table-column>
        <el-table-column prop="schOutYear" sortable label="年卡人数(校外)">
        </el-table-column>
        <el-table-column prop="sum" sortable label="收益">
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 20px">
      <h3>VIP月统计</h3>
      <el-date-picker
        style="margin-top: 10px;margin-bottom: 10px"
        v-model="value5"
        type="year"
        placeholder="选择年">
      </el-date-picker>

      <el-table :data="tableDataMonth" border show-summary  style="width: 100%;font-size: 15px">
        <el-table-column prop="time" sortable label="时间(月)">
        </el-table-column>
        <el-table-column prop="schInMon" sortable label="月卡人数(校内)">
        </el-table-column>
        <el-table-column prop="schInSea" sortable label="季卡人数(校内)">
        </el-table-column>
        <el-table-column prop="schInYear" sortable label="年卡人数(校内)">
        </el-table-column>
        <el-table-column prop="schOutMon" sortable label="月卡人数(校外)">
        </el-table-column>
        <el-table-column prop="schOutSea" sortable label="季卡人数(校外)">
        </el-table-column>
        <el-table-column prop="schOutYear" sortable label="年卡人数(校外)">
        </el-table-column>
        <el-table-column prop="sum" sortable label="收益">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
    export default {
      name: "VipStatistics",
      data(){
        return{
          day:7,
          value7: [],
          value5:'',
          pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },

          prices:{
            schInMon:1,
            schInSea:1,
            schInYear:1,
            schOutMon:1,
            schOutSea:1,
            schOutYear:1
          },
          tableData1:[
            {
              time:'',
              schInMon:1,
              schInSea:1,
              schInYear:1,
              schOutMon:1,
              schOutSea:1,
              schOutYear:1
            },
            {
              time:'',
              schInMon:1,
              schInSea:1,
              schInYear:1,
              schOutMon:1,
              schOutSea:1,
              schOutYear:1
            },
            {
              time:'',
              schInMon:1,
              schInSea:1,
              schInYear:1,
              schOutMon:1,
              schOutSea:1,
              schOutYear:1
            }
          ],
          tableData2:[
            {
              time:1,
              schInMon:1,
              schInSea:1,
              schInYear:1,
              schOutMon:1,
              schOutSea:1,
              schOutYear:1
            }
          ]
        }
      },
      created(){
        this.getTime()
      },
      computed:{
        daySum(){
          this.day = (new Date(this.value7[1]).getTime()-new Date(this.value7[0]).getTime())/(3600*1000*24)
          return this.day
        },
        //计算合计内容
        tableData(){
          this.tableData1.map((v,i)=>{
            v.time = this.formatTime(new Date(new Date(this.value7[0]).getTime()+3600 * 1000 * 24*i))
            v.sum = this.prices.schInMon*v.schInMon+this.prices.schInSea*v.schInSea+this.prices.schInYear*v.schInYear+
            this.prices.schOutMon*v.schOutMon+this.prices.schOutSea*v.schOutSea+this.prices.schOutYear*v.schOutYear;
          })
          return this.tableData1;
        },
        //计算每月内容
        tableDataMonth(){
          this.tableData2.map((v,i)=>{
            v.sum = this.prices.schInMon*v.schInMon+this.prices.schInSea*v.schInSea+this.prices.schInYear*v.schInYear+
              this.prices.schOutMon*v.schOutMon+this.prices.schOutSea*v.schOutSea+this.prices.schOutYear*v.schOutYear;
          })
          return this.tableData2;
        }
      },
      methods:{
        getTime(){
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          const startTime = this.formatTime(end);
          const endTime = this.formatTime(start);
          this.value7.push(endTime)
          this.value7.push(startTime)

          this.value5 = new Date()
        },
      }
    }
</script>

<style scoped>

</style>
