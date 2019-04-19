import Vue from 'vue'
import Router from 'vue-router'
import loginRoute from './login'
import userRoute from './user'
import homeRoute from './home'
import drillRoute from './drill'
import exhibits from './exhibits'
import VueWeChatTitle from 'vue-wechat-title'
import VueCookies from 'vue-cookie'
import * as appApi from "../appApi"
import vueG from 'vueg'
import { Toast } from 'vant';
Vue.use(Toast);

const footNameArr = [{
    name: 'homePage',
    active: 0
  }, {
    name: 'Business',
    active: 1
  }, {
    name: 'UserPage',
    active: 2
  },
];
Vue.use(Router);

// {
//   name: 'Drill',
//     active: 2
// },

const router = new Router({
  // mode: 'history',
  routes: [
    loginRoute,
    userRoute,
    homeRoute,
    drillRoute,
    exhibits
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

Vue.use(VueWeChatTitle);
Vue.use(vueG, router, {
  shadow: false,
  // disableAtSameDepths: true,
});

router.beforeEach((to, from, next) => {
  // const token = VueCookies.get('token');
  footNameArr.forEach((item) => {
    if(to.name.indexOf(item.name) >= 0) {
      to.meta.active = item.active
    }
  });

  // if(token) {
  //   appApi.refreshToken({
  //     uid: VueCookies.get('uid'),
  //     token: VueCookies.get('token'),
  //   }).then(res => {
  //     if(res.code === '1') {
  //       VueCookies.delete('token');
  //       VueCookies.set('token', res.data.token)
  //     } else if(res.code === '-4') {
  //       VueCookies.delete('token');
  //       VueCookies.delete('uid');
  //       VueCookies.delete('isAuth');
  //       VueCookies.delete('ewm_path');
  //       VueCookies.delete('userPhone');
  //       VueCookies.delete('inventNum');
  //       router.push({name:'homePage'});
  //     }
  //   });
  // }

  if(to.meta.isLogin) {
    let uToken = VueCookies.get('token');
    if(!uToken){
      router.push({name:'login'});
      return;
    }
  }
  if(to.meta.isAuth){
    if(VueCookies.get('isAuth')==='false'){
      Toast('您暂未实名认证，为了您的权益，请先实名认证');
      router.push('/user/cash/certification?opType=1');
      return;
    }
  }
  // if(to.name == 'productBrief'){
  //   to.meta.title = JSON.parse(localStorage.getItem("p_info")).p_name + '介绍';
  // }
  // if(to.name == 'subOrderA'){
  //   to.meta.title = JSON.parse(localStorage.getItem("p_info")).p_name + '提单';
  // }
  if(to.name == 'banner'){
    to.meta.title = localStorage.getItem("title").replace(/"/g,'');
  }
  next();
});

export default router;
