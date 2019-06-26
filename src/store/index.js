import Vue from 'vue';
import { serviceLogin, serviceGetMessageCount } from '@/services';
import { defaultAvatar } from '@/constants';

export const state = Vue.observable({
  count: 0,
  accessToken: window.localStorage.access_token || '',
  isLogin: false,
  userInfo: {
    avatar_url: defaultAvatar,     // 头像
    id: '',             // 用户 id
    loginname: '',      // 用户名
  },
  messageCount: 0,        // 未读消息数
});

// 更新登录状态
function updateLoginStatus(data) {
  if (data.accessToken) {
    window.localStorage.access_token = window.localStorage.save_access_token = state.accessToken = data.accessToken;
    state.userInfo = data.userInfo;
  } else {
    state.userInfo = data;
  }
  state.isLogin = true;
}

// 登录
export function login(data) {
  updateLoginStatus(data);
  fetchMessageCount();
}

// 退出登录
export function logout() {
  window.localStorage.removeItem('access_token');
  state.accessToken = '';
  state.isLogin = false;
}

// 检查是否已登录
export function checkLogin() {
  if (state.accessToken) {
    serviceLogin()
    .then(res => {
      if (res.data.success) {
        updateLoginStatus(res.data);
        fetchMessageCount();
      }
    });
  }
}

// 获取未读消息数
export function fetchMessageCount() {
  serviceGetMessageCount()
  .then(res => {
    if (res.data.success) {
      state.messageCount = res.data.data;
    }
  });
}

export default state;
