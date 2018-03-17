<template>
    <section class="topic index-section">
        <div class="topics-container">
            <div class="detail">
                <div class="loading" v-show="loading">loading...</div>
                <div class="topic-top">
                    <div class="topic-title">
                        <span class="tag" v-if="detail.top || detail.good">{{ detail | tagName }}</span>
                        <h1>{{ detail.title }}</h1>
                    </div>
                    <div class="topic-bottom">
                        <div class="topic-info">
                            <span>• 发布于 {{ detail.create_at | fromNow}} • 作者 </span>
                            <router-link :to="`/user/${detail.author.loginname}`">{{ detail.author.loginname }}</router-link>
                            <span> • {{ detail.visit_count }} 次浏览 • 最后一次编辑是 {{ detail.last_reply_at | fromNow }} • 来自 {{ detail.tab | comeFrom }}</span>
                        </div>
                        <div class="collection user-select-none" v-if="isLogin">
                            <button @click="collectionBtn">{{ detail.is_collect ? '取消收藏' : '收藏' }}</button>
                        </div>
                        <div class="operation-edit" v-if="isLogin && detail.author_id === userInfo.id">
                            <router-link :to="`/release/${detail.id}`">
                                <Icon type="compose" title="编辑"></Icon>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="content markdown-body" v-html="detail.content"></div>
            </div>
            <!-- 回复区域 -->
            <div class="reply" v-show="detail.reply_count > 0">
                <div class="reply-count">{{ detail.reply_count }} 回复</div>
                <ul>
                    <li v-for="(item, index) of detail.replies" :key="item.id">
                        <div class="avatar">
                            <router-link :to="`/user/${item.author.loginname}`">
                                <img :src="item.author.avatar_url" alt="头像" />
                            </router-link>
                        </div>
                        <div class="reply-right">
                            <div class="reply-author">
                                <router-link :to="`/user/${item.author.loginname}`">{{ item.author.loginname }}</router-link>
                                <span>{{ index + 1 }}楼•{{ item.create_at | fromNow }}</span>
                                <strong v-if="detail.author.loginname == item.author.loginname">作者</strong>
                            </div>
                            <div class="operation user-select-none">
                                <div>
                                    <Icon 
                                        :type="item.is_uped ? 'ios-heart' : 'ios-heart-outline'" 
                                        @click.native="likeBtn(item.id, item.author, index)" />
                                    <em>{{ item.ups.length }}</em>
                                </div>
                                <div @click="replyOthers(item.author.loginname)" v-if="isLogin">
                                    <Icon type="reply"></Icon>
                                </div>
                            </div>
                        </div>
                        <div class="reply-content markdown-body" v-html="item.content"></div>
                    </li>
                </ul>
            </div>
            <!-- 新建评论 -->
            <div class="insert-reply" :class="{hidden: !isLogin}">
                <div class="tip">添加回复</div>
                <textarea id="markdown-editor"></textarea>
                <div class="reply-btn">
                    <button type="button" @click="insertReply">{{ insertBtnText }}</button>
                </div>
            </div>
        </div>
        <Sidebar :author="detail.author" from="topic" />
    </section>
</template>

