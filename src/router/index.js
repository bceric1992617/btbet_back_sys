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
    redirect: '/userCenter/userList',
    name: 'userCenter',
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
