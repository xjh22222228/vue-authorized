<template>
    <ul class="unique-topics-list">
        <li v-for="item of topics" :key="item.id">
            <div class="avatar">
                <router-link :to="{name: 'User', params: {loginname: item.author.loginname}}">
                    <img :src="item.author.avatar_url" alt="头像" :title="item.author.loginname" />
                </router-link>
            </div>
            <div class="reply-view" v-if="item.reply_count !== undefined">{{ item.reply_count }}/{{ item.visit_count }}</div>
                <span class="tag" :class="tag(item).className" v-if="item.tab">{{ tag(item).text }}</span>
            <router-link class="title" :to="{name: 'Topic', params: {id: item.id}}">{{ item.title }}</router-link>
            <div class="last-reply-time">
                <time>{{ item.last_reply_at | fromNow }}</time>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'TopicsList',
    props: {
        topics: {
            type: Array,
            default () {
                return []
            },
            required: true,
        }
    },
    methods: {
        tag (topic) {
            if( topic.top ) {
                return {
                    text: '置顶',
                    className: 'top',
                }
            }
            if( topic.good ) {
                return {
                    text: '精华',
                    className: 'good',
                }
            }
            switch(topic.tab) {
                // 问答
                case 'ask':
                    return {
                        text: '问答',
                        className: topic.tab
                    };
                // 分享
                case 'share':
                    return {
                        text: '分享',
                        className: topic.tab
                    };
                // 招聘
                case 'job':
                    return {
                        text: '招聘',
                        className: topic.tab
                    };
                // 精华
                case 'good':
                    return {
                        text: '精华',
                        className: topic.tab
                    };
                // 测试
                case 'dev':
                    return {
                        text: '测试',
                        className: topic.tab
                    };
                default:
                    return {
                        text: '',
                        className: 'default'
                    }
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
.unique-topics-list {

    li {
        overflow: hidden;
        padding: 10px;
        

        &:not(:nth-last-child(1)) {
            border-bottom: 1px solid #f6f6f6;
        }

        &:hover {
            background: #eee;
        }
    }

    .avatar {
        float: left;

        img {
            width: 35px;
            height: 35px;
            object-fit: cover;
            border-radius: 2px;
        }
    }

    .reply-view {
        float: left;
        width: 70px;
        text-align: center;
        font-size: 12px;
        margin: 9px 0 0 20px;
    }

    .tag {
        float: left;
        margin-top: 7px;
        font-size: 12px;
        color: #999;
        background: #e5e5e5;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: 500;

        &.good,
        &.top {
            background: #80bd01;
            color: #fff;
        }
    }

    .title {
        float: left;
        display: inline-block;
        width: calc(100% - 230px);
        margin: 6px 0 0 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px;

        &:hover {
            text-decoration: underline;
            color: #333;
        }
    }

    .last-reply-time {
        float: right;
        font-size: 12px;
        margin-top: 8px;
    }
}
</style>