<script>
import SimpleMDE from 'simplemde'
import API_CONFIG from '../../api'
import { mapState } from 'vuex'
export default {
    name: 'Topic',
    data () {
        return {
            loading: true,
            insertBtnText: '回复',
            detail: {
                author: {
                    avatar_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEX29vYACyOqAAAACklEQVQI12MAAgAABAABINItbwAAAABJRU5ErkJggg==',
                    loginname: '--',
                },
                author_id: '',
                content: '',
                create_at: Date.now(),
                good: false,
                id: '',
                is_collect: false,
                last_reply_at: Date.now(),
                replies: [],
                reply_count: 0,
                tab: '',
                title: '',
                top: false,
                visit_count: 0,
            },
            simplemde: null,
        }
    },
    computed: {
        ...mapState(['isLogin', 'userInfo'])
    },
    beforeRouteEnter (to, from, next) {
        window.scrollTo(0, 0);
        next(vm => {
            vm.fetchTopic();
        })
    },
    methods: {
        initMarkdownEditor () {
            this.simplemde = new SimpleMDE({
                element: document.getElementById("markdown-editor"),
                spellChecker: false, 				// 启用拼写检查，会有背景色
                autoDownloadFontAwesome: false,		// 是否需要下载字体图标
            });
        },
        // 获取主题详情
        fetchTopic () {
            this.loading = true;
            axios.get(`${API_CONFIG.topicDetail}${this.$route.params.id}`)
            .then(res => {
                if( res.data.success ) {
                    this.detail = res.data.data;
                    this.loading = false;
                    this.$nextTick(() => {
                        var code = document.querySelectorAll('.markdown-body code');
                        for(var i = 0; i < code.length; i++) {
                            hljs.highlightBlock(code[i]);
                        }
                    });
                }
            })
            .catch(e => {
                this.$router.replace('/');
            });
        },
        // 收藏 && 取消收藏主题
        collectionBtn () {
            var url = this.detail.is_collect ? API_CONFIG.cancelCollection : API_CONFIG.collection;
            axios.post(url, {
                topic_id: this.detail.id
            })
            .then(res => {
                if( res.data.success ) {
                    this.detail.is_collect = !this.detail.is_collect;
                }
            })
            .catch(e => e);
        },
        // 插入评论
        insertReply () {
            // 避免多次点击按钮
            if( this.insertBtnText === '发送中...' ) return;
            var val = this.simplemde.value();
            if( !val ) return this.$Message.warning('内容不能为空!');
            this.insertBtnText = '发送中...';
            axios.post(`${API_CONFIG.replies}${this.detail.id}/replies`, {
                content: val,
            })
            .then(res => {
                if( res.data.success ) {
                    this.simplemde.value('');
                    this.$Message.success('发送成功!');
                    this.insertBtnText = '回复';
                    // 更新资源
                    this.fetchTopic();
                }
            })
            .catch(e => {
                this.insertBtnText = '回复';
            });
        },
        /**
         * @func 点赞/取消点赞
         * @param {String} id 
         * @param {Object} author 
         * @param {Number} index 
         */
        likeBtn (id, author, index) {
            try {
                if( !this.isLogin ) throw new Error('您未登陆!');
                if( author.loginname === this.userInfo.loginname ) throw new Error('不能赞自己!');
            } catch (e) {
                return this.$Message.warning(e.message);
            }
            axios.post(`${API_CONFIG.like}${id}/ups`)
            .then(res => {
                if( res.data.success ) {
                    // 取消赞
                    if( res.data.action === 'down' ) {
                        this.detail.replies[index].is_uped = false;
                        this.detail.replies[index].ups.pop();
                    } else {
                        this.detail.replies[index].is_uped = true;
                        this.detail.replies[index].ups.push(Date.now());
                    }
                }
            })
            .catch(e => e);
        },
        // 回复别人
        replyOthers (loginname) {
            var top = document.querySelector('.insert-reply').offsetTop;
            window.scrollTo(0, top - 80);
            this.simplemde.value(`@${loginname} `);
        },
    },
    filters: {
        // 标签名字
        tagName (detail) {
            if( detail.top ) return '置顶';
            if( detail.good ) return '精华';
        },
        // 来自哪个分类
        comeFrom (tab) {
            switch (tab) {
                case 'ask':
                    return '问答';
                case 'share':
                    return '分享';
                case 'job':
                    return '招聘';
                case 'good':
                    return '精华';
                default:
                    return '';
            }
        }
    },
    mounted () {
        this.initMarkdownEditor();
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
.topic {

    .detail {
        position: relative;
        min-height: 300px;
        background: #fff;

        .loading {
            z-index: 666;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            padding-top: 100px;
            background: #fff;
            text-align: center;
        }

        .topic-top {
            padding: 15px 10px;
            border-bottom: 1px solid #eee;
        }

        .topic-title {
            overflow: hidden;

            .tag {
                float: left;
                margin-top: 3px;
                font-size: 12px;
                background: #80bd01;
                color: #fff;
                padding: 2px 4px;
                border-radius: 3px;
                font-weight: bold;
                white-space: nowrap;
            }

            h1 {
                float: left;
                width: calc(100% - 50px);
                margin: -4px 5px 0 10px;
                font-weight: bold;
                color: #000;
                font-size: 22px;
            }
        }

        .topic-bottom {
            margin-top: 10px;

            span,
            a {
                font-size: 12px;
            }

            a {
                color: #333;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .collection {
            text-align: right;

            button {
                position: relative;
                padding: 5px 10px;
                background: #80bd01;
                color: #fff;
                border: none;
                font-weight: 500;
                border-radius: 3px;

                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 3px;
                    background: #000;
                    opacity: 0;
                }

                &:active:after {
                    opacity: .2;
                }
            }
        }

        .operation-edit {

            i {
                cursor: pointer;
                font-size: 22px;
            }
        }
    }

    .content {
        padding: 10px 20px;
    }

    .reply {
        margin-top: 15px;
        border-radius: 3px;

        li {
            padding: 10px 10px 30px 10px;
            overflow: hidden;
            background: #fff;
        }

        .reply-count {
            padding: 10px;
            background: #f6f6f6;
        }

        .avatar {
            float: left;

            img {
                width: 30px;
                height: 30px;
                background: #f7f7f7;
                object-fit: cover;
                border-radius: 3px;
            }
        }

        .reply-author {
            float: left;

            a {
                font-size: 12px;
                color: #000;
            }

            span {
                margin-left: 5px;
                font-size: 12px;
                color: #08c;
            }

            strong {
                margin-left: 5px;
                font-size: 12px;
                background: #80bd01;
                color: #fff;
                padding: 1px;
                border-radius: 1px;
                font-weight: bold;
            }
        }

        .reply-right {
            float: left;
            width: calc(100% - 40px);
            overflow: hidden;
            margin: 0 0 0 10px;
        }

        .operation {
            float: right;

            i {
                cursor: pointer;
                font-size: 16px;
                vertical-align: middle;
            }

            em {
                margin-left: 3px;
            }

            > div {
                float: left;
                margin-left: 7px;
            }
        }

        .reply-content {
            clear: left;
            padding-left: 40px;
        }
    }

    // 新建评论
    .insert-reply {
        margin-top: 15px;
        background: #fff;

        &.hidden {
            z-index: -1111;
            position: fixed;
            top: -1000px;
            left: -1000px;
            visibility: hidden;
        }

        .tip {
            padding: 10px;
            background: #f6f6f6;
        }

        .reply-btn {
            padding: 0 0 10px 10px;

            button {
                position: relative;
                color: #fff;
                background: #08c;
                border-radius: 3px;
                padding: 5px 10px;
                font-weight: 500;
                border: none;

                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: 3px;
                    background: #000;
                    opacity: 0;
                }

                &:active:after {
                    opacity: .1;
                }
            }
        }
    }
}
</style>
