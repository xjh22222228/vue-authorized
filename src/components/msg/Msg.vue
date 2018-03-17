<template>
    <div class="msg-list">
        <div class="msg-loading" v-show="loading"></div>
        <div class="no-msg" v-show="readMessages.length === 0">暂无消息</div>
        <ul>
            <li v-for="(item, index) of readMessages" :key="item.id">
                <div v-if="item.type === 'reply'">
                    <router-link :to="`/user/${item.author.loginname}`">{{ item.author.loginname }}</router-link>
                    <span> 回复了你的话题 </span>
                    <router-link :to="`/topic/${item.topic.id}`">{{ item.topic.title }}</router-link>
                </div>
                <div v-else-if="item.type == 'at'">
                    <router-link :to="`/user/${item.author.loginname}`">{{ item.author.loginname }}</router-link>
                    <span> 在话题 </span>
                    <router-link :to="`/topic/${item.topic.id}`">{{ item.topic.title }}</router-link>
                    <span> 中@了你</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Msg',
    props: {
        loading: {
            type: Boolean,
            default: true,
        },
        readMessages: {
            type: Array,
            default () {
                return [];
            }
        }
    },
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
.msg-list {
    position: relative;
    background: #fff;
    padding: 10px;

    .msg-loading {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        height: 20px;
        background: #f7f7f7;
    }

    li {
        padding: 10px 0;
        
        &:not(:nth-last-child(1)) {
            border-bottom: 1px solid #f6f6f6;
        }

        > div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        
        a {
            color: #08c;

            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
