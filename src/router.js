import Vue from 'vue'
import Router from 'vue-router'
import store from '@/module/loginInfo.js'

Vue.use(Router)

const rejectAuthUser = (to, from, next) => {
  alert("rejectAuthUser. :   " + store.state.isLogin)
  if(store.state.isLogin === true) {
 // if(localStorage.getItem("access-token") !== null) {
    //이미 로그인 사용자라서 막아야 함.
    //alert("이미 로그인 한 사용자 입니다.")
    next("/Home")
  } else{
    next()
  }
}

const onlyAuthUser = (to, from, next) => {
   alert("onlyAuthUser.   :   " + store.state.isLogin)
  if(store.state.isLogin === false) {
 // if(localStorage.getItem("access-token") === null)  {
    //아직 로그인한 사용자가 아니라서 막아야 함.
    alert("로그인을 진행하여 주시기 바랍니다.")
    next("/Login")
  } else{
    next()
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/Home', 
      name: 'Home',
      beforeEnter:onlyAuthUser,
      component: () => import('./views/Home.vue')
    },  
    {
      path: '/Login', 
      name: 'Login',  
      beforeEnter : rejectAuthUser,
      component: () => import('./views/Login.vue')
    },
    {
      path: '/employee', 
      name: 'employee',  
      beforeEnter:onlyAuthUser,
      component: () => import('./views/employee/EmployeeInfo.vue'),
      children: 
      [
        { 
          path: '/EmployeeInfo/EmployeeInfoDetail/:EMP_NO', 
          name: 'EmployeeInfoDetail', 
          beforeEnter:onlyAuthUser,
          component: () => import('./views/employee/EmployeeInfoDetail.vue')
        }
      ]
    },
    {
      path: '/projectInfo', 
      name: 'projectInfo', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/project/ProjectInfo.vue'),
      children:
      [
        {
          path: '/ProjectInfo/ProjectInfoReg/:PROJECT_NO', 
          name: 'ProjectInfoReg', 
          beforeEnter:onlyAuthUser,
          component: () => import('./views/project/ProjectInfoReg.vue')
        }
      ]
    },
    {
      path: '/processCodeRegByProject',
      name: 'processCodeRegByProject', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/process/ProcessCodeRegByProject.vue')
      
    },
    // {
    //   path: '/ProjectInfoDetail', 
    //   name: 'ProjectDetail', 
    //   beforeEnter:onlyAuthUser,
    //   component: () => import('./views/ProjectInfoDetail.vue')
    // },
    {
      path: '/purchase', 
      name: 'purchase', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/purchase/PurchaseInfo.vue')
    },
    {
      path: '/Adm',
      name: 'Adm', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/Adm.vue')
    },
    {
      path: '/processCodeReg',
      name: 'processCodeReg', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/process/ProcessCodeReg.vue')      
    },
    
    {
      path: '/About',
      name: 'About',
      beforeEnter:onlyAuthUser,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/LogOut',
      name: 'Logout',
      beforeEnter:onlyAuthUser,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/LogOut.vue')
    },
    {
      path: '/vendor',
      name: 'vendor', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/vendor/Vendor.vue')
    },
    {
      path: '/stock',
      name: 'stock', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/stock/StockInfo.vue')
    },
    {
      path: '/delivery',
      name: 'delivery', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/delivery/DeliveryInfo.vue')
    },
    {
      path: '/sales',
      name: 'sales', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/sales/SalesInfo.vue')
    },
    {
      path: '/popup',
      name: 'popup', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/popup/projectInfo/popProjectInfoDetail.vue')
    },
    {
      path: '/projectStatis',
      name: 'projectStatis', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/dayStatis/projectStatis.vue')
    },
    {
      path: '/processStatis',
      name: 'processStatis', 
      beforeEnter:onlyAuthUser,
      component: () => import('./views/dayStatis/processStatis.vue')
    }
  ]
})
