<template xmlns:clear="http://www.w3.org/1999/xhtml">
  <div id="activeStatistics">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 活跃统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-form :model="form" ref="form" :inline="true" style="float:right" :rules="rules">
        <el-form-item>
          <el-select v-model="form.stage" class="handle-select mr10">
            <el-option v-for="item in stages" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
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

      <div style="clear:both"></div>

      <!--第一部分图表-->
      <div class="border">
        <div class="title">统计数据</div>
        <div>
          <el-row style="margin-top: 20px;margin-bottom: 20px;">
            <el-col :span="4" style="margin-left: 30px">
              <div class="box" style="background-color:#5ea4fe;">
                <p class="number">{{allUsers}}</p>
                <p class="explain">累计用户(除注销)</p>
              </div>
            </el-col>
            <el-col :span="4" style="margin-left: 30px">
              <div class="box" style="background-color:#708ee7;">
                <p class="number">{{addUsers}}</p>
                <p class="explain">新增人数</p>
              </div>
            </el-col>
            <el-col :span="4" style="margin-left: 30px">
              <div class="box" style="background-color:mediumpurple;">
                <p class="number">{{certifUsers}}</p>
                <p class="explain">认证人数</p>
              </div>
            </el-col>
            <el-col :span="4" style="margin-left: 30px">
              <div class="box" style="background-color:#07c7ff;">
                <p class="number">{{activeUsers}}</p>
                <p class="explain">活跃人数</p>
              </div>
            </el-col>
            <el-col :span="4" style="margin-left: 30px">
              <div class="box" style="background-color:cornflowerblue;">
                <p class="number">{{exitUsers}}</p>
                <p class="explain">注销人数(总)</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div id="personNumber" :style="{height: '380px',marginLeft:'20px',marginBottom:'40px'}"></div>
      </div>
    </div>

    <!--第二部分图表-->
    <el-row :gutter="20" class="row" style="margin-top: 20px">
      <el-col :span="12">
        <div class="border">
          <div class="caption">区域新增</div>
          <div v-show="regionName.length === 0">
            <div
              style="height: 360px;margin-left: 20px;margin-bottom: 40px;text-align: center;line-height: 360px;font-size: 18px;color: #8f9fb4">
              该时间段无区域新增
            </div>
          </div>
          <div id="addRegion" style="height:360px;margin-left: 20px;margin-bottom: 40px;display: none;"></div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="border">
          <div class="caption">学校新增</div>
          <div v-show="schoolName.length === 0">
            <div
              style="height: 360px;margin-left: 20px;margin-bottom: 40px;text-align: center;line-height: 360px;font-size: 18px;color: #8f9fb4">
              该时间段无学校新增
            </div>
          </div>
          <div id="addSchool" style="height:360px;margin-left: 20px;margin-bottom: 40px;display: none;"></div>
        </div>
      </el-col>
    </el-row>

    <!--第三部分图表-->
    <el-row :gutter="20" class="row" style="margin-top: 25px">
      <el-col :span="12">
        <div class="border" style="position: relative">
          <div class="caption">机型分布总(所有统计到的用户)</div>
          <div id="equipment" :style="{height: '360px',marginLeft:'20px',marginBottom:'40px'}"></div>
          <!--为ECharts新增一个DOM空间-->
          <div style="position: absolute;left: 46%;top: 45%;">
            <p style="font-size: 29px">{{chooseEquipment.data}}%</p>
            <p style="font-size: 16px;margin-left: 22px;margin-top: 3px">{{chooseEquipment.value}}</p>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="border" style="position: relative">
          <div class="caption">校内校外分布</div>
          <div id="distribute" :style="{height: '360px',marginLeft:'20px',marginBottom:'40px'}"></div>
          <div style="position: absolute;left: 46%;top: 45%;">
            <p style="font-size: 29px">{{chooseDistribute.data}}%</p>
            <p style="font-size: 16px;margin-left: 22px;margin-top: 3px">{{chooseDistribute.value}}</p>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import echarts from 'echarts';
  import {getStatisticalData} from "../../assets/api/global_request";
  import {changeTime} from "../../assets/api/utils";
  import {getSchoolMessage} from "../../assets/api/global_request";
  import {getAddressMessage} from "../../assets/api/global_request";
  import {dateToTime} from "../../assets/api/utils";

  export default {
    name: "ActiveStatistics",
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
          time: '',
          stage: '全部平台'
        },
        rules: {
          time: [{required: true, message: '请选择要查询的时间段', trigger: 'blur'}],
        },
        allUsers: 0,
        addUsers: 0,
        certifUsers: 0,
        activeUsers: 0,
        exitUsers: 0,
        stages: [
          {
            value: '全部平台',
            label: '全部平台'
          },
          {
            value: '安卓',
            label: '安卓'
          },
          {
            value: 'IOS',
            label: 'IOS'
          }
        ],
        deviceNUmber: {
          android: 0,
          ios: 0,
          others: 0
        },
        deviceUserStatisticsModelList: [], /*设备数据*/
        chooseEquipment: {
          /*选中显示*/
          value: '',
          data: ''
        },
        peopleDistribute: {
          /*人员分布*/
          numberOfPeopleOnCampus: '',
          numberOfPeopleOutsideTheSchool: '',
        },
        chooseDistribute: {
          value: '',
          data: ''
        },
        regionalStatisticsModelList: [], /*区域新增*/
        regionName: [],
        regionNum: [],
        regionList: [],

        schoolStatisticsModelList: [], /*学校新增*/
        schoolName: [],
        schoolNum: [],
        schoolList: [],

        userStatisticsModelList: [], /*用户每日统计集合*/
        statisticsTime: [],
        numberOfUsersType1: [],
        numberOfUsersType2: [],
        numberOfUsersType3: [],

      }
    },

    mounted() {
      let param = {
        "startTime": changeTime(new Date().getTime() - 3600 * 1000 * 24 * 1), //默认为全部平台+ 昨天的数据
        "endTime": changeTime(new Date().getTime()),
        "equipment": '全部平台'
      };
      this.saveData();
      this.loadData(param);
    },

    methods: {
      saveData() { //学校、地区信息存本地 第一次加载时较慢，之后则迅速
        let regionList = localStorage.getItem("regionList");
        let schoolList = localStorage.getItem("schoolList");
        if (regionList != null && schoolList != null) {
          this.regionList = JSON.parse(regionList);
          this.schoolList = JSON.parse(schoolList);
        } else {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          getAddressMessage({})
            .then(data => {
              this.regionList = data.result;
              localStorage.setItem("regionList", JSON.stringify(data.result));
              loading.close();
            });
          getSchoolMessage({})
            .then(data => {
              this.schoolList = data.result;
              localStorage.setItem("schoolList", JSON.stringify(data.result))
            });
        }
      },
      loadData(param) { //从后台获取数据（自定义传参）
        getStatisticalData(param)
          .then(data => {
            if (data.hasOwnProperty('success')) {
              console.log(data);
              this.allUsers = data.result.totalNumberOfUsers;
              /*五个数据*/
              this.addUsers = data.result.numberOfNewUsersInTheInterval;
              this.certifUsers = data.result.intervalUserAuthenticationNumber;
              this.activeUsers = data.result.intervalUserActiveNumber;
              this.exitUsers = data.result.userLogoutNumber;

              /*设备数据*/
              this.deviceUserStatisticsModelList = data.result.deviceUserStatisticsModelList;
              this.chooseEquipment.value = '苹果';
              if (this.deviceUserStatisticsModelList[0].userNumber + this.deviceUserStatisticsModelList[1].userNumber === 0)
                this.chooseEquipment.data = '0.00';
              else
                this.chooseEquipment.data = (100 * (this.deviceUserStatisticsModelList[0].userNumber / (this.deviceUserStatisticsModelList[0].userNumber + this.deviceUserStatisticsModelList[1].userNumber))).toFixed(2);

              /*分布数据*/
              this.peopleDistribute.numberOfPeopleOnCampus = data.result.numberOfPeopleOnCampus;
              this.peopleDistribute.numberOfPeopleOutsideTheSchool = data.result.numberOfPeopleOutsideTheSchool;
              this.chooseDistribute.value = '校外';
              if (this.peopleDistribute.numberOfPeopleOnCampus + this.peopleDistribute.numberOfPeopleOutsideTheSchool === 0)
                this.chooseDistribute.data = '0.00';
              else
                this.chooseDistribute.data = (100 * (this.peopleDistribute.numberOfPeopleOutsideTheSchool / (this.peopleDistribute.numberOfPeopleOnCampus + this.peopleDistribute.numberOfPeopleOutsideTheSchool))).toFixed(2);

              /*区域新增 学校新增*/
              this.regionalStatisticsModelList = data.result.regionalStatisticsModelList;
              this.regionName = [];//重置
              this.regionNum = [];
              for (let i = this.regionalStatisticsModelList.length - 1; i >= 0; i--) {
                if (this.regionalStatisticsModelList[i].primaryDirectoryId === 0)
                  break;
                this.regionName.push(this.regionList[this.regionalStatisticsModelList[i].primaryDirectoryId - 1].name);
                this.regionNum.push(this.regionalStatisticsModelList[i].distributionNumber);
              }
              this.drawLineAddRegion();//数据修改,图要重新绘画

              this.schoolStatisticsModelList = data.result.schoolStatisticsModelList;
              this.schoolName = [];//重置
              this.schoolNum = [];
              for (let i = this.schoolStatisticsModelList.length - 1; i >= 0; i--) {
                if (this.schoolStatisticsModelList[i].schoolId === 0)
                  break;
                this.schoolName.push(this.schoolList[this.schoolStatisticsModelList[i].schoolId - 1].cName);
                this.schoolNum.push(this.schoolStatisticsModelList[i].distributionNumber);
              }
              this.drawLineAddSchool();//数据修改,图要重新绘画

              /*用户数据折线图*/
              let beginDate = param.startTime; //直接遍历时间段，将时间段拆分开来
              let endDate = param.endTime;
              let date = beginDate;
              this.statisticsTime = [];
              while (date !== endDate) {
                this.statisticsTime.push(date);
                date = changeTime(dateToTime(new Date(date)) + 3600 * 1000 * 24 * 1); //getTime只有Date有这个方法
              }
              this.statisticsTime.push(endDate);

              //type = 1  新增人数;  type = 2  认证人数;  type = 3  活跃人数
              this.userStatisticsModelList = data.result.userStatisticsModelList;
              this.numberOfUsersType1 = [];
              this.numberOfUsersType2 = [];
              this.numberOfUsersType3 = [];
              for (let i = 0; i < this.statisticsTime.length; i++) { //修改数据
                for (let j = 0; j < this.userStatisticsModelList.length; j++) {
                  if (this.userStatisticsModelList[j].statisticsTime === this.statisticsTime[i]) {
                    if (this.userStatisticsModelList[j].type === 1) {
                      this.numberOfUsersType1.push(this.userStatisticsModelList[j].numberOfUsers);
                    } else if (this.userStatisticsModelList[j].type === 2) {
                      this.numberOfUsersType2.push(this.userStatisticsModelList[j].numberOfUsers);
                    } else if (this.userStatisticsModelList[j].type === 3) {
                      this.numberOfUsersType3.push(this.userStatisticsModelList[j].numberOfUsers);
                    }
                  }
                }
                if (this.numberOfUsersType1.length < i + 1)
                  this.numberOfUsersType1.push(0);
                if (this.numberOfUsersType2.length < i + 1)
                  this.numberOfUsersType2.push(0);
                if (this.numberOfUsersType3.length < i + 1)
                  this.numberOfUsersType3.push(0);
              }

              this.drawLinePersonNumber();
              this.drawLineEquipment();
              this.drawLineDistribute();
              this.$message.success('数据加载成功')
            }
          })
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = {
              "startTime": this.form.time[0],
              "endTime": this.form.time[1],
              "equipment": this.form.stage
            };
            this.loadData(param);
          } else {
            return false;
          }
        })
      },

      drawLinePersonNumber() {
        let myChart = this.$echarts.init(document.getElementById('personNumber'));
        myChart.setOption({
          tooltip: {  //每一列的数据
            trigger: 'axis'
          },
          legend: {
            data: ['新增用户(个)', '活跃用户(个)', '认证用户(个)'],
            x: 'center',
            y: 'bottom',
            itemGap: 50 //图例间距
          },
          toolbox: {
            feature: {}
          },
          calculable: true,
          grid: { //调整图表位置
            left: '3%',
            right: '4%',
            bottom: '12%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.statisticsTime
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              }
            }
          ],
          series: [
            {
              name: '新增用户(个)',
              type: 'line',
              //smooth: true, //平滑曲线
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: this.numberOfUsersType1
            },
            {
              name: '活跃用户(个)',
              type: 'line',
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: this.numberOfUsersType3
            },
            {
              name: '认证用户(个)',
              type: 'line',
              itemStyle: {normal: {areaStyle: {type: 'default'}}},
              data: this.numberOfUsersType2
            }
          ],
          color: ['rgba(112, 142, 231, 0.5)', 'rgba(7, 199, 255,0.5)', 'rgba(147, 112, 219,0.5)'],
        })
      },

      drawLineAddRegion() {
        let region = document.getElementById('addRegion');
        if (this.regionName.length > 0) {
          region.style.display = '';
          let myChart = this.$echarts.init(region);
          myChart.setOption({
            title: {
              text: 'TOP10 区域新增',
              textStyle: { //数值样式
                color: '#363636',
                fontSize: 15,
                fontWeight: null
              }
            },
            tooltip: {
              trigger: 'axis',
            },
            toolbox: {
              feature: {}
            },
            calculable: true,
            xAxis: {
              show: false
            },
            yAxis: [
              {
                type: 'category',
                data: this.regionName,
                axisLabel: {
                  textStyle: {
                    fontSize: 14
                  }
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false
                }
              }
            ],
            grid: { //调整图表位置
              top: '8%',
              left: '2%',
              right: '20%',
              bottom: '3%',
              containLabel: true
            },
            series: [
              {
                type: 'bar',
                //barWidth: 20,//柱图宽度
                //barGap:'80%',/*多个并排柱子设置柱子之间的间距*/
                //barCategoryGap:'50%',/*多个并排柱子设置柱子之间的间距*/
                data: this.regionNum,
                itemStyle: {// 设置边框的颜色和宽度
                  borderColor: "#a1a1a1",
                  borderWidth: 0.5,
                },
                position: 'top',
                label: {
                  show: true, //开启显示
                  position: 'right', //在右方显示

                  textStyle: { //数值样式
                    color: 'black',
                    fontSize: 14,
                  }
                }
              }
            ],
            color: ['#ffffff']
          })
        } else {
          region.style.display = 'none';
        }
      },

      drawLineAddSchool() {
        let school = document.getElementById('addSchool');
        if (this.schoolName.length > 0) {
          school.style.display = '';
          let myChart = this.$echarts.init(school);
          myChart.setOption({
            title: {
              text: 'TOP10 学校新增',
              textStyle: { //数值样式
                color: '#363636',
                fontSize: 15,
                fontWeight: null
              }
            },
            tooltip: {
              trigger: 'axis',
            },
            toolbox: {
              feature: {}
            },
            calculable: true,
            xAxis: {
              show: false
            },
            yAxis: [
              {
                type: 'category',
                data: this.schoolName,
                axisLabel: {
                  textStyle: {
                    fontSize: 14
                  }
                },
                axisLine: {
                  show: false,
                },
                axisTick: {
                  show: false
                }
              }
            ],
            grid: { //调整图表位置
              top: '8%',
              left: '2%',
              right: '20%',
              bottom: '3%',
              containLabel: true
            },
            series: [
              {
                type: 'bar',
                //barWidth: 20,//柱图宽度
                data: this.schoolNum,
                itemStyle: {// 设置边框的颜色和宽度
                  borderColor: "#a1a1a1",
                  borderWidth: 0.5,
                },
                label: {
                  show: true, //开启显示
                  position: 'right', //在右方显示

                  textStyle: { //数值样式
                    color: 'black',
                    fontSize: 14,
                  }
                }
              }
            ],
            color: ['#ffffff']
          })
        } else {
          school.style.display = 'none';
        }

      },

      drawLineEquipment() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('equipment'));
        let obj = this;
        // 绘制图表
        myChart.setOption({
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['安卓', '苹果'],
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  borderColor: "#FFFFFF", borderWidth: 1,
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#727272'  // 改变标示线的颜色
                  }
                },
                emphasis: {
                  lineStyle: {
                    color: '#727272'  // 改变标示线的颜色
                  }
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: "{b} : {c} 人",
                  textStyle: {
                    color: '#727272',
                  }
                },
                emphasis: {
                  show: true,
                }
              },
              data: [
                {value: obj.deviceUserStatisticsModelList[1].userNumber, name: '安卓'}, /*数据更改*/
                {value: obj.deviceUserStatisticsModelList[0].userNumber, name: '苹果'},
              ]
            }
          ],
          color: ['#2864fa', '#50b6ff']
        });
        myChart.on('mouseover', function (params) { /*添加鼠标事件*/
          obj.chooseEquipment.value = params.name;
          if (params.percent === 0)
            obj.chooseEquipment.data = '0.00';
          else
            obj.chooseEquipment.data = params.percent;
        });
      },

      drawLineDistribute() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('distribute'));
        let obj = this;
        // 绘制图表
        myChart.setOption({
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['校内', '校外'],
          },
          series: [
            {
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  borderColor: "#FFFFFF", borderWidth: 1,
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: '#727272'  // 改变标示线的颜色
                  }
                },
                emphasis: {
                  lineStyle: {
                    color: '#727272'  // 改变标示线的颜色
                  }
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'right',
                  formatter: "{b} : {c} 人",
                  textStyle: {
                    color: '#727272'
                  }
                },
                emphasis: {
                  show: true,
                }
              },
              data: [
                {value: obj.peopleDistribute.numberOfPeopleOnCampus, name: '校内'},
                {value: obj.peopleDistribute.numberOfPeopleOutsideTheSchool, name: '校外'},
              ]
            }
          ],
          color: ['#2864fa', '#50b6ff']
        });
        myChart.on('mouseover', function (params) { /*添加鼠标事件*/
          obj.chooseDistribute.value = params.name;
          if (params.percent === 0)
            obj.chooseDistribute.data = '0.00';
          else
            obj.chooseDistribute.data = params.percent;
        });
      }
    }
  }
</script>

<style scoped>
  .border {
    margin: 2px 5px 0 5px;
    background-color: #fff;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
  }

  .title {
    border-bottom: 1px solid #cbcbcb;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #636363;
    padding-left: 10px;
  }

  .caption {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #636363;
    padding-left: 18px;
  }

  .box {
    width: 200px;
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
    font-size: 12px;
    color: #ffffff;
    padding-left: 18px
  }
</style>
