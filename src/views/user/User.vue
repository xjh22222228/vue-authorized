<template>
    <section class="index-section">
        <div class="topics-container user">
            <div class="box">
                <div class="box-title">
                    <router-link to="/">主页</router-link>
                    <em class="slashes"> / </em>
                    <span>个人主页</span>
                </div>
                <div class="user-info">
                    <div class="user">
                        <img :src="user.avatar_url" alt="avatar" />
                        <span>{{ user.loginname }}</span>
                    </div>
                    <div>{{ user.score }} 积分</div>
                    <div class="view-topics-collections">
                        <router-link :to="`/user/${user.loginname}/collections`">查看话题收藏</router-link>
                    </div>
                    <div class="create-at">注册时间 {{ user.create_at | fromNow }}</div>
                </div>
            </div>
            <div class="box">
                <div class="box-title">最近创建的话题</div>
                <List :topics="user.recent_topics" />
            </div>
            <div class="box">
                <div class="box-title">最近参与的话题</div>
                <List :topics="user.recent_replies" />
            </div>
        </div>
        <Sidebar />
    </section>
</template>

<script>
import API_CONFIG from '../../api'
export default {
    name: 'User',
    data () {
        return {
            user: {          // 用户详情
                loginname: '--',
                avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEX29vYACyOqAAAACklEQVQI12MAAgAABAABINItbwAAAABJRU5ErkJggg==',
                githubUsername: 'alsotang',
                create_at: Date.now(),
                score: 0,
                recent_topics: [],              // 最近创建的话题
                recent_replies: [],             // 最近参与的话题
            }
        }
    },
    created () {
        this.fetchUserDetail();
    },
    methods: {
        fetchUserDetail () {
            axios.get(`${API_CONFIG.user}${this.$route.params.loginname}`)
            .then(res => {
                if( res.data.success ) {
                    this.user = res.data.data;
                }
            })
            .catch(e => {
                this.$Message.warning('不存在此用户');
                this.$router.replace('/');
            })
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
.user {

    .box {
        margin-bottom: 15px;
        background: #fff;
        border-radius: 3px;

        .box-title {
            padding: 10px;
            background: $boxTopColor;

            a {
                color: #80bd01;

                &:hover {
                    text-decoration: underline;
                }
            }

            .slashes {
                color: #ccc;
            }

            span {
                color: #999;
            }
        }

        .user-info {
            padding: 15px 10px;

            .user {
                margin-bottom: 10px;

                img {
                    width: 50px;
                    height: 50px;
                    background: #f6f6f6;
                    vertical-align: middle;
                }

                span {
                    margin-left: 10px;
                    vertical-align: middle;
                }
            }

            .view-topics-collections {
                margin-top: 5px;

                a {
                    color: #333;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .create-at {
                margin-top: 10px;
                color: #666;
            }
        }
    }

    .unique-topics-list .title {
        width: calc(100% - 100px) !important;
    }
}
</style>
