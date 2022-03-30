<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 活动管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="applicationSetting">
      <div class="border">
        <div class="title">活动管理</div>
        <div class="activityForm">
          <el-form ref="form" :model="form" style="font-size: 13px;margin-top: 6px">
            <el-form-item label="活动名称（不对外展示）：">
              <el-input v-model="form.activityName" style="width: 420px"></el-input>
            </el-form-item>
            <el-form-item label="活动列表页面展示图（大小：xxxx*xxxx）">
              <br>
              <el-row>
                <el-col :span="12">
                  <el-card :body-style="{ padding: '0px' }">
                    <div class="ActivityPicture">
                      <div class="uploadPic">
                        <img :src="form.activityListDisplay">
                      </div>
                      <div class="uploadBtn">
                        <input type="file" @change="getOss(1)" id="uploadPic1">
                        <div class="uploadPic-tip">只支持.jpg格式</div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="首页弹出图图（大小：xxxx*xxxx）">
              <br>
              <el-row>
                <el-col :span="12">
                  <el-card :body-style="{ padding: '0px' }">
                    <div class="ActivityPicture">
                      <div class="uploadPic">
                        <img :src="form.activityHomePopup" class="image">
                      </div>
                      <div class="uploadBtn">
                        <input type="file" @change="getOss(2)" id="uploadPic2">
                        <div class="uploadPic-tip">只支持.jpg格式</div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="网页链接：">
              <el-input
                type="textarea"
                v-model="form.activityNetLink"
                rows="4"
                style="width: 420px"
              ></el-input>
            </el-form-item>

            <el-form-item label="活动状态：">
              <el-select v-model="form.activityStatus" style="width: 420px;font-size: 12px">
                <el-option
                  style="font-size: 15px;"
                  v-for="item in activityStatus"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否在列表显示：">
              <el-select v-model="form.activityShow" style="width: 420px;font-size: 12px">
                <el-option
                  style="font-size: 15px;"
                  v-for="item in activityShow"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否在首页弹出提示：">
              <el-select v-model="form.activityTip" style="width: 420px;font-size: 12px">
                <el-option
                  style="font-size: 15px;"
                  v-for="item in activityTip"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>

              <label style="font-size: 13px;margin-left: 50px;color:#787d86">持续天数：</label>
              <el-select v-model="form.activityDays" style="width: 420px;font-size: 12px">
                <el-option
                  style="font-size: 15px;"
                  v-for="item in activityDays"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form>
              <el-button
                @click="saveActivityForm"
                size="medium"
                type="primary"
                style="width: 500px;height:50px;margin-left:200px;margin-bottom:50px;"
              >保存</el-button>
            </el-form>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  updateActivity,
  getOssForActivity,
  addActivity
} from "../../assets/api/global_request";
import { timestamp2DateString_ } from "../../assets/api/date";
const OSS = require("ali-oss");
export default {
  data() {
    return {
      form: {
        pkId: "",
        activityName: "",
        activityListDisplay: "",
        activityHomePopup: "",
        activityNetLink: "",
        activityStatus: "",
        activityShow: "",
        activityTip: "",
        activityDays: "",
        activityFlag: "",
        gmtCreate: "",
        gmtModified: ""
      },
      activityStatus: [
        {
          value: "0",
          label: "报名中"
        },
        {
          value: "1",
          label: "进行中"
        },
        {
          value: "2",
          label: "已过期"
        }
      ],

      activityShow: [
        {
          value: "1",
          label: "显示"
        },
        {
          value: "0",
          label: "屏蔽"
        }
      ],

      activityTip: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      activityDays: [
        {
          value: "1",
          label: "1天"
        },
        {
          value: "3",
          label: "3天"
        },
        {
          value: "7",
          label: "7天"
        },
        {
          value: "14",
          label: "14天"
        },
        {
          value: "30",
          label: "30天"
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getOss(flag) {
      //图片上传
      let file;
      if (flag == 1) {
        file = document.querySelector("#uploadPic1").files[0]; //获取文件
      } else if (flag == 2) {
        file = document.querySelector("#uploadPic2").files[0]; //获取文件
      }

      let name = file.name;
      let index = name.lastIndexOf(".");
      let suffix = name.substring(index, name.length);
      let obj = this;
      if (
        ".jpg" === suffix ||
        ".JPG" === suffix ||
        ".jpeg" === suffix ||
        ".JPEG" === suffix
      ) {
        let type = 8;
        getOssForActivity(type).then(data => {
          let params = data.result;
          obj.picFileUpload(flag, params, file);
          console.log(params);
        });
      } else {
        if (flag == 1) {
          document.querySelector("#uploadPic1").value = "";
        } else if (flag == 2) {
          document.querySelector("#uploadPic2").value = "";
        }

        this.$message.error("请上传后缀为.jpg的图片");
      }
    },
    picFileUpload(flag, params, file) {
      let name = file.name;
      let index = name.lastIndexOf(".");
      let suffix = name.substring(index, name.length); //后缀名 .jpg

      let objectKey = params["path"] + name; //文件名修改*/
      // let objectKey ="";
      let obj = this;
      let client = new OSS({
        //key完全不能有错误
        accessKeyId: params["AccessKeyId"],
        accessKeySecret: params["AccessKeySecret"],
        stsToken: params["SecurityToken"],
        region: "oss-cn-hangzhou",
        bucket: params["bucket"]
      });
      client
        .put(objectKey, file)
        .then(function(result) {
          let picUrl = result.url;
          console.log("url测试：", picUrl);
          if (flag == 1) obj.form.activityListDisplay = picUrl;
          else if (flag == 2) {
            obj.form.activityHomePopup = picUrl;
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log(suffix);
      console.log(file);
    },
    getData() {
      let end = new Date();
      let start = new Date();
      let days;

      if (this.$route.query.activityFlag == "update") {
        this.form.activityName = this.$route.query.eventName;
        this.form.activityListDisplay = this.$route.query.activityListDisplay;
        this.form.activityHomePopup = this.$route.query.activityHomePopup;
        this.form.activityNetLink = this.$route.query.activityLink;
        if (this.$route.query.activeStatus == 0) {
          this.form.activityStatus = "报名中";
        } else if (this.$route.query.activeStatus == 1) {
          this.form.activityStatus = "进行中";
        } else if (this.$route.query.activeStatus == 2) {
          this.form.activityStatus = "已过期";
        }

        if (this.$route.query.isShowList == 0) {
          this.form.activityShow = "屏蔽";
        } else if (this.$route.query.isShowList == 1) {
          this.form.activityShow = "显示";
        }

        if (this.$route.query.isShowHome == 0) {
          this.form.activityTip = "否";
        } else if (this.$route.query.isShowHome == 1) {
          this.form.activityTip = "是";
        }
        if (this.$route.query.gmtModified != null) {
          console.log(this.$route.query.gmtModified);
          /* console.log(timestamp2DateString_(this.$route.query.popUpDeadline).substr(0,4));*/
          end.setFullYear(
            timestamp2DateString_(this.$route.query.popUpDeadline).substr(0, 4)
          );
          end.setMonth(
            timestamp2DateString_(this.$route.query.popUpDeadline).substr(
              5,
              2
            ) - 1
          );
          end.setDate(
            timestamp2DateString_(this.$route.query.popUpDeadline).substr(8, 2)
          );
          start.setFullYear(
            timestamp2DateString_(this.$route.query.gmtModified).substr(0, 4)
          );
          start.setMonth(
            timestamp2DateString_(this.$route.query.gmtModified).substr(5, 2) -
              1
          );
          start.setDate(
            timestamp2DateString_(this.$route.query.gmtModified).substr(8, 2)
          );
          console.log(end);
          console.log(start);
          days = (end - start) / 1000 / 3600 / 24;
          this.form.activityDays = days + "天";
          console.log("活动天数测试:" + days);
          this.form.gmtModified = timestamp2DateString_(
            this.$route.query.gmtModified
          );
        } else {
          end.setFullYear(
            timestamp2DateString_(this.$route.query.popUpDeadline).substr(0, 4)
          );
          end.setMonth(
            timestamp2DateString_(this.$route.query.popUpDeadline).substr(
              5,
              2
            ) - 1
          );
          end.setDate(
            timestamp2DateString_(this.$route.query.popUpDeadline).substr(8, 2)
          );
          start.setFullYear(
            timestamp2DateString_(this.$route.query.gmtCreate).substr(0, 4)
          );
          start.setMonth(
            timestamp2DateString_(this.$route.query.gmtCreate).substr(5, 2) - 1
          );
          start.setDate(
            timestamp2DateString_(this.$route.query.gmtCreate).substr(8, 2)
          );
          console.log(end);
          console.log(start);

          days = (end - start) / 1000 / 3600 / 24;
          /*console.log(days);*/
          this.form.activityDays = days + "天";
          this.form.gmtModified = "";
          console.log("活动天数测试:" + days);
        }
        this.form.pkId = this.$route.query.pkId;
        this.form.activityFlag = this.$route.query.activityFlag;
      }
      this.form.gmtCreate = timestamp2DateString_(this.$route.query.gmtCreate);
    },
    saveActivityForm() {
      let activityName = this.form.activityName;
      let activityListDisplay = this.form.activityListDisplay;
      let activityHomePopup = this.form.activityHomePopup;
      let activityNetLink = this.form.activityNetLink;
      let activityStatus = this.form.activityStatus;
      let activityShow = this.form.activityShow;
      let activityTip = this.form.activityTip;
      let activityDays = this.form.activityDays;
      let pkId = this.form.pkId;
      let activityFlag = this.form.activityFlag;
      let strLen;
      let gmtCreate = this.form.gmtCreate;
      let gmtModified = this.form.gmtModified;

      if (activityStatus == "报名中") {
        activityStatus = 0;
      } else if (activityStatus == "进行中") {
        activityStatus = 1;
      } else if (activityStatus == "已过期") {
        activityStatus = 2;
      }
      if (activityShow == "屏蔽") {
        activityShow = 0;
      } else if (activityShow == "显示") {
        activityShow = 1;
      }

      if (activityTip == "否") {
        activityTip = 0;
      } else if (activityTip == "是") {
        activityTip = 1;
      }

      if (activityDays != "") {
        activityDays = parseInt(this.form.activityDays);
      } else if (activityDays.indexOf("天") >= 0) {
        console.log(activityDays);
        strLen = this.form.activityDays.length;
        activityDays = parseInt(this.form.activityDays.substr(0, strLen - 1));
        console.log(activityDays);
      }
      let obj = this;
      var deadline = new Date();
      var day = deadline.getDate();
      /*console.log(activityDays);
        console.log(day);*/
      if (activityDays != "") {
        console.log(activityDays);
        deadline.setDate(day + activityDays);
        deadline = timestamp2DateString_(deadline);
      } else {
        deadline = "";
        console.log(activityDays);
      }

      /*console.log(deadline);*/
      /*   console.log(activityFlag.indexOf("update")>=0)
        console.log(typeof (activityFlag));
        console.log(typeof ("update"));
        console.log(activityFlag);*/
      if (activityFlag != "update") {
        addActivity(
          activityName,
          activityListDisplay,
          activityHomePopup,
          activityNetLink,
          activityStatus,
          activityShow,
          activityTip,
          deadline
        ).then(function(data) {
          console.log(data);
          obj.$message.success("添加成功");
        });
      } else {
        updateActivity(
          pkId,
          activityName,
          activityListDisplay,
          activityHomePopup,
          activityNetLink,
          activityStatus,
          activityShow,
          activityTip,
          deadline,
          gmtCreate,
          gmtModified
        ).then(function(data) {
          console.log(data);
          obj.$message.success("修改成功");
        });
      }
    }
  }
};
</script>

<style scoped>
.border {
  margin: 15px 5px 0 5px;
  background-color: #fff;
  border: 1px solid #cbcbcb;
  border-radius: 2px;
  box-shadow: 0 0 5px 3px #dddddd;
}

.title {
  border-bottom: 1px solid #cbcbcb;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #636363;
  padding-left: 10px;
}

.ActivityPicture {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.uploadPic {
  width: 300px;
  height: 300px;
}
.uploadPic img {
  width: 300px;
  height: 300px;
}
.activityForm {
  margin-left: 25px;
}
</style>
