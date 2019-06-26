/**
 * @file axios http request config
 * @since 1.0.0
 * @author xiejiahe <mb06@qq.com>
 */

import axios from 'axios';
import { state } from '@/store'
import NProgress from '@/utils/nprogress';
import iview from 'iview';

const $Message = iview.Message;


/**
 * Global HTTP Setting
 */
axios.defaults.timeout = 60000;
axios.defaults.baseURL = 'https://cnodejs.org';

// http Request instance
const httpInstance = axios.create();
// Merge axios to httpInstance, 
Object.setPrototypeOf(httpInstance, axios);

// Add a request interceptor
httpInstance.interceptors.request.use(config => {
  NProgress.start();

  const defaultData = {
    accesstoken: state.accessToken
  };

  if( config.method === 'post' ) {
    config.data = Object.assign(defaultData, config.data);
  }

  if( config.method === 'get' ) {
    config.params = Object.assign(defaultData, config.params);
  }
  return config;
}, e => {
  NProgress.done();

  $Message.warning('请求失败, 请稍后再试!');
  return Promise.reject(e);
});

// Add a response interceptor
httpInstance.interceptors.response.use(res => {
  NProgress.done();
  return res;
}, e => {
  const statusCode = e.response.status;
  if (statusCode === 404) {
    $Message.warning('接口已被关闭!');
  } else {
    $Message.warning('请求超时或服务器出错!');
  }
  NProgress.done();
  return Promise.reject(e);
});

export default httpInstance;
