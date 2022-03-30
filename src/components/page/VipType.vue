<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> Vip种类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-button type="primary" @click="addVipType" style="margin-bottom: 10px">新增VIP类型</el-button>
      <!-- 添加Vip类型dialog-->
      <el-dialog title="新增VIP" :visible.sync="addVisible" width="580px">
        <el-form ref="formAdd" :model="formAdd" label-width="100px">
          <el-form-item label="vip名称:">
            <el-input v-model="formAdd.title" placeholder="请输入vip名称" style="width: 420px"></el-input>
          </el-form-item>

          <el-form-item label="时长(天):">
            <el-input v-model="formAdd.duration" placeholder="请输入vip时长" style="width: 420px"></el-input>
          </el-form-item>
          <el-form-item label="价格(元):">
            <el-input v-model="formAdd.price" placeholder="请输入vip价格" style="width: 420px"></el-input>
          </el-form-item>

          <el-form-item label="面向用户:">
            <el-select v-model="formAdd.vipType" class="handle-select mr10" style="width: 420px">
              <el-option v-for="item in vipTypes" :key="item.value" :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAdd">确 定</el-button>
        </span>
      </el-dialog>

      <el-table :data="tableData"
                ref="userListTable"
                class="table" border
                id="userListTable"
                v-loading="loading"
                highlight-current-row>
        <!--<el-table-column property="vipType" label="类型"></el-table-column>-->
        <el-table-column
          property="cName"
          label="标题">
        </el-table-column>

        <el-table-column
          property="cDay"
          label="时长(天)">
        </el-table-column>

        <el-table-column
          property="cPrice"
          label="价格(元)">
        </el-table-column>

        <el-table-column label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index)"
            >编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑弹出框dialog -->
      <el-dialog title="修改VIP" :visible.sync="editVisible" width="580px">

        <el-form ref="formAdd" :model="formAdd" label-width="100px">
          <el-form-item label="vip名称:">
            <el-input v-model="form.title" placeholder="请输入vip名称" style="width: 420px"></el-input>
          </el-form-item>

          <el-form-item label="时长(天):">
            <el-input v-model="form.duration" placeholder="请输入vip时长" style="width: 420px"></el-input>
          </el-form-item>
          <el-form-item label="价格(元):">
            <el-input v-model="form.price" placeholder="请输入vip价格" style="width: 420px"></el-input>
          </el-form-item>

          <el-form-item label="面向用户:">
            <el-select v-model="form.vipType" class="handle-select mr10" style="width: 420px">
              <el-option v-for="item in vipTypes" :key="item.value" :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
              </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import {getVipList} from "../../assets/api/global_request";
  import {addVip} from "../../assets/api/global_request";
  import {updateVip} from "../../assets/api/global_request";

  export default {
    name: "VipType",
    data() {
      return {
        tableData: [],
        editVisible: false,
        addVisible: false,
        form: {
          title: '',
          duration: '',
          price: '',
          vipType: 0
        },
        formAdd: {
          title: '',
          duration: '',
          price: '',
          vipType: 0
        },
        loading: false,
        vipTypes: [
          {
            value: 0,
            label: '校内'
          },
          {
            value: 1,
            label: '校外'
          },
        ],
        idx: -1,
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() { // 获取数据
        let obj = this;
        let param = {};
        this.loading = true;
        getVipList(param)
          .then(function (data) {
            console.log(data);
            if (data.success === true) {
              obj.loading = false;
              obj.tableData = data.result;
            } else {
              obj.$message.error('获取数据失败');
            }
          })
      },
      addVipType() { //添加VIP种类
        this.addVisible = true;
      },
      saveAdd() { //保存添加的种类
        let param = {
          "cName": this.formAdd.title,     //名称
          "cDay": this.formAdd.duration,   //VIP时间
          "cPrice": this.formAdd.price,    //价格
          "type": this.formAdd.vipType     //是否是校外
        };
        addVip(param)
          .then(data => {
            this.addVisible = false;
            this.$message.success(`添加成功`);
            this.formAdd.title = ''; //复原
            this.formAdd.duration = '';
            this.formAdd.price = '';
            this.getData();
          });
      },
      handleEdit(index) { //编辑vip信息
        this.idx = index;
        const item = this.tableData[index];
        this.form.title = item.cName;
        this.form.duration = item.cDay;
        this.form.price = item.cPrice;
        this.form.vipType = item.type;
        console.log(this.form);
        this.editVisible = true;
      },
      saveEdit() { //保存编辑
        let param = {
          "cName":this.form.title,
          "cDay":this.form.duration,
          "cPrice":this.form.price,
          "cId":this.tableData[this.idx].cId,
          "type":this.form.vipType
        };
        updateVip(param)
          .then(data=>{
            console.log(data);
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.getData();
          });
      },
    }
  }
</script>

<style scoped>
  .red {
    color: #ff0000;
  }
</style>
