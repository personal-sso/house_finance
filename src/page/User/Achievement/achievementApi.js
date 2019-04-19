import http from '../../../api/public';

//获取我的业绩
export const myAchievementNew = (params, token) => {
  return http.fetchPost('/myAchievementNew', params, token);
};

//获取下级人数
export const myPartnerNew = (params, token) => {
  return http.fetchPost('/myPartnerNew', params, token);
};

//获取佣金详情
export const myCommissionNew = (params, token) => {
  return http.fetchPost('/myCommissionNew', params, token);
};
