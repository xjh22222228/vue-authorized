import Vue from 'vue'
import Vuex from 'vuex'
import API_CONFIG from '../api'

Vue.use(Vuex)



var store = new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    state: {
        accessToken: window.localStorage.access_token || '',
        isLogin: false,
        userInfo: {
            avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEX29vYACyOqAAAACklEQVQI12MAAgAABAABINItbwAAAABJRU5ErkJggg==',     // 头像
            id: '',             // 用户 id
            loginname: '',      // 用户名
        },
        messageCount: 0,        // 未读消息数
    },
    mutations: {
        // 退出登录
        logout (state) {
            window.localStorage.removeItem('access_token');
            state.accessToken = '';
            state.isLogin = false;
        },
        // 更新登录状态
        updateLoginStatus (state, data) {
            if( data.accessToken ) {
                window.localStorage.access_token = window.localStorage.save_access_token = state.accessToken = data.accessToken;
                state.userInfo = data.userInfo;
            } else {
                state.userInfo = data;
            }
            state.isLogin = true;
        },
        // 更新未读消息数
        updateMessageCount (state, count) {
            state.messageCount = count;
        }
    },
    actions: {
        // 登录
        login ({ dispatch, state, commit }, data) {
            commit('updateLoginStatus', data);
            dispatch('fetchMessageCount');
        },
        // 检查是否已登录
        checkLogin ({ state, dispatch, commit }) {
            if( state.accessToken ) {
                axios.post(API_CONFIG.login)
                .then(res => {
                    if( res.data.success ) {
                        commit('updateLoginStatus', res.data);
                        dispatch('fetchMessageCount');
                    }
                })
                .catch(e => e);
            }
        },
        // 获取未读消息数
        fetchMessageCount ({ commit }) {
            axios.get(API_CONFIG.messageCount)
            .then(res => {
                if( res.data.success ) {
                    commit('updateMessageCount', res.data.data)
                }
            })
            .catch(e => e);
        }
    }
});






export default store;