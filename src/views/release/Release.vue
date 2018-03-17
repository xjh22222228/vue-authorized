<template>
    <section class="release index-section">
        <div class="topics-container release-left">
            <div class="top">
                <router-link to="/">主页</router-link>
                <em> / </em>
                <span>{{ currentStatus ? '发布话题' : '编辑话题' }}</span>
            </div>
            <div class="select-tab">
                <span>选择版块：</span>
                <Select v-model="tab" style="width:200px">
                    <Option value="dev">客户端测试</Option>
                    <Option value="share">分享</Option>
                    <Option value="ask">问答</Option>
                    <Option value="job">招聘</Option>
                </Select>
            </div>
            <div class="title">
                <Input v-model="title" placeholder="标题字数 10字以上"></Input>
                
            </div>
            <div class="editor">
                <textarea id="markdown-editor"></textarea>
                <div class="release-btn">
                    <button @click="releaseTopics">{{ currentStatus ? '发布' : '更新' }}</button>
                </div>
            </div>
        </div>
        <!-- 侧边栏 -->
        <div class="release-sidebar">
            <div class="block-box">
                <div class="title-top">Markdown 语法参考</div>
                <div class="inner">
                    <p>### 单行的标题</p>
                    <p>**粗体**</p>
                    <p>`console.log('行内代码')`</p>
                    <p>```js\n code \n``` 标记代码块</p>
                    <p>[内容](链接)</p>
                    <p>![文字说明](图片链接)</p>
                    <p>
                        <a href="https://segmentfault.com/markdown" target="_blank">Markdown 文档</a>
                    </p>
                </div>
            </div>
            <div class="block-box">
                <div class="title-top">话题发布指南</div>
                <div class="inner">
                    <p>尽量把话题要点浓缩到标题里</p>
                    <p>代码含义和报错可在 <a href="https://segmentfault.com/t/node.js" target="_blank">SegmentFault</a> 提问</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import API_CONFIG from '../../api'
import SimpleMDE from 'simplemde'
import { mapState } from 'vuex'
export default {
    name: 'Release',
    data () {
        return {
            title: '',
            tab: 'dev',
            currentStatus: true,
        }
    },
    computed: {
        ...mapState(['isLogin'])
    },
    created () {
        // 如果是编辑状态
        if( this.$route.params.id !== 'create' ) {
            this.currentStatus = false;
            axios.get(`${API_CONFIG.topicDetail}${this.$route.params.id}`, {
                params: {
                    mdrender: false,
                }
            })
            .then(res => {
                if( res.data.success ) {
                    this.title = res.data.data.title;
                    this.tab = res.data.data.tab;
                    this.simplemde.value(res.data.data.content);
                }
            })
            .catch(e => {
                this.$Message.warning('不存在此话题');
                this.$router.replace('/');
            });
        }
    },
    methods: {
        // 初始化markdown编辑器
        initMarkdownEditor () {
            this.simplemde = new SimpleMDE({
                element: document.getElementById("markdown-editor"),
                spellChecker: false, 				// 启用拼写检查，会有背景色
                autoDownloadFontAwesome: false,		// 是否需要下载字体图标
            });
        },
        // 发布或更新话题
        releaseTopics () {
            try {
                if( !this.isLogin ) throw new Error('请登录后再提交');
                if( this.title.length < 10 ) throw new Error('标题至少10字以上');
                var val = this.simplemde.value();
                if( !val ) throw new Error('主体内容不能为空');
            } catch (e) {
                return this.$Message.warning(e.message);
            }
            var url = this.currentStatus ? API_CONFIG.newTopics : API_CONFIG.updateTopics;
            axios.post(url, {
                title: this.title,
                tab: this.tab,
                content: val,
                topic_id: this.currentStatus ? undefined : this.$route.params.id,
            })
            .then(res => {
                if( res.data.success ) {
                    this.currentStatus ? this.$Message.success('发布成功') : this.$Message.success('更新成功');
                    this.$router.push(`/topic/${res.data.topic_id}`);
                }
            })
            .catch(e => e);
        },
    },
    mounted () {
        this.initMarkdownEditor();
    }
}
</script>

<style lang="scss">
@import "../../assets/scss/_variable.scss";
.release {

    .release-left {
        background: #fff;
    }

    .top {
        padding: 10px;
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
    }

    .select-tab {
        padding: 10px;
    }

    .title {
        margin: 0 10px 10px 10px;
    }

    .release-btn {
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

    // 侧边栏
    .release-sidebar {
        width: $sidebarWidth;
        float: right;

        .block-box {
            background: #fff;
            margin-bottom: 15px;
            border-radius: 3px;
        }

        .title-top {
            padding: 10px;
            background: $boxTopColor;
        }

        .inner {
            padding: 15px 10px;

            p {
                line-height: 26px;
            }

            a {
                color: #778087;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
