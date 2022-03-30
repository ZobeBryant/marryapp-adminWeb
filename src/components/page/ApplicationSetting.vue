<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 应用设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="applicationSetting">
      <div class="border">
        <div class="title">版本更新</div>
        <div>
          <el-form ref="form" :model="form" label-width="160px" style="font-size: 13px;margin-top: 6px">
            <el-form-item label="安卓版本名：">
              <el-input v-model="form.versionName" style="width: 420px" placeholder="请输入安卓版本名" @blur="updateVersionName"></el-input>  <!--@blur=""-->
              <span class="tip">(例如2.0.0)</span>
            </el-form-item>
            <el-form-item label="安卓版本号：">
              <el-input v-model="form.versionNum" style="width: 420px" placeholder="请输入安卓版本号" @blur="updateVersionNum"></el-input>
              <span class="tip">(例如18)</span>
            </el-form-item>
            <el-form-item label="安卓安装包上传：">
              <input type="file" @change="getOss" id="uploadApk"/> <el-button style="" @click="downLoadApk"><i class="el-icon-download"></i>下载最新安装包</el-button>
            </el-form-item>
            <el-form-item label="是否必须升级：">
              <el-select v-model="form.update" style="width: 420px;font-size: 12px" @change="updateUpdate">
                <el-option style="font-size: 15px;" v-for="item in isMustUpdate" :key="item.value" :value="item.value"
                           :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="APP更新内容：">
              <el-input type="textarea" v-model="form.appUpdateDesc" placeholder="请输入APP更新内容" rows="4"  style="width: 420px" @blur="updateAppDesc"></el-input>
            </el-form-item>
            <el-form-item label="ios版本名：">
              <el-input v-model="form.iosVersionName" style="width: 420px" placeholder="请输入ios版本名" @blur="updateIosVersionName"></el-input>  <!--@blur=""-->
              <span class="tip">(例如2.0.0)</span>
            </el-form-item>
            <el-form-item label="ios本号：">
              <el-input v-model="form.iosVersionNum" style="width: 420px" placeholder="请输入ios版本号" @blur="updateIosVersionNum"></el-input>
              <span class="tip">(例如18)</span>
            </el-form-item>

            <el-form-item label="是否必须升级：">
              <el-select v-model="form.iosUpdate" style="width: 420px;font-size: 12px" @change="updateIosUpdate">
                <el-option style="font-size: 15px;" v-for="item in isMustUpdate" :key="item.value" :value="item.value"
                           :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="APP更新内容：">
              <el-input type="textarea" v-model="form.iosAppUpdateDesc" placeholder="请输入APP更新内容" rows="4"  style="width: 420px" @blur="updateIosAppDesc"></el-input>
            </el-form-item>

          </el-form>
        </div>
      </div>

      <div class="border">
        <div class="title">APP设置</div>
        <el-form ref="form" :model="form" label-width="180px" style="font-size: 13px;margin-top: 6px">
          <el-form-item label="消息的免费条数：">
            <el-input v-model="appForm.messages" style="width: 380px" placeholder="请输入消息的免费条数" @blur="updateMessages"></el-input>
            <span class="tip">(一定重置天数内显示多少条消息)</span>
          </el-form-item>
          <el-form-item label="消息重置天数：">
            <el-input v-model="appForm.days" style="width: 380px" placeholder="请输入消息的重置天数" @blur="updateDays"></el-input>
            <span class="tip">(重置免费条数的时间)</span>
          </el-form-item>
          <el-form-item label="认证后赠送VIP天数：">
            <el-input v-model="appForm.vipDays" style="width: 380px" placeholder="请输入认证后赠送VIP的天数" @blur="updateVipDays"></el-input>
            <span class="tip"></span>
          </el-form-item>
          <el-form-item label="附近的人查看范围：">
            <el-input v-model="appForm.range" style="width: 380px" placeholder="请输入附近的人可查看的范围距离" @blur="updateRange"></el-input>
            <span class="units">km</span><span class="tip">(例如输入1000，则为可查看1000km内的附近的人)</span>
          </el-form-item>
          <el-form-item label="最近来访显示天数：">
            <el-input v-model="appForm.visitDays" style="width: 380px" placeholder="请输入最近来访显示天数" @blur="updateVisitDays"></el-input>
            <span class="units">天</span><span class="tip">(例如输入180，则为可查看180天内的来访的人)</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {getConfigList} from "../../assets/api/global_request";
  import {updateConfig} from "../../assets/api/global_request";
  import {getOssToken} from "../../assets/api/global_request";
  const OSS = require('ali-oss');
  export default {
    name: "ApplicationSetting",
    data() {
      return {
        form: {
          versionName: '',  versionNameValue:'',  versionNameId:'',
          versionNum: '',   versionNumValue:'',   versionNumId:'',
          androidApkUrl: '',                        androidApkUrlId:'',
          update: '0',       updateValue:'',        updateId:'',
          appUpdateDesc: '',appUpdateDescValue:'',      appUpdateDescId:'',
          iosVersionName: '',iosVersionNum:"",iosUpdate:"",iosAppUpdateDesc:"",
        },
        appForm: {
          messages: '',  messagesValue:'',    messagesId:'',
          days: '',      daysValue:'',         daysId:'',
          vipDays: '',   vipDaysValue:'',     vipDaysId:'',
          range: '',     rangeValue:'',        rangeId:'',
          visitDays: '', visitDaysValue:'',   visitDaysId:'',
        },
        tableData:[],
        isMustUpdate: [
          {
            value: '0',
            label: '非必须升级'
          },
          {
            value: '1',
            label: '必须升级'
          },
        ],
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() { //页面初始化当前最新数据
        let param = {};
        getConfigList(param)
          .then(data => {
            this.tableDate = data.result;
            for (let i = 0; i < this.tableDate.length; i++) { //完善数据
              if (this.tableDate[i].cCode === 'app_version') {
                this.form.versionName = this.tableDate[i].cValue;
                this.form.versionNameValue = this.tableDate[i].cValue;
                this.form.versionNameId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'android_versionCode') {
                this.form.versionNum = this.tableDate[i].cValue;
                this.form.versionNumValue = this.tableDate[i].cValue;
                this.form.versionNumId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'android_app_url'){
                this.form.androidApkUrlId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'must_update') {
                this.form.update = this.tableDate[i].cValue;
                this.form.updateValue = this.tableDate[i].cValue;
                this.form.updateId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'app_detail') {
                this.form.appUpdateDesc = this.tableDate[i].cValue;
                this.form.appUpdateDescValue = this.tableDate[i].cValue;
                this.form.appUpdateDescId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'app_message_free_cou') {
                this.appForm.messages = this.tableDate[i].cValue;
                this.appForm.messagesValue = this.tableDate[i].cValue;
                this.appForm.messagesId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'app_message_reset_da') {
                this.appForm.days = this.tableDate[i].cValue;
                this.appForm.daysValue = this.tableDate[i].cValue;
                this.appForm.daysId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'VIPTIME_KEY') {
                this.appForm.vipDays = this.tableDate[i].cValue;
                this.appForm.vipDaysValue = this.tableDate[i].cValue;
                this.appForm.vipDaysId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'DISTANCE_KEY') {
                this.appForm.range = this.tableDate[i].cValue;
                this.appForm.rangeValue = this.tableDate[i].cValue;
                this.appForm.rangeId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'VISITED_KEY') {
                this.appForm.visitDays = this.tableDate[i].cValue;
                this.appForm.visitDaysValue = this.tableDate[i].cValue;
                this.appForm.visitDaysId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'VISITED_KEY') {
                this.appForm.visitDays = this.tableDate[i].cValue;
                this.appForm.visitDaysValue = this.tableDate[i].cValue;
                this.appForm.visitDaysId = this.tableDate[i].cId;
              }
              else if(this.tableDate[i].cCode === 'ios_app_version') {
                this.form.iosVersionName = this.tableDate[i].cValue;
                this.form.iosVersionNameValue = this.tableDate[i].cValue;
                this.form.iosVersionNameId = this.tableDate[i].cId;
                console.log("ios测试:"+this.form.iosVersionName);

              }
              else if(this.tableDate[i].cCode === 'ios_versionCode') {
                this.form.iosVersionNum = this.tableDate[i].cValue;
                this.form.iosVersionNumValue = this.tableDate[i].cValue;
                this.form.iosVersionNumId = this.tableDate[i].cId;
                console.log("ios测试:"+this.form.iosVersionNum);
              }
              else if(this.tableDate[i].cCode === 'ios_must_update') {
                this.form.iosUpdate = this.tableDate[i].cValue;
                this.form.iosUpdateValue = this.tableDate[i].cValue;
                this.form.iosUpdateId = this.tableDate[i].cId;
                console.log("ios测试:"+this.form.iosUpdate);
              }
              else if(this.tableDate[i].cCode === 'ios_app_detail') {
                this.form.iosAppUpdateDesc = this.tableDate[i].cValue;
                this.form.iosAppUpdateDescValue = this.tableDate[i].cValue;
                this.form.iosAppUpdateDescId = this.tableDate[i].cId;
                console.log("ios测试:"+this.form.iosAppUpdateDesc);
              }

            }
          })
      },
      getOss(){ //安装包上传
        let file = document.querySelector('#uploadApk').files[0];//获取文件
        let name = file.name;
        let index = name.lastIndexOf('.');
        let suffix = name.substring(index, name.length);
        if('.apk' === suffix){
          let param = {};
          getOssToken(param)
            .then(data=>{
              let params = data.result;
              this.apkFileUpload(params, file);
              console.log(params);
            })
        }else{
          document.querySelector('#uploadApk').value = '';
          this.$message.error('请上传后缀为apk的安装包');
        }
      },
      apkFileUpload(params, file) {
        let name = file.name;
        let index = name.lastIndexOf('.');
        let suffix = name.substring(index, name.length); //后缀名 .apk
        //let timestamp = new Date().getTime();
        //let random = Math.random() * 1000000;
        //let objectKey = params['path'] + timestamp + "" + parseInt(random) + suffix; //上传文件名
        let objectKey = params['path'] + "邂逅斯年" + this.form.versionName + "版本" + suffix; //文件名修改
        let obj = this;
        let client = new OSS({ //key完全不能有错误
          accessKeyId: params['AccessKeyId'],
          accessKeySecret: params['AccessKeySecret'],
          stsToken: params['SecurityToken'],
          region: 'oss-cn-hangzhou',
          bucket: params['bucket'],
        });
        client.put(objectKey, file)
          .then(function(result){
            obj.form.androidApkUrl = result.url;
            console.log('aaaaaaaaaa',result);
            let params = {
              "id":obj.form.androidApkUrlId,
              "value":obj.form.androidApkUrl
            };
            obj.UPDATE(params);
          })
          .catch(err => {
            console.log(err);
          });
        console.log(suffix);
        console.log(file);
      },
      downLoadApk(){ //点击button下载最新安装包
        let downLoadUrl = '';
        for(let i = 0;i < this.tableDate.length;i++){
          if(this.tableDate[i].cCode === 'android_app_url') {
            downLoadUrl = this.tableDate[i].cValue; //下载连接
            break;
          }
        }
        window.open(downLoadUrl); //下载最新安装包
      },
      UPDATE(param){ //供调用
        updateConfig(param)
          .then(data=>{
            if(data.hasOwnProperty('success')){
              this.$message.success('修改成功');
              this.getData();
            }
          })
      },
      updateVersionName(){
        if(this.form.versionName !== this.form.versionNameValue) {
          let param = {
            "id": this.form.versionNameId,
            "value": this.form.versionName
          };
          this.UPDATE(param);
        }
      },
      updateVersionNum(){
        if(this.form.versionNum !== this.form.versionNumValue) {
          let param = {
            "id": this.form.versionNumId,
            "value": this.form.versionNum
          };
          this.UPDATE(param);
        }
      },
      updateUpdate(){
        if(this.form.update !== this.form.updateValue) {
          let param = {
            "id": this.form.updateId,
            "value": this.form.update
          };
          this.UPDATE(param);
        }
      },
      updateAppDesc(){
        if(this.form.appUpdateDesc !== this.form.appUpdateDescValue) {
          let param = {
            "id": this.form.appUpdateDescId,
            "value": this.form.appUpdateDesc
          };
          this.UPDATE(param);
        }
      },


      updateIosVersionName(){
        if(this.form.iosVersionName !== this.form.iosVersionNameValue) {
          let param = {
            "id": this.form.iosVersionNameId,
            "value": this.form.iosVersionName
          };
          this.UPDATE(param);
        }
      },
      updateIosVersionNum(){
        if(this.form.iosVersionNum !== this.form.iosVersionNumValue) {
          let param = {
            "id": this.form.iosVersionNumId,
            "value": this.form.iosVersionNum
          };
          this.UPDATE(param);
        }
      },
      updateIosUpdate(){
        if(this.form.iosUpdate !== this.form.iosUpdateValue) {
          let param = {
            "id": this.form.iosUpdateId,
            "value": this.form.iosUpdate
          };
          this.UPDATE(param);
        }
      },
      updateIosAppDesc(){
        if(this.form.iosAppUpdateDesc !== this.form.iosAppUpdateDescValue) {
          let param = {
            "id": this.form.iosAppUpdateDescId,
            "value": this.form.iosAppUpdateDesc
          };
          this.UPDATE(param);
        }
      },


      updateMessages(){
        if(this.appForm.messages !== this.appForm.messagesValue) {
          let param = {
            "id": this.appForm.messagesId,
            "value": this.appForm.messages
          };
          this.UPDATE(param);
        }
      },
      updateDays(){
        if(this.appForm.days !== this.appForm.daysValue) {
          let param = {
            "id": this.appForm.daysId,
            "value": this.appForm.days
          };
          this.UPDATE(param);
        }
      },
      updateVipDays(){
        if(this.appForm.vipDays !== this.appForm.vipDaysValue) {
          let param = {
            "id": this.appForm.vipDaysId,
            "value": this.appForm.vipDays
          };
          this.UPDATE(param);
        }
      },
      updateRange(){
        if(this.appForm.range !== this.appForm.rangeValue) {
          let param = {
            "id": this.appForm.rangeId,
            "value": this.appForm.range
          };
          this.UPDATE(param);
        }
      },
      updateVisitDays(){
        if(this.appForm.visitDays !== this.appForm.visitDaysValue) {
          let param = {
            "id": this.appForm.visitDaysId,
            "value": this.appForm.visitDays
          };
          this.UPDATE(param);
        }
      },
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

  .title {
    border-bottom: 1px solid #cbcbcb;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #636363;
    padding-left: 10px;
  }

  .tip {
    color: #8e8e8e;
    font-size: 13px;
    margin-left: 12px;
  }

  .units {
    color: #838383;
    font-size: 13px;
  }
</style>
