<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import "./assets/css/main.css";
  @import "./assets/css/color-dark.css";     /*深色主题*/

  #applicationSetting .el-form-item__label{
    font-size: 13px;
    color: #787d86;
  }
  #applicationSetting .el-upload--text{
    width: auto;
    height: auto;
    border: 0;
  }
#applicationSetting .el-input__inner,#applicationSetting .el-textarea__inner{
  font-size: 12px;
 }
#applicationSetting .el-button{
  height: 26px;
  width: 105px;
  padding: 0;
  text-align: center;
}
</style>
