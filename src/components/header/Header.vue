<template>
  <header class="header">
    <div class="header-box">
      <router-link to="/" class="logo user-select-none">
        <img src="https://xjh22222228.github.io/nav/assets/icon/frontend/065.svg" alt="logo" />
      </router-link>
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/messages" v-if="isLogin" :class="{'unread-msg': messageCount > 0}">未读消息</router-link>
        <a href="https://github.com/xjh22222228" ref="noopenr noreferer" target="_blank">关于作者</a>
        <span href="javascript:;" v-if="isLogin" @click="handleLogout">退出</span>
        <router-link to="/login" v-else>登录</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import { logout, state } from '@/store';
import { computed } from 'vue-function-api';

export default {
  name: 'Header',
  setup(props, ctx) {
    const isLogin = computed(() => state.isLogin);
    const messageCount = computed(() => state.messageCount);

    const handleLogout = () => {
      logout();
      ctx.root.$Message.success('已登出！');
    }

    return {
      isLogin,
      messageCount,
      handleLogout
    }
  }
}
</script>

<style lang="scss">
.header {
  z-index: 6;
  position: relative;
  padding: 10px 10px 15px 0;
  background: #444;

  .header-box {
    width: $width;
    margin: 0 auto;
    overflow: hidden;
  }

  .logo {
    float: left;

    img {
      width: 30px;
      pointer-events: none;
    }
  }

  .nav {
    margin-top: 8px;
    float: right;

    a,
    span {
      position: relative;
      color: #ccc;
      margin-left: 20px;
      cursor: pointer;

      &:hover {
        color: #fff;
      }
    }

    .unread-msg {

      &:after {
        content: '';
        position: absolute;
        top: -3px;
        right: -9px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #f50;
      }
    }
  }
}
</style>
