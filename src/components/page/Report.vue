<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 举报审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="container">
          <div class="handle-box">
            <el-row>
              <el-col :span="8">
                <el-button type="primary">审核条件</el-button>
                <el-select v-model="select_review" class="handle-select mr10" @change="selectedChange">
                  <el-option v-for="item in review" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>

          <el-table :data="tableData" border class="table">
            <el-table-column prop="date" label="举报日期" sortable width="150"></el-table-column>
            <el-table-column prop="reportName" show-overflow-tooltip label="举报人（昵称）" width="100"></el-table-column>
            <el-table-column prop="reportId" show-overflow-tooltip label="举报人id" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDetail(scope.$index, scope.row,scope.row.reportId)">{{scope.row.reportId}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="beReportName" show-overflow-tooltip label="被举报人（昵称）" width="100"></el-table-column>
            <el-table-column prop="beReportId" show-overflow-tooltip label="被举报人id" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDetail(scope.$index, scope.row,scope.row.beReportId)">{{scope.row.beReportId}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="reportType" label="举报类型" width="200"></el-table-column>
            <el-table-column fixed="right" label="举报详情" width="150">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleReported(scope.$index, scope.row)">举报详情</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="page.total" :page-size="page.size" :current-page="page.current">
            </el-pagination>
          </div>
        </div>
      </el-col>

      <el-col :span="8" v-if="edit">
        <div class="container">
          <el-row v-if="select_review === 0">
            <el-card>
              <div style="margin-bottom: 10px;">
                <span style="font-size: 20px">{{form.reportName}}</span>
                <span style="color: #ff4d51;font-size: 20px">举报</span>
                <span style="font-size: 20px">{{form.beReportName}}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span>举报类型：{{form.reportType}}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span>举报原因：{{form.reportReason}}</span>
              </div>
              <img  :src="form.reportImage" :key="index" class="image">
              <div style="text-align: center;vertical-align: middle;margin-top: 10px">
                <el-select v-model="select_method" class="handle-select mr10">
                  <el-option v-for="item in methods" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
                <el-button type="primary" round class="box_button" @click="handle(1)">通过</el-button>
                <el-button type="success" round class="box_button" @click="handle(2)">驳回</el-button>
              </div>
            </el-card>
          </el-row>

          <el-row style="margin-top: 10px" v-else-if="select_review === 1">
            <el-card>
              <div style="margin-bottom: 10px;">
                <span style="font-size: 20px">{{this.form.reportName}}</span>
                <span style="color: #ff4d51;font-size: 20px">举报</span>
                <span style="font-size: 20px">{{this.form.beReportName}}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span>举报类型：{{this.form.reportType}}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span>举报原因：{{this.form.reportReason}}</span>
              </div>
              <img  :src="form.reportImage"  class="image">
              <div style="text-align: center;vertical-align: middle;margin-top: 10px">
                <span>{{this.form.approach}}</span>
                <el-button type="success" round class="box_button">驳回</el-button>
              </div>
            </el-card>
          </el-row>

          <el-row style="margin-top: 10px" v-else-if="select_review === 2">
            <el-card>
              <div style="margin-bottom: 10px;">
                <span style="font-size: 20px">{{this.form.reportName}}</span>
                <span style="color: #ff4d51;font-size: 20px">举报</span>
                <span style="font-size: 20px">{{this.form.beReportName}}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span>举报类型：{{this.form.reportType}}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <span>举报原因：{{this.form.reportReason}}</span>
              </div>
              <img  :src="this.form.reportImage"  class="image">

            </el-card>
          </el-row>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {getReport, reportDetail, updateReportState,userIntroduce} from "../../assets/api/global_request";
    import {timestamp2DateString_} from "../../assets/api/date";

    export default {
      name: "Report",
      data(){
        return{
          review:[
            {
              value:0,
              label:'待审核'
            },
            {
              value:1,
              label:'举报通过'
            },
            {
              value:2,
              label:'举报未通过'
            }
          ],
          select_review:0,
          methods:[
            {
              value:-1,
              label:'冻结7日'
            },
            {
              value:-2,
              label:'冻结30日'
            },
            {
              value:-3,
              label:'永久冻结'
            }
          ],
          select_method:-1,
          url:'/static/reportable.json',
          tableData:[],
          form: {
            date: '',
            reportName:'',
            reportId:'',
            beReportName: '',
            beReportId:'',
            reportReason:'',
            reportImage:''
          },
          idx: -1,
          radio1:1,
          radio2:1,
          radio3:1,
          edit:false,
          page:{
            current:1,
            total:0,
            size:10,
          }
        }
      },
      mounted(){
        this.getData()
      },
      computed:{

      },
      methods: {
        // 分页导航
        handleCurrentChange(val) {
          this.cur_page = val;
          console.log("当前页码：" + val)
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
          let obj = this;
          let data_;
          getReport(this.select_review, this.page.current, this.page.size)
            .then(function (data) {
              obj.page.total = data.result.total;
              obj.tableData = [];
              data = data.result.list;
              data_=data;
              let reportId;
              let beReportId;
              let reportName;
              let beReportName;
              let type;
              let picture;
              for(let i = 0;i < data.length;i++){
                reportId=data[i].cUserId;
                beReportId=data[i].cToUserId;
                if(data[i].cTypeId==2){
                  type="广告、营销";
                }else if(data.cTypeId==3){
                  type="诈骗、托儿";
                }else if(data.cTypeId==4){
                  type="色情低俗";
                }else if(data.cTypeId==5){
                  type="恶意骚扰";
                }else if(data.cTypeId==1000){
                  type="其他";
                }
                userIntroduce(0,0,reportId)
                  .then(function (data) {
                       reportName=data.result.nickName;
                    userIntroduce(0,0,beReportId)
                      .then(function (data) {
                        beReportName=data.result.nickName;
                        if((!data_[i].cPicture.indexOf("https://lb-xiehou-prod.oss-cn-hangzhou.aliyuncs.com/"))>=0&&data_[i].cPicture.length>0){
                          picture="https://lb-xiehou-prod.oss-cn-hangzhou.aliyuncs.com/"+data_[i].cPicture;
                          picture=picture.split(";")[0];
                          console.log(data_[i].cPicture);
                          console.log("picture:"+picture);
                        }
                        if(data_[i].cPicture.length==0){
                          picture="";
                        }
                        let json = {
                          "date": timestamp2DateString_(data_[i].cCreateTime),
                          "reportName":reportName,
                          "reportId":data_[i].cUserId,
                          "beReportName":beReportName,
                          "beReportId":data_[i].cToUserId,
                          "reportType":type,
                          "reportReason":data_[i].cContent,
                          "reportImage":picture,
                          "tipId":data_[i].cId
                        };

                        obj.tableData.push(json);
                        console.log("图片测试："+picture);
                      });
                  });

              }
              console.log(obj.tableData);
            /*  console.log(data);
              console.log(obj.tableData);*/
            });
        },
        //举报详情
        handleReported(index, row) {
          if (this.idx === index) {
            this.edit = !this.edit
          } else {
            this.edit = true
          }
          if (this.edit) {
            this.idx = index;
            console.log(row);
            const item = row;
            console.log(item);
            this.form = {
              date: item.date,
              reportName: item.reportName,
              reportId: item.reportId,
              beReportName: item.beReportName,
              beReportId: item.beReportId,
              reportType: item.reportType,
              reportReason:item.reportReason,
              reportImage:item.reportImage
            };

          }
          console.log("form测试:"+this.form.reportImage);
        },
        //用户详情
        handleDetail(index, row,userId) {
          console.log(row)
          this.$router.push({
            path:'/userDetail',
            query:{userId:userId}
          })
          //去到详情页
          // this.userDetail(userId)
        },
        selectedChange(val){
          this.edit = false;
          this.getData();
        },
        handle(type){
          const item = this.tableData[this.idx];
          let tipId = item.tipId;
          let obj = this;
          if(type === 1){
            let status = this.select_method;
            updateReportState(tipId, status)
              .then(function (data) {
                if(data.changeTipStatusResult === '0'){
                  obj.$message.success('冻结成功');
                  obj.edit = false;
                  obj.getData();
                }
                console.log(2, data);
              })
          }else if(type === 2){
            updateReportState(tipId, 1)
              .then(function (data) {
                if(data.changeTipStatusResult === '0'){
                  obj.$message.success('驳回成功');
                  obj.edit = false;
                  obj.getData();
                }
                console.log(2, data);
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
  }
  .mr10{
    margin-right: 10px;
  }
  .image{
    max-height:300px;
    margin-left:50%;
    transform: translate(-50%,0%);
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
  }
</style>
