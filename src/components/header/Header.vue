<template>
    <header class="header">
        <div class="header-box">
            <router-link to="/" class="logo user-select-none">
                <img src="http://o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="logo" />
            </router-link>
            <nav class="nav">
                <router-link to="/">首页</router-link>
                <router-link to="/messages" v-if="isLogin" :class="{'unread-msg': messageCount > 0}">未读消息</router-link>
                <a href="https://github.com/xjh22222228" ref="noopenr noreferer" target="_blank">关于作者</a>
                <a href="javascript:;" v-if="isLogin" @click="logout">退出</a>
                <router-link to="/login" v-else>登录</router-link>
            </nav>
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Header',
    computed: {
        ...mapState(['isLogin', 'messageCount'])
    },
    methods: {
        logout () {
            this.$store.commit('logout');
            this.$Message.success('已登出！');
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
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
            width: 125px;
            pointer-events: none;
        }
    }

    .nav {
        margin-top: 8px;
        float: right;

        a {
            position: relative;
            color: #ccc;
            margin-left: 20px;

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
