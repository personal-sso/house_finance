const Home = () => import('../page/Home/Home.vue');
const HomePage = () => import('../page/Home/HomePage/HomePage.vue');
const ProductBrief = () => import('../page/Home/ProductBrief/ProductBrief.vue');
const SubOrderA = () => import('../page/Home/SubOrderA/SubOrderA.vue');
const Success = () => import('../page/Home/Success/Success.vue');
const AccessTest = () => import('../page/Home/AccessTest/AccessTest.vue');
const Calculate = () => import('../page/Home/Calculate/Calculate.vue');
const ShareOrder = () => import('../page/Home/ShareOrder/ShareOrder.vue');
const Banner = () => import('../page/Home/Banner/Banner.vue');
const HouseAssess = () => import('../page/Home/HouseAssess/HouseAssess.vue');
const AssessResult = () => import('../page/Home/HouseAssess/AssessResult/AssessResult.vue');
const Loading = () => import('../page/Home/HouseAssess/Loading/Loading.vue');
const AssessPage = () => import('../page/Home/HouseAssess/AssessPage/AssessPage.vue');
const SearchPage = () => import('../page/Home/HouseAssess/SearchPage/SearchPage.vue');

export default {
  path: '/',
  name: 'home',
  component: Home,
  meta: {
    title: '首页',
    showFooter: true
  },
  children: [{
      path: '/',
      name: 'homePage',
      component: HomePage,
      meta: {
        title: '首页',
        showFooter: true
      }
    },
    {
      path: 'productBrief/:id',
      name: 'productBrief',
      component: ProductBrief,
      meta: {
        title: '产品介绍'
      }
    },
    {
      path: 'subOrderA',
      name: 'subOrderA',
      component: SubOrderA,
      meta: {
        title: '我要提单',
        isLogin: true,
        isAuth: true
      }
    },
    {
      path: 'success',
      name: 'success',
      component: Success,
      meta: {
        title: '提单成功',
        isLogin: true,
        isFrom: true
      }
    },
    {
      path: 'accessTest',
      name: 'accessTest',
      component: AccessTest,
      meta: {
        title: '准入测试'
      }
    },
    {
      path: 'calculate',
      name: 'calculate',
      component: Calculate,
      meta: {
        title: '还款测算',
        isLogin: true
      }
    },
    {
      path: 'shareOrder',
      name: 'shareOrder',
      component: ShareOrder,
      meta: {
        title: '共享订单',
        isLogin: true
      }
    },
    {
      path: 'banner',
      name: 'banner',
      component: Banner,
      meta: {
        title: '广告',
      }
    },
    {
      path: 'houseAssess',
      name: 'houseAssess',
      component: HouseAssess,
      meta: {
        isLogin: true
      },
      children: [{
          path: '',
          name: 'assessPage',
          component: AssessPage,
          meta: {
            title: '房产估值',
            isLogin: true
          }
        },
        {
          path: 'assessResult',
          name: 'assessResult',
          component: AssessResult,
          meta: {
            title: '房产估值结果',
            isLogin: true
          }
        },
        {
          path: 'loading',
          name: 'loading',
          component: Loading,
          meta: {
            title: '房产估值查询中',
            isLogin: true
          }
        },
        {
          path: 'searchPage/:id',
          name: 'searchPage',
          component: SearchPage,
          meta: {
            title: '房产估值'
          }
        }
      ]
    }
  ]
}
