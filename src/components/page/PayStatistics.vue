<template>
  <div id="activeStatistics">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 付费统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form :model="form" ref="form" :inline="true" style="float:right" :rules="rules">
        <el-form-item prop="time">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            :value-format="'yyyy-MM-dd'"
            :format="'yyyy-MM-dd'">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="clear:both"></div>

    <div class="border">
      <div class="title">统计数据</div>
      <el-row style="margin-top: 20px;margin-bottom: 20px;">
        <el-col :span="7" style="margin-left: 55px">
          <div class="box" style="background-color:#5ea4fe;">
            <p class="number">{{allPayMoney}}<span style="font-size: 22px"> 元</span></p>
            <p class="explain">订单金额 <span style="margin-left: 6px;">{{allPayTimes}}笔</span></p>
          </div>
        </el-col>
        <el-col :span="7" style="margin-left: 30px">
          <div class="box" style="background-color:#708ee7;">
            <p class="number">{{androidPayMoney}}<span style="font-size: 22px"> 元</span></p>
            <p class="explain">安卓金额 <span style="margin-left: 6px;">{{androidPayTimes}}笔</span></p>
          </div>
        </el-col>
        <el-col :span="7" style="margin-left: 30px">
          <div class="box" style="background-color:mediumpurple;">
            <p class="number">{{iosPayMoney}}<span style="font-size: 22px"> 元</span></p>
            <p class="explain">苹果金额 <span style="margin-left: 6px;">{{iosPayTimes}}笔</span></p>
          </div>
        </el-col>
      </el-row>

      <div>
        <el-table ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  style="width:90%;margin-left: 90px">

          <el-table-column
            label="购买时间"
            prop="startTime">
          </el-table-column>

          <el-table-column
            label="VIP卡名称"
            prop="vipId">
          </el-table-column>

          <el-table-column label="买家信息">
            <template slot-scope="scope">
              <el-button type="text" title="点击查看买家详细信息" @click="handleDetail(scope.$index, scope.row)">{{scope.row.userId}}</el-button>
            </template>

          </el-table-column>

          <el-table-column
            label="订单金额"
            prop="pay">
          </el-table-column>

          <el-table-column
            label="平台"
            prop="equipment">
          </el-table-column>

        </el-table>

        <div style="height: 20px"></div>
        <span style="margin-left: 20px;font-size: 14px;color: #696969">共 {{this.total}} 条记录,每页显示
      <template>
        <el-select v-model="pageSize" style="width: 75px" @change="changePageSize">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      条记录</span>
        <div style="float: right;">  <!--分页显示-->
          <el-pagination
            background
            layout="prev,pager,next,jumper"
            :total="total"
            :current-page="currentPage"
            :page-size="pageSize"
            :disabled="loading"
            @current-change="changePage">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getPayList} from "../../assets/api/global_request";
  import {changeTime} from "../../assets/api/utils";
  import {getVipList} from "../../assets/api/global_request";

  export default {
    name: "PayStatistics",
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        form: {
          time: []
        },
        rules: {
          time: [{required: true, message: '请选择要查询的时间段', trigger: 'blur'}],
        },
        allPayMoney: 0,
        allPayTimes: 0,
        androidPayMoney: 0,
        androidPayTimes: 0,
        iosPayMoney: 0,
        iosPayTimes: 0,
        tableData: [],
        //显示是否加载中提示
        loading: false,
        currentPage: 1,
        total: 0,
        pageSize: 5,
        options: [{
          value: 5,
          label: 5
        }, {
          value: 10,
          label: 10
        }, {
          value: 15,
          label: 15
        }, {
          value: 20,
          label: 20
        }],
      }
    },
    created() {
      this.form.time[0] = changeTime(new Date().getTime() - 3600 * 1000 * 24 * 1);
      this.form.time[1] = changeTime(new Date().getTime());
    },
    mounted() {
      let param = {
        "startTime": changeTime(new Date().getTime() - 3600 * 1000 * 24 * 1), //默认为全部平台+ 昨天的数据
        "endTime": changeTime(new Date().getTime()),
        "pageSize": this.pageSize,
        "pageNum": 1
      };
      this.loadData(param);
    },

    methods: {
      loadData(param) {
        this.loading = true;
        getPayList(param)
          .then(data => {
            this.allPayMoney = ((data.result.totalBillAmount*1000).toFixed(4))/1000;
            this.allPayTimes = data.result.totalBills;
            this.androidPayMoney = (data.result.androidTotalBillAmount*1000).toFixed(4)/1000;
            this.androidPayTimes = data.result.androidTotalBills;
            this.iosPayMoney = ((data.result.iosTotalBillAmount*1000).toFixed(4))/1000;
            this.iosPayTimes = data.result.iosTotalBills;
            this.total = data.result.totalBills; //数目
            let list = data.result.vipTradeModelList;
            getVipList({})
              .then(data=>{
                this.tableData = list; //之前写在getVip外面时，出现了异步现象
                for(let i = 0;i < this.tableData.length;i++){
                  for(let j = 0;j < data.result.length;j++){
                    if(this.tableData[i].vipId === data.result[j].cId)
                      this.tableData[i].vipId = data.result[j].cName;
                  }
                }
                this.loading = false;
              })
          });
        this.$message.success('数据加载成功');
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              "startTime": this.form.time[0],
              "endTime": this.form.time[1],
              "pageSize": this.pageSize,
              "pageNum": 1
            };
            this.loadData(param);
          }
          else {
            return false;
          }
        })
      },
      handleDetail(index,row){
        //去到详情页
        this.$router.push({
          path:'/userDetail',
          query:{userId:row.userId}
        })
      },
      changePageSize(value) { //更改选择器
        let param = {
          "startTime": this.form.time[0],
          "endTime": this.form.time[1],
          "pageSize": value,
          "pageNum": 1
        };
        this.loadData(param);
      },
      changePage(val) { //更改页数
        let param = {
          "startTime": this.form.time[0],
          "endTime": this.form.time[1],
          "pageSize": this.pageSize,
          "pageNum": val
        };
        this.loadData(param);
      },
    }
  }
</script>

<style scoped>
  .border {
    margin: 2px 5px 0 5px;
    background-color: #fff;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
    padding-bottom: 15px;
  }

  .title {
    border-bottom: 1px solid #cbcbcb;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #636363;
    padding-left: 10px;
  }

  .box {
    width: 260px;
    height: 90px;
    margin-left: 40px;
  }

  .number {
    font-size: 29px;
    color: #ffffff;
    padding-left: 16px;
    padding-top: 26px
  }

  .explain {
    font-size: 13px;
    color: #ffffff;
    padding-left: 18px
  }
</style>
