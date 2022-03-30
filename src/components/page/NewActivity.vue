<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 活动管理</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div id="container">
      <div class="border">
        <div class="head">
          <div class="title">活动管理</div>
          <div class="newActivity-btn">
            <el-button type="primary" @click="NewActivity" style="margin-bottom: 10px">新建活动</el-button>
          </div>
        </div>


        <el-col :span="12" style="width: 100%"   >
          <el-card  v-for="(item,index) in tableData":key="index" v-if="tableLoad"   :body-style="{ padding: '0px' }">
            <div class="activity">
              <div class="activityListDisplay" @click="activityUpdate(index)">
                <img :src="item.activityListDisplay" >
              </div>
              <div class="activityContent">
                <el-form style="font-size: 13px;" >
                  <el-form-item label="活动名称（不对外展示）:"  style="width: 500px">
                    <el-col :span="12">
                      <span v-text="item.name"></span>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="创建时间:"  >
                    <el-col :span="12">
                      <span v-text="item.time"></span>
                    </el-col>
                  </el-form-item>
                </el-form>
              </div>
              <div class="operation">


                  <el-button type="text" icon="el-icon-edit"  @click="handleCertificate(index)">删除</el-button>


              </div>

            </div>
          </el-card>
        </el-col>

      </div>
      <!-- 添加邀请码 -->
      <el-dialog title="新建活动" :visible.sync="addVisible" width="30%">
        <el-form ref="formAdd" :model="formAdd" label-width="250px">
          <el-form-item label="活动名称（不对外展示）:"  >
            <el-col :span="12">
              <el-input v-model="formAdd.name" placeholder="请输入活动名称"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </div>
</template>

<script>
  import {getActivity,deleteActivity} from "../../assets/api/global_request";
  import { timestamp2DateString_} from "../../assets/api/date";
  const OSS = require('ali-oss');
  export default {

    data() {
      return {
        tableData:[],

        formAdd:{
          name:"",
        },
        addVisible:false,
        tableLoad:false,
      }

    },
    mounted() {
      this.getData();
    },
    methods: {
      NewActivity(){
        this.addVisible = true;
      },

      getData() { //页面初始化当前最新数据
        let obj=this;
        this.tableData=[];
        let gmtModified;
        getActivity()
          .then(function (data) {
            for(let i = 0;i < data.result.length;i++) {
              if(data.result[i].gmtModified==null){
                gmtModified=null;
              }else{
                gmtModified=timestamp2DateString_(data.result[i].gmtModified);
              }
              let json = {
                "activityListDisplay": data.result[i].activityListDisplay,
                "name": data.result[i].eventName,
                "time": timestamp2DateString_(data.result[i].gmtCreate),
                "pkId": data.result[i].pkId,
                "activityHomePopup":data.result[i].activityHomePopup,
                "activityLink":data.result[i].activityLink,
                "activeStatus":data.result[i].activeStatus,
                "isShowList":data.result[i].isShowList,
                "isShowHome":data.result[i].isShowHome,
                "popUpDeadline":timestamp2DateString_(data.result[i].popUpDeadline),
                "gmtModified": gmtModified
              };
              obj.tableData.push(json);
            }
            console.log("tableData测试:"+JSON.stringify(obj.tableData));
            obj.tableLoad=true;
          })

      },
      handleCertificate(index) {
        var obj=this;
        var item=this.tableData[index];
       /* console.log(JSON.stringify(item));*/
        deleteActivity(item.pkId,item.name,item.activityListDisplay,item.activityHomePopup,item.activityLink,item.activeStatus,item.isShowList,item.isShowHome,item.popUpDeadline,item.time,item.gmtModified)
          .then(function (data) {

            obj.getData();
            obj.$message.success('删除成功');
          })
      },
      activityUpdate(index){
        var item=this.tableData[index];
        console.log(JSON.stringify(item));

        this.$router.push({
          path:'/ActivityManage',
          query:{
            pkId:item.pkId,
            eventName:item.name,
            activityListDisplay:item.activityListDisplay,
            activityHomePopup:item.activityHomePopup,
            activityLink:item.activityLink,
            activeStatus:item.activeStatus,
            isShowList:item.isShowList,
            isShowHome:item.isShowHome,
            popUpDeadline:item.popUpDeadline,
            activityFlag:"update",
            gmtCreate:item.time,
            gmtModified:item.gmtModified

          }
        })

      }

    }
  }
</script>

<style scoped>
  .border {
    margin: 15px 5px 0 5px;
    background-color: #fff;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
    box-shadow: 0 0 5px 3px #dddddd;

  }
  .head{
    height: 50px;
    border-bottom: 1px solid #cbcbcb;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

  }
  .title {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #636363;
    padding-left: 10px;
  }
  .newActivity-btn{
    margin-right: 10px;
  }
  .activity{
    margin-top: 10px;
    display: flex;
    justify-content: left;
  }
  .activityListDisplay{
    width: 300px;
    height: 300px;
  }
  .activityListDisplay img{
    width: 300px;
    height: 300px;

  }
  .activityListDisplay{
    margin-left: 10px;
  }
  .activityContent{
    margin-left: 20px;
  }


</style>
