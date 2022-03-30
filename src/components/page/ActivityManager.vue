<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-button type="success" @click="addActivity">新增活动</el-button>

      <el-row>
        <h3>最近编辑</h3>
        <el-card class="card">
          <el-row>
            <el-col :span="4">
              <el-row>
                <span>01月15日</span>
              </el-row>
            </el-col>
            <el-col :span="8">
              <img src="../../assets/logo.png" class="image">
            </el-col>
            <el-col :span="8">
              <span>邂逅斯年“女王与骑士”上海站火热报名中</span>
            </el-col>
            <el-col :span="4">
              <el-row style="text-align: center;margin-top:50%">
                <el-button type="warning" @click="uplateActivity">修改</el-button>
                <el-button type="danger" @click="deleteActivity">删除</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-row>

      <el-row>
        <h3>已发活动</h3>
        <el-card v-for="(item,index) in 3" :key="item" class="card">
          <el-row>
            <el-col :span="4">
              <el-row>
                <span>01月15日</span>
              </el-row>
              <el-row style="margin-top: 30%">
                <span>发送成功</span>
              </el-row>
              <el-row style="margin-top: 30%">
                <span>未展示</span>
              </el-row>
            </el-col>
            <el-col :span="8">
              <img src="../../assets/logo.png" class="image">
            </el-col>
            <el-col :span="8">
              <span>邂逅斯年“女王与骑士”上海站火热报名中</span>
            </el-col>
            <el-col :span="4">
              <el-row style="text-align: center;margin-top:50%">
                <el-button type="warning" @click="uplateActivity">修改</el-button>
                <el-button type="danger" @click="deleteActivity">删除</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
      </el-row>

    </div>

  </div>
</template>

<script>
    export default {
      name: "ActivityManager",
      data(){
        return{

        }
      },
      created(){

      },
      computed:{

      },
      methods:{
        //添加活动
        addActivity(){
          this.$router.push({
            path:'/activityDetail'
          })
        },
        //修改活动
        uplateActivity(){

        },
        //删除活动
        deleteActivity(){

        }
      },
    }
</script>

<style scoped>
  .image{
    max-height:300px;
    margin-left:50%;
    transform: translate(-50%,0%);
  }
  .card{
    margin-bottom: 10px;
    margin-top: 10px;
  }
</style>
