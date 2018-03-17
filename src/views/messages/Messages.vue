<template>
    <section class="index-section">
        <div class="topics-container messages">
            <div class="new-msg">
                <div class="top">
                    <router-link to="/">主页</router-link>
                    <em> / </em>
                    <span>新消息</span>
                </div>
                <Msg :readMessages="message.hasnot_read_messages" :loading="loading" />
            </div>
            <div class="past-times">
                <div class="top">已读消息</div>
                <Msg :readMessages="message.has_read_messages" :loading="loading" />
            </div>
        </div>
        <Sidebar />
    </section>
</template>

<script>
import API_CONFIG from '../../api'
import Msg from '../../components/msg/Msg'
export default {
    name: 'Messages',
    components: {
        Msg,
    },
    data () {
        return {
            loading: true,
            message: {                      // 已读和未读消息
                has_read_messages: [],
                hasnot_read_messages: []
            }
        }
    },
    created () {
        this.fetchMessages();
    },
    methods: {
        fetchMessages () {
            axios.get(API_CONFIG.fetchMessages)
            .then(res => {
                if( res.data.success ) {
                    this.loading = false;
                    this.message = res.data.data;
                }
            })
            .catch(e => {
                this.$router.replace('/');
            });
        }
    },
    mounted () {
        // 标记全部已读
        if( this.$store.state.messageCount > 0 ) {
            axios.post(API_CONFIG.messageMarkAll)
            .then(res => {})
            .catch(e => e);
        }
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
.messages {
    
    .top {
        padding: 10px 10px;
        background: $boxTopColor;

        a {
            color: #80bd01;

            &:hover {
                text-decoration: underline;
            }
        }

        em {
            color: #ccc;
        }

        span {
            color: #999;
        }
    }

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

    .past-times {
        margin-top: 15px;
    }
}
</style>
