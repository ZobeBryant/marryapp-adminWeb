<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-row :gutter="20">

        <el-col :span="6">
          <el-upload
            :action=url
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            style="width:300px">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-col>

        <el-col :span="18">
          <el-form ref="detailForm" :model="detailForm"  label-width="100px">
            <h3  style="margin-bottom: 10px">首页展示:</h3>
            <el-form-item label="主标题：">
              <el-input v-model="detailForm.mainTitle"></el-input>
            </el-form-item>
            <el-form-item label="副标题：">
              <el-input v-model="detailForm.subTitle"></el-input>
            </el-form-item>
            <el-form-item label="活动时间：">
              <el-date-picker
                v-model="detailForm.activityTime"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动地点：">
              <el-input v-model="detailForm.location"></el-input>
            </el-form-item>
            <el-form-item label="剩余名额：">
              <el-input v-model="detailForm.remainQuota"></el-input>
            </el-form-item>

            <h3  style="margin-bottom: 10px">正文部分:</h3>
            <el-form-item label="活动标题：">
              <el-input v-model="detailForm.title"></el-input>
            </el-form-item>

            <el-form-item label="活动海报：">
              <el-upload
                :action=url
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                style="width:300px">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item label="简介：">
              <el-input type="textarea" v-model="detailForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="报名条件：">
              <el-input type="textarea" v-model="detailForm.condition"></el-input>
            </el-form-item>
            <el-form-item label="活动亮点：">
              <el-input type="textarea" v-model="detailForm.highlight"></el-input>
            </el-form-item>

            <el-form-item label="活动图：">
              <el-upload
                :action=url
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                style="width:300px">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

            <el-form-item label="活动流程：">
              <el-input type="textarea" v-model="detailForm.activityProcess"></el-input>
            </el-form-item>
            <el-form-item label="免责声明：">
              <el-input type="textarea" v-model="detailForm.disclaimer"></el-input>
            </el-form-item>
            <el-form-item label="商务合作：">
              <el-input type="textarea" v-model="detailForm.cooperation"></el-input>
            </el-form-item>

            <h3  style="margin-bottom: 10px">设置部分:</h3>

            <el-form-item label="投放地点：">
              <div style="background: #ffffff;min-height:40px" @click="selectProvince">
                <el-tag v-for="tag in tagsProvince" :key="tag" closable style="margin: 5px"
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
              </div>
            </el-form-item>
            <el-form-item v-if="selectPro">
              <div class="container">
                <el-row v-for="(item1,index1) in province" :key="index1" :gutter="20">
                  <el-col v-for="(item2,index2) in item1.provinces" :key="item2.name" :span="3" >
                    <el-tag @click.native="select(item2)" :type="item2.type" class="tag">{{item2.name}}</el-tag>
                  </el-col>
                </el-row>
              </div>
            </el-form-item>

            <el-form-item label="付费设置：">
              <el-radio-group v-model="detailForm.radio" class="radioSelect">
                <el-radio :label="1">付费</el-radio>
                <el-radio :label="2">免费</el-radio>
              </el-radio-group>
            </el-form-item>

            <div  v-if="whyPrice">
              <el-form-item label="费用价格：">
                <el-input v-model="detailForm.price"></el-input>
              </el-form-item>
              <el-form-item label="为什么要付费：" label-width="200px">
                <el-input type="textarea" v-model="detailForm.reason"></el-input>
              </el-form-item>
            </div>

            <el-form-item label="注意事项：" label-width="200px">
              <el-input type="textarea" v-model="detailForm.note"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="margin-left: 50%;transform: translate(-50%,0)">创建活动</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ActivityDetail",
      data(){
        return{
          url:'https://jsonplaceholder.typicode.com/posts/',
          dialogImageUrl: '',
          dialogVisible: false,
          selectPro:false,
          tagsProvince:[],
          detailForm:{
            mainTitle:'',
            subTitle:'',
            activityTime:[],
            location:'',
            remainQuota:'',

            title:'',
            activityImageUrl1:'',//活动海报
            introduction:'',
            condition:'',
            highlight:'',
            activityImageUrl2:'',//活动图
            activityProcess:'',
            disclaimer:'',
            cooperation:'',

            //radio:是否付费，隐藏属性，因为是整形
            price:'',
            region:'',
            reason:'',
            note:'',
          },
          province:[
            {provinces:[{name:'全国:',type:'info'}]},
            {provinces:[{name:'热门省份:',type:'info'},{name:'北京市',type:'info'},{name:'上海市',type:'info'},{name:'江苏省',type:'info'},
                        {name:'广东省',type:'info'},{name:'湖南省',type:'info'},{name:'湖北省',type:'info'},{name:'浙江省',type:'info'}]},
            {provinces:[{name:'四川省',type:'info'},{name:'海南省',type:'info'},{name:'重庆市',type:'info'},{name:'山东省',type:'info'},
                        {name:'天津市',type:'info'},{name:'广西省',type:'info'},{name:'安徽省',type:'info'},{name:'河北省',type:'info'},]},
            {provinces:[{name:'河南省',type:'info'},{name:'山西省',type:'info'},{name:'陕西省',type:'info'},{name:'黑龙江省',type:'info'},
                        {name:'辽宁省',type:'info'},{name:'吉林省',type:'info'},{name:'云南省',type:'info'},{name:'贵州省',type:'info'},]},
            {provinces:[{name:'甘肃省',type:'info'},{name:'内蒙古',type:'info'},{name:'宁夏',type:'info'},{name:'西藏',type:'info'},
                        {name:'新疆',type:'info'},{name:'青海省',type:'info'},{name:'福建省',type:'info'},{name:'江西省',type:'info'},]},
            {provinces:[{name:'香港',type:'info'},{name:'澳门',type:'info'},{name:'台湾',type:'info'},{name:'海外',type:'info'}]},
          ],
          nowType:"info",
        }
      },
      computed:{
        whyPrice(){
          if(this.detailForm.radio == 1){
            return true
          }else{
            return false
          }
        }

      },
      methods: {
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          console.log(file.url)
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        select(item){

          this.pushNoRepeat(item)
/*          console.log(event.currentTarget);
          event.currentTarget.setAttribute("type","success")*/

        },
        handleClose(tag) {
          this.tagsProvince.splice(this.tagsProvince.indexOf(tag), 1);

          this.province.forEach((item1)=>{
            item1.provinces.forEach((item2)=>{
              if(item2.name == tag){
                item2.type = "info"
              }
            })
          })
        },
        //活动提交
        onSubmit(){
          console.log(JSON.stringify(this.tagsProvince))
        },

        //数组中添加元素
        pushNoRepeat(item) {
          var tag = item.name
          if(tag == "热门省份:"){
            return
          }
          item.type="success"
          if(this.tagsProvince.length<=0){
            this.tagsProvince.push(tag);
          }
          for (var i = 0; i < this.tagsProvince.length; i++) {
            if (this.tagsProvince.indexOf(tag) == -1) {
              this.tagsProvince.push(tag);
            }
          }
        },
        //选择省份
        selectProvince(){
          this.selectPro = true;
        }
      }

    }
</script>

<style scoped>
  .image{
    max-height:300px;
    margin-left:50%;
    transform: translate(-50%,0%);
  }
  .el-form-item{
    width: 650px;
  }
</style>
