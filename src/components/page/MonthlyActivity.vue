<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 月活统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-date-picker
        v-model="showTime"
        type="year"
        placeholder="选择年">
      </el-date-picker>

      <el-row :gutter="20">
        <el-col :span="12">
          <section class="chart-container">
            <div id="chartColumnPeople" style="width:100%; height:400px;"></div>
          </section>
        </el-col>
        <el-col :span="12">
          <section class="chart-container">
            <div id="chartColumnNum" style="width:100%; height:400px;"></div>
          </section>
        </el-col>
      </el-row>
    </div>


  </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
      name: "MonthlyActivity",
      data(){
        return{
          url:'/static/chartTable1.json',
          tableData:{},
          chartColumnPeople: null,
          chartColumnNum:null,
          xLabel:[],
          xDataLoginPeople:[],
          xDataLoginNum:[],
          showTime:'',

          //登录人数
          optionsLoginPeople:{
            title: {
              text: '登录人数',
              left:'center'
            },
            tooltip: {},
            xAxis: {
              data: []
            },
            yAxis: {},
            series: [{
              name: '登录人数',
              type: 'bar',
              data: []
            }]
          },
          //登录次数
          optionsLoginNum:{
            title: {
              text: '登录次数',
              left:'center'
            },
            tooltip: {},
            xAxis: {
              data: []
            },
            yAxis: {},
            series: [{
              name: '登录次数',
              type: 'bar',
              data: []
            }]
          },

        }
      },
      created(){
        this.getTime()
        this.getData()
      },
      mounted(){

      },
      updated(){

      },
      computed:{
        createOptionsLoginPeople(){
          this.optionsLoginPeople.xAxis.data = this.xLabel
          this.optionsLoginPeople.series[0].data = this.xDataLoginPeople

          this.optionsLoginNum.xAxis.data = this.xLabel
          this.optionsLoginNum.series[0].data = this.xDataLoginNum

          console.log(JSON.stringify(this.optionsLoginPeople))
          console.log(JSON.stringify(this.optionsLoginNum))

          return [this.optionsLoginPeople,this.optionsLoginNum]
        }
      },
      watch:{
        showTime(newValue,oldValue){
          console.log(newValue)
          this.createColumnChartData()
        }
      },
      methods:{
        //获取时间
        getTime(){
          this.showTime = new Date()
        },
        // 获取数据
        getData() {
          this.$axios.get(this.url).then((res) => {
            this.tableData = res.data
            this.createColumnChartData()
          })
        },

        //创建图表显示内容
        createColumnChartData(){
          this.xLabel = []
          this.xDataLoginPeople = []
          this.xDataLoginNum = []
          var year = this.showTime.getFullYear()
          if(this.tableData.hasOwnProperty(year)){
            var data1 = this.tableData[year]
            for(var i=0;i<data1.length;i++){
              this.xLabel.push(i+1)
            }
            for(var item in data1) {
              for (var key in data1[item]) {
                this.xDataLoginPeople.push(data1[item][key].loginPeople)
                this.xDataLoginNum.push(data1[item][key].loginNum)
              }
            }
          }
          this.drawColumnChart()
        },


        //创建所有图表的方法
        drawColumnChart(){
          this.drawColumnChartPeople();
          this.drawColumnChartNum()
        },

        //创建登录人数图表
        drawColumnChartPeople() {
          this.chartColumnPeople = echarts.init(document.getElementById('chartColumnPeople'));
          this.chartColumnPeople.setOption(this.createOptionsLoginPeople[0]);
        },
        //创建登录次数图表
        drawColumnChartNum() {
          this.chartColumnNum = echarts.init(document.getElementById('chartColumnNum'));
          this.chartColumnNum.setOption(this.createOptionsLoginPeople[1]);
        },


      },
    }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    float: left;
    margin-top: 10px;
  }
  .el-col {
    padding: 30px 20px;
  }
</style>
