import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载配置 start
const home = () =>
  import ( /* webpackChunkName: "home" */ '@/components/home/home.vue')
const input = () =>
  import ( /* webpackChunkName: "input" */ '@/components/input/input.vue')
const select = () =>
  import ( /* webpackChunkName: "input" */ '@/components/select/select.vue')
const datePicker = () =>
  import ( /* webpackChunkName: "input" */ '@/components/date-picker/date-picker.vue')
// 路由懒加载配置 end

Vue.use(Router)

const routes = [{
    path: '/home',
    name: 'home',
    component: home,
    children: [{ //input
      path: 'input',
      name: 'XInput',
      component: input,
    }, { //select
      path: 'select',
      name: 'XSelect',
      component: select,
    }]
  },
  {
    path: '*',
    redirect: '/home'
  }
];

const router = new Router({
  routes
})

// 路由发生变化修改页面title
router.beforeEach((to, from, next) => {
  // if (to.meta.title) {
  //   document.title = to.meta.title;
  // } else {
  //   document.title = "智数UI - 有情怀，会装逼";
  // }
  next()
})

export default router;