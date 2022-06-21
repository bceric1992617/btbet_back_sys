import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/robotCenter/robotList',
    name: 'robotCenter',
  },
  
  {
    path: '/userCenter',
    component: Layout,
    redirect: '/userCenter/userList',
    name: 'userCenter',
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    alwaysShow: true, 
    children: [
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/userCenter/userList'),
        meta: { title: '用户列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/robotCenter',
    component: Layout,
    redirect: '/robotCenter/robotList',
    name: 'robotCenter',
    meta: { title: '机器人管理', icon: 'el-icon-s-help' },
    alwaysShow: true, 
    children: [
      {
        path: 'robotList',
        name: 'robotList',
        component: () => import('@/views/robotCenter/robotList'),
        meta: { title: '机器人列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/managerCenter',
    component: Layout,
    redirect: '/managerCenter/userList',
    name: 'managerCenter',
    meta: { title: '管理员管理', icon: 'el-icon-s-help' },
    alwaysShow: true, 
    children: [
      {
        path: 'managerList',
        name: 'managerList',
        component: () => import('@/views/managerCenter/managerList'),
        meta: { title: '管理员列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/orderCenter',
    component: Layout,
    redirect: '/orderCenter/orderList',
    name: 'orderCenter',
    meta: { title: '订单管理', icon: 'el-icon-s-help' },
    alwaysShow: true, 
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        component: () => import('@/views/orderCenter/orderList'),
        meta: { title: '订单列表', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
