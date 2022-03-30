<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 房产审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-row :gutter="20">
      <el-col :span="16">
        <div class="container">


          <el-table :data="tableData" border style="font-size: 14px;">
            <el-table-column prop="date" label="提交审核时间" sortable width="150"></el-table-column>
            <el-table-column prop="id" show-overflow-tooltip label="用户ID" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDetail(scope.$index, scope.row)">{{scope.row.id}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="account" show-overflow-tooltip label="账号" width="150">
            </el-table-column>
            <el-table-column prop="name" show-overflow-tooltip label="姓名" width="150"></el-table-column>
            <el-table-column prop="address" show-overflow-tooltip label="房产证所在城市" width="150"></el-table-column>

            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="handleCertificate(scope.$index, scope.row)">认证详情</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="page.pageSize" :total="page.pageTotal" :current-page="page.pageCurrent">
            </el-pagination>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="container" v-if="edit">
          <el-row  >
            <el-col>
              <h2 style="margin-bottom: 10px">房产</h2>
              <el-card :body-style="{ padding: '0px',marginTop:'10px'}">
                <img :src="form.cPicture" class="image">

                <el-radio-group v-model="radio1" class="radioSelect" >
                  <el-button type="primary" round class="box_button" @click="handle(1)">通过</el-button>
                  <el-button type="success" round class="box_button" @click="handle(2)">驳回</el-button>
                </el-radio-group>
              </el-card>
            </el-col>
          </el-row>

        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>

  import { getCertificateHouse,getAddressList,houseState} from "../../assets/api/global_request";
  import { timestamp2DateString_} from "../../assets/api/date";
  export default{
    name:'dashboard',

    data(){
      return {
        show:true,
        tableData: [],
        form: {
          date: '',
          id:'',
          account:'',
          name: '',
          nickName:'',
          sex:'',
          certificate:''
        },
        idx: -1,
        radio1:1,
        radio2:1,
        radio3:"2",
        edit:false,
        page:{
          pageSize:20,
          pageTotal:0,
          pageCurrent:1,
        }
      }
    },

    created(){
      this.requestCertificate();
    },
    computed:{

    },
    methods:{

      // 分页导航
      handleCurrentChange(val) {
        this.page.pageCurrent = val;
        this.requestCertificate();
        console.log("当前页码："+val)
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

      },

      handleCertificate(index, row) {

        if (this.idx === index) {
          this.edit = !this.edit
        } else {

          this.edit = true
        }
        if (this.edit) {
          this.idx = index;
          const item = this.tableData[index];

          this.form = {
            cPicture:item.cPicture
          };
        }
      },
      handleDetail(index,row){
        //去到详情页

        this.$router.push({
          path:'/userDetail',
          query:{userId:row.id}
        })
      },


      selectCertificate(){
        this.page.pageCurrent = 1;
        this.page.pageTotal = 0;
        this.page.pageSize = 20;
        this.edit = false;
        this.requestCertificate();
      },
      requestCertificate(){
        let obj=this;
        let auditFlag=3;
        getCertificateHouse(auditFlag, this.page.pageCurrent, this.page.pageSize)
          .then(function (data) {
            var data_=data;

            obj.page.pageTotal = data.result.pages;

            for(let i = 0;i < data.result.list.length;i++){
              let primaryAddressDirectory=data.result.list[i].primaryAddressDirectory;
              let secondaryAddressDirectory=data.result.list[i].secondaryAddressDirectory;
              let userId=data.result.list[i].userId;
              let address;
              getAddressList(userId)
                .then(function (data) {

                  var len=data.result.length;
                  var province="";
                  var city="";
                  for(let i=0;i<len;++i){
                    if(data.result[i].id==primaryAddressDirectory){
                      province=data.result[i].name;
                    }
                    if(data.result[i].id==secondaryAddressDirectory){
                      city=data.result[i].name;
                    }
                  }
                  address=province+city;
                  console.log(address);
                  let json = {
                    "date":data_.result.list[i].gmtModified==null?timestamp2DateString_(data_.result.list[i].gmtCreate):timestamp2DateString_(data_.result.list[i].gmtModified),
                    "id":data_.result.list[i].userId,
                    "account":data_.result.list[i].account,
                    "name": data_.result.list[i].name,
                    "cPicture":data_.result.list[i].picture,
                    "address":address,
                    "pkId":data_.result.list[i].pkId,
                  };
                  obj.tableData.push(json);
                  console.log("test----"+json);

                  if(obj.edit==false){
                    console.log("nextTick执行前--");
                    //nextTick：在下次 DOM 更新循环结束之后执行延迟回调。
                    obj.$nextTick(function(){
                      console.log("nextTick--");
                      if(obj.tableData!=""){
                        obj.handleCertificate(0,0)

                      }

                    })
                  }
                });


            }

          })


      },

      handle(type){
        const item = this.tableData[this.idx];
        let obj=this;
        let id=item.pkId;
        if (type === 1) {
          houseState(id,1)
            .then(function (data) {
              obj.$message.success('通过成功');
              obj.edit = false;
              obj.tableData=[];
              obj.requestCertificate();

            })

        } else if (type === 2) {
          houseState(id,2)
            .then(function (data) {
              obj.$message.success('驳回成功');
              obj.edit = false;
              obj.tableData=[];
              obj.requestCertificate()
            })

        }

      },

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
    min-width: 1000px;

  }
  .mr10{
    margin-right: 10px;
  }
  .image{
    margin-left:50%;
    transform: translate(-50%,0%);
    /* min-width: 300px;
     max-width: 300px;*/
    width: 350px;
    height: 350px;
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
    width: 200px;
    height: 60px;
    font-size:20px;
  }

  .goodLook-title{
    margin-top: 5px;
    width: 100%;
    height: 25px;
    line-height: 25px;
    box-sizing: border-box;
    text-align: center;
    font-weight: bold;
  }
</style>
