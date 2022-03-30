<template>
  <div>
    <!--<el-form ref="filterForm" :model="filterForm" :inline="true">-->
    <!--<el-form-item label="性别">-->
    <!--<el-select v-model="filterForm.sex">-->
    <!--<el-option v-for="item in sex" :label="item.label" :value="item.value" :key="item.value"></el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<el-button type="danger" @click="getData">查询</el-button>-->
    <el-table :data="tableData" ref="userListTable" border class="table" id="userListTable">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column property="userId" label="用户id" width="120"></el-table-column>
      <el-table-column property="name" label="用户姓名" width="120"></el-table-column>
      <el-table-column property="time" label="时间" width="120"></el-table-column>
      <el-table-column property="content" label="内容" width="120"></el-table-column>
      <!--
      <el-table-column property="region" label="所在地"></el-table-column>
      -->
    </el-table>
    <div class="pagination">
      <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>


<script>
  import {showQueen,userRespond} from "../../assets/api/global_request";
  import {timestamp2DateString} from "../../assets/api/date";
  export default {
    name: "Hello",
    data(){

      return{
        age:30,
        names:'ssssss',
        website:'https://www.baidu.com/',
        form:{
          userId:'',
          userName:'',
          nickName:'',
          account:'',
          serialNumber:'',
          allocationUserNickName:'',
        },
        filterForm:{
          sex:2,
          exit:-2,
          size:5,
          index:1,
          certificate:0,
          showType:-2,
          accountType:0,
          graduate:-2,
          vipType:0,
          highStart:0,
          highEnd:0,
          createTime:0,
          startTime:'',
          endTime:'',
          lastActive:0,
          school:0,
          education:0,
          region:0,
          tag:0
        },
        tags:[
          {
            label:"不限",
            value:0
          },
          {
            label:"颜值在线",
            value:1
          },
          {
            label:"颜值低，照片不认真",
            value:2
          },
        ],
        regions:[
          {
            label:"不限",
            value:0
          },
          {
            label:"北京",
            value:1
          },
          {
            label:"上海",
            value:2
          },
        ],
        educations:[
          {
            label:"不限",
            value:0
          },
          {
            label:"本科",
            value:1
          },
          {
            label:"硕士",
            value:2
          },
          {
            label:"博士及以上",
            value:3
          },
          {
            label:"专科",
            value:4
          },
        ],
        schools:[
          {
            label:"不限",
            value:0
          },
          {
            label:"清华",
            value:1
          },
          {
            label:"北大",
            value:2
          },
        ],
        lastActives:[
          {
            label:"不限",
            value:0
          },
          {
            label:"3天内",
            value:1
          },
          {
            label:"7天内",
            value:2
          },
          {
            label:"一个月内",
            value:3
          },
          {
            label:"一个月外",
            value:4
          },
        ],
        createTimes:[
          {
            label:"不限",
            value:0
          },
          {
            label:"今日",
            value:1
          },
          {
            label:"昨日",
            value:2
          },
          {
            label:"自然周",
            value:3
          },
          {
            label:"自然月",
            value:4
          },
          {
            label:"最近7天",
            value:5
          },
          {
            label:"最近30天",
            value:6
          },
        ],
        vipTypes:[
          {
            label:"不限",
            value:0
          },
          {
            label:"非VIP",
            value:1
          },
          {
            label:"充值VIP",
            value:2
          },
          {
            label:"体验VIP",
            value:3
          },
          {
            label:"钻石VIP",
            value:4
          },
        ],
        graduates:[
          {
            label:"不限",
            value:-2
          },
          {
            label:"毕业",
            value:1
          },
          {
            label:"在校",
            value:0
          },
        ],
        accountTypes:[
          {
            label:"不限",
            value:0
          },
          {
            label:"正常",
            value:1
          },
          {
            label:"注销",
            value:2
          },
          {
            label:"冻结",
            value:3
          }],
        showTypes:[
          {
            label:"不限",
            value:-2
          },
          {
            label:"显示",
            value:1
          },
          {
            label:"屏蔽",
            value:0
          }],
        certificates:[
          {
            label:"不限",
            value:0
          },
          {
            label:"全部认证",
            value:1
          },
          {
            label:"仅身份证认证",
            value:2
          },
          {
            label:"仅学生证认证",
            value:3
          },
          {
            label:"未认证",
            value:4
          }],
        sex:[
          {
            label:"不限",
            value:2
          },
          {
            label:"男",
            value:0
          },
          {
            label:"女",
            value:1
          }],
        selectTime:false,
        showMoreSelect:false,
        url:'/static/userList.json',
        tableData:[],
        isExport:false,
        index:1
      }
    },
    created(){
      this.getData()
    },
    methods: {
      add(){
        this.age--

      },
      jian(){
        this.age++

      },
      greed(time){
        return 'Good Morning'+ time;

      },
      // 分页导航
      handleCurrentChange(val) {
        this.index = val;
        console.log("当前页码：" + val);
        this.getData();
        //this.getData();
      },
      // 获取数据
      getData() {
        let obj = this;
        let sex = this.filterForm.sex;
        let nickname;
        obj.tableData = [];

        userRespond(this.index,20)
          .then(function (data) {
            obj.tableData = [];

            data = data.userRespondList;
            console.log(data);
            for(let i = 0;i < data.length;i++){
              console.log(data[i].time)
              let json = {
                "userId": data[i].user.id,
                "name":data[i].user.name,
                "time":timestamp2DateString(data[i].time.time),
                "content":data[i].content
              };
              obj.tableData.push(json);

              console.log(obj.tableData);

            }

          });
      }

    },
    mounted(){

    }




  }
</script>

<style scoped>

</style>
