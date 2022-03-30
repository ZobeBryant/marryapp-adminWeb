import axios from 'axios';      // 引入axios
import qs from 'qs'

axios.defaults.baseURL = 'api';
axios.defaults.timeout = 500000;             // 超时默认值
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use(config => {
  const headers = config.headers;

  if(config.method === 'post'){
    console.log('拦截', config.data);
    let adminId = localStorage.getItem('adminId');
    let adminToken = localStorage.getItem('adminToken');
    if(adminId != null && adminToken != null) {
      console.log(adminId);
      config.data['adminId'] = adminId+"";
      config.data['token'] = adminToken;
    }
    //config.data = qs.stringify(config.data);
  }

  console.log('拦截', config.data);
  //添加一些token啥的
  return config;
}, err => {
  return Promise.reject(err);
});

export default axios;
