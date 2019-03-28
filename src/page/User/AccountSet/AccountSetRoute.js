const AccountSet = () => import('./AccountSet.vue');
const AccountSeting = () => import('./AccountSeting/AccountSeting.vue');
const ChangeMobile = () => import('./ChangeMobile/ChangeMobile.vue');

export default {
  path: '/user/account',
  name: 'AccountSet',
  component: AccountSet,
  meta: {
    title: '账户设置',
    isLogin: true
  },
  children: [{
    name: 'AccountSetIng',
    path: '/user/account',
    component: AccountSeting,
    meta: {
      title: '账户设置',
      isLogin: true
    },
  }, {
    name: 'ChangeMobile',
    path: '/user/account/mobile',
    component: ChangeMobile,
    meta: {
      title: '更改手机号',
      isLogin: true
    },
  }]
}
