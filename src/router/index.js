import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/Login'
import Home from '@/components/common/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/credentials'
    },
    {
      path: '/',
      component: Home,
      meta: { title: '自述文件' },
      children: [
        {
          path: '/credentials',

          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '证件审核' }
        },
        {
          path: '/head',

          component: resolve => require(['../components/page/Dashboard1.vue'], resolve),
          meta: { title: '头像审核' }
        },
        {
          path: '/report',
          component: resolve => require(['../components/page/Report.vue'], resolve),
          meta: { title: '举报审核' }
        },
        {
          path: '/userList',
          component: resolve => require(['../components/page/UserList.vue'], resolve),
          meta: { title: '用户列表' }
        },
        {
          path: '/vipType',
          component: resolve => require(['../components/page/VipType.vue'], resolve),
          meta: { title: 'VIP种类' }
        },
        {
          path: '/systemInformation',
          component: resolve => require(['../components/page/SystemInformation.vue'], resolve),
          meta: { title: '系统消息' }
        },
        {
          path: '/activeStatistics',
          component: resolve => require(['../components/page/ActiveStatistics.vue'], resolve),
          meta: { title: '活跃统计' }
        },
        {
          path: '/monthlyActivity',
          component: resolve => require(['../components/page/MonthlyActivity.vue'], resolve),
          meta: { title: '月活统计' }
        },

        {
          path: '/vipStatistics',
          component: resolve => require(['../components/page/VipStatistics.vue'], resolve),
          meta: { title: 'vip统计' }
        },
        {
          path: '/inviteCodeOperation',
          component: resolve => require(['../components/page/CodeOperation.vue'], resolve),
          meta: { title: '邀请码操作' }
        },
        {
          path: '/monthStatistics',
          component: resolve => require(['../components/page/MonthStatistics.vue'], resolve),
          meta: { title: '每月统计' }
        },
        {
          path: '/activityManager',
          component: resolve => require(['../components/page/ActivityManager.vue'], resolve),
          meta: { title: '活动管理' }
        },
        {
          path: '/activityDetail',
          component: resolve => require(['../components/page/ActivityDetail.vue'], resolve),
          meta: { title: '活动详情' }
        },
        {
          path: '/userDetail',
          component: resolve => require(['../components/page/UserDetail.vue'], resolve),
          meta: { title: '用户详情' }
        },
        {
          path: '/CodeManage',
          component: resolve => require(['../components/page/CodeManage.vue'], resolve),
          meta: { title: '邀请码管理' }
        },
        {
          path: '/applicationSetting',
          component: resolve => require(['../components/page/ApplicationSetting.vue'], resolve),
          meta: { title: '应用设置' }
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
