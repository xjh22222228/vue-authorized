<template>
  <section class="login">
    <div class="box">
      <div class="input last">
        <input 
          type="text" 
          maxlength="50" 
          v-model.trim="accessToken" 
          placeholder="Access Token"
        />
      </div>
      <div class="get-access-token">
        <a href="https://cnodejs.org/setting" target="_blank">如何获取Access Token？</a>
      </div>
      <div class="submit user-select-none" @click="handleLogin">Sign in</div>
    </div>
  </section>
</template>

<script>
import { serviceLogin } from '@/services';
import { login, state } from '@/store';
import { value, onCreated } from 'vue-function-api';

export default {
  name: 'Login',
  setup(props, ctx) {
    const accessToken = value(window.localStorage.save_access_token || '');

    const hasAccessToken = () => {
      if (state.accessToken) {
        ctx.root.$router.replace('/');
      }
    };

    const handleLogin = () => {
      if (!accessToken.value) return ctx.root.$Message.warning('Access Token不能为空');
      serviceLogin({ accesstoken: accessToken.value })
      .then(res => {
        if (res.data.success) {
          login({
            accessToken: accessToken.value,
            userInfo: res.data,
          });
          ctx.root.$router.replace('/');
        }
      });
    };

    onCreated(() => {
      hasAccessToken();
    });

    return {
      accessToken,
      hasAccessToken,
      handleLogin
    }
  }
}
</script>

<style lang="scss">
.login {

  .box {
    width: 300px;
    margin: 80px auto;
    padding: 70px 20px;
    background: #444;
    border-radius: 3px;
  }

  .get-access-token {
    margin-top: 10px;

    a {
      color: #fff;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .input {
    height: 45px;

    input {
      width: 100%;
      height: 100%;
      padding: 0 0 0 8px;
      box-sizing: border-box;
      font-size: 16px;
    }
  }

  .last input {
    border-radius: 0 0 5px 5px;
  }

  .submit {
    position: relative;
    margin-top: 15px;
    padding: 10px 0;
    background: #f9671e;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #000;
      border-radius: 5px;
      opacity: 0;
    }

    &:active:after {
      opacity: .2;
    }
  }
}
</style>
