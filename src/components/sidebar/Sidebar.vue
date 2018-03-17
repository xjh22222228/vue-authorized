<template>
    <aside class="sidebar">
        <!-- 个人信息 -->
        <div class="personal-information">
            <div v-if="from !== 'topic'">
                <div v-if="isLogin">
                    <div class="top user-select-none">个人信息</div>
                    <div class="info user-select-none">
                        <router-link :to="{name: 'User', params: {loginname: userInfo.loginname}}">
                            <img :src="userInfo.avatar_url" alt="头像" />
                        </router-link>
                        <router-link :to="{name: 'User', params: {loginname: userInfo.loginname}}" class="nickname">{{ userInfo.loginname }}</router-link>
                    </div>
                    <div class="publish-topic">
                        <router-link to="/release/create">发布话题</router-link>
                    </div>
                </div>
                <div class="tourist-box" v-else>
                    <div class="cnode">CNode：Node.js专业中文社区</div>
                    <div class="tourist">
                        <span>当前是游客状态，您可以 </span>
                        <router-link to="/login">登录</router-link>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class="top user-select-none">作者</div>
                <div class="info user-select-none">
                    <router-link :to="{name: 'User', params: {loginname: author.loginname}}">
                        <img :src="author.avatar_url" alt="头像" />
                    </router-link>
                    <router-link :to="{name: 'User', params: {loginname: author.loginname}}">
                        <em class="nickname">{{ author.loginname }}</em>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 收款码 -->
        <div class="pay pointer-events-none">
            <div>如果这个项目能帮到您，那么您可以</div>
            <Carousel autoplay loop :autoplay-speed="5000">
                <CarouselItem>
                    <div>
                        <img src="https://raw.githubusercontent.com/xjh22222228/statics/master/images/pay/alipay.png" alt="支付宝" />
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div>
                        <img src="https://raw.githubusercontent.com/xjh22222228/statics/master/images/pay/wxpay.png" alt="微信" />
                    </div>
                </CarouselItem>
            </Carousel>
        </div>
        <!-- 扫一扫二维码 -->
        <div class="scann-qrcode">
            <div class="scann-qrcode-title">手机端二维码</div>
            <img src="../../assets/images/app-qrcode.png" alt="手机端二维码" />
        </div>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Sidebar',
    props: {
        from: {
            type: String,
            default: '',
        },
        author: {
            type: Object,
            default () {
                return {
                    avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEX29vYACyOqAAAACklEQVQI12MAAgAABAABINItbwAAAABJRU5ErkJggg==',     // 头像
                    id: '',             // 用户 id
                    loginname: '',      // 用户名
                }
            }
        }
    },
    computed: {
        ...mapState(['userInfo', 'isLogin'])
    },
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
.sidebar {
    width: $sidebarWidth;
    float: right;

    .personal-information {
        background: #fff;
        border-radius: 5px;

        .top {
            padding: 10px;
            background: $boxTopColor;
        }

        .info {
            padding: 10px;

            img {
                display: inline-block;
                width: 50px;
                height: 50px;
                background: #f7f7f7;
                object-fit: cover;
            }

            .nickname {
                margin-left: 15px;
                color: #333;
                cursor: pointer;
            }

            a {
                display: inline-block;
                vertical-align: middle;
            }
        }

        .publish-topic {
            padding: 0 0 10px 10px;

            a {
                display: inline-block;
                position: relative;
                margin: 5px 0 0 0;
                padding: 5px 10px;
                background: #80bd01;
                color: #fff;
                border-radius: 5px;
                font-weight: 500;
                border: 1px solid #80bd01;

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
                    transition: opacity .1s linear;
                }

                &:hover:after {
                    opacity: .05;
                }
            }
        }

        .tourist-box {
            padding: 10px;
        }

        .cnode {
            color: #000;
        }

        .tourist {
            margin-top: 15px;

            a {
                color: #2d8cf0;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

    // 收款
    .pay {
        margin-top: 15px;
        padding: 10px;
        border-radius: 5px;
        background: #fff;

        img {
            width: 250px;
            height: 250px;
            object-fit: cover;
        }
    }

    .scann-qrcode {
        margin-top: 15px;
        padding: 10px;
        background: #fff;
        border-radius: 5px;
        text-align: center;

        .scann-qrcode-title {
            padding: 10px;
            margin-bottom: 10px;
            background: $boxTopColor;
        }

        img {
            width: 250px;
            height: 250px;
            pointer-events: none;
        }
    }
}
</style>
