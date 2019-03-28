import VueCookies from 'vue-cookie';
const state = {
  userPhoneData: {},
  userData: {
    token: VueCookies.get('token') || '',
    isAuth: VueCookies.get('isAuth') || false,
    uid: VueCookies.get('uid')||'',
  }
};
export default state;
