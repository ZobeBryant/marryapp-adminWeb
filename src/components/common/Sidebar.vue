<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                      icon:'el-icon-lx-home',
                      index:'0',
                      title:'审核管理',
                      subs:[
                        {
                          index:'credentials',
                          title:'证件审核'
                        },
                        {
                          index:'head',
                          title:'头像审核'
                         },
                        {
                          index:'report',
                          title:'举报审核'
                        },
                      ]
                    },
                    {
                      icon:'el-icon-lx-favor',
                      index:'1',
                      title:'用户管理',
                      subs:[
                        {
                          index:'userList',
                          title:'用户列表'
                        },
                        {
                          index:'vipType',
                          title:'vip种类'
                        },
                        // {
                        //   index:'systemInformation',
                        //   title:'系统消息'
                        // },
                      ]
                    },
                    {
                      icon:'el-icon-lx-calendar',
                      index:'2',
                      title:'数据统计',
                      subs:[
                        {
                          index:'activeStatistics',
                          title:'活跃统计'
                        },
                        // {
                        //   index:'monthlyActivity',
                        //   title:'月活统计'
                        // },
                        // {
                        //   index:'vipStatistics',
                        //   title:'VIP统计'
                        // },
                      ]
                    },
                    {
                      icon:'el-icon-rank',
                      index:'3',
                      title:'邀请码统计',
                      subs:[
                        {
                          index:'inviteCodeOperation',
                          title:'邀请码操作'
                        },
                        // {
                        //   index:'monthStatistics',
                        //   title:'每月统计'
                        // },
                      ]
                    },
                    {
                      icon:'el-icon-lx-copy',
                      index:'4',
                      title:'运营活动',
                      subs:[
                        // {
                        //   index:'activityManager',
                        //   title:'活动管理'
                        // },
                        {
                          index:'hello',
                          title:'女王与骑士'
                        },
                        {
                          index:'userRespond',
                          title:'用户反馈'
                        },
{
                          index:'applicationSetting',
                          title:'应用设置'
                        },
                      ]
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
