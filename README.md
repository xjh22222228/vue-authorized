

## vue-cnode
本项目非常适合新手入门或对vue3特性感兴趣的同学

- 基于 function-based API 进行改造，优先体验vue3特性
- 使用Vue observable API代替vuex作为状态管理
- 对项目进行了优化，新手入门更容易



## 预览
[在线预览](https://xjh22222228.github.io/vue-cnode/index.html)


![](https://raw.githubusercontent.com/xjh22222228/vue-cnode/master/public/img/screen.gif)








## 开发技术
```
"vue": "^2.6.10",
"vue-router": "^3.0.3",
"vuex": "^3.0.1"
"iview": "^3.4.2",
"axios": "^0.19.0",
"moment": "^2.24.0",
"simplemde": "^1.11.2",
"highlight.js": "^9.15.8",
"vue-function-api": "^2.0.5"
```

## 目录结构
```bash
.
├── src
│   ├── App.vue                          # 组件入口
│   ├── api                              # 接口
│   │   └── index.js
│   ├── assets                           # 资源目录
│   │   ├── img
│   │   │   ├── app-qrcode.png
│   │   │   ├── github.svg
│   │   │   └── not-match.gif
│   │   └── styles
│   │       ├── global.scss
│   │       ├── hljs.css
│   │       ├── markdown.css
│   │       ├── media.scss
│   │       ├── nprogress.css
│   │       ├── simplemde.css
│   │       ├── style.scss
│   │       └── variables.scss
│   ├── components
│   │   ├── footer
│   │   │   └── Footer.vue               # 页脚
│   │   ├── header
│   │   │   └── Header.vue               # 头部
│   │   ├── msg
│   │   │   └── Msg.vue                  # 未读消息和已读消息列表组件
│   │   ├── sidebar
│   │   │   └── Sidebar.vue              # 侧边栏
│   │   └── topics-list
│   │       └── TopicsList.vue           # 话题列表
│   ├── constants
│   │   └── index.js                     # 常量
│   ├── main.js                          # 程序入口
│   ├── router
│   │   └── index.js                     # 路由配置
│   ├── services
│   │   └── index.js                     # 服务接口
│   ├── store
│   │   └── index.js                     # 状态管理
│   ├── utils
│   │   ├── http.js                      # http请求
│   │   └── nprogress.js                 # 进度条
│   └── views
│       ├── 404
│       │   └── 404.vue                  # 404
│       ├── collections
│       │   └── Collections.vue          # 收藏页
│       ├── index
│       │   └── Index.vue                # 主页
│       ├── login
│       │   └── Login.vue                # 登录页
│       ├── messages
│       │   └── Messages.vue             # 未读消息页
│       ├── release
│       │   └── Release.vue              # 发布话题/编辑话题页
│       ├── topic
│       │   └── Topic.vue                # 话题详情页
│       └── user
│           └── User.vue                 # 用户详情页/个人主页
├── vue.config.js                        # vue-cli 配置文件
```




## API清单 x 15
- [√] 主题首页
- [√] 主题详情
- [√] 新建主题
- [√] 编辑主题
- [√] 收藏主题
- [√] 取消收藏主题
- [√] 用户所收藏的主题
- [√] 新建评论
- [√] 为评论点赞
- [√] 用户详情/个人主页
- [√] 登录
- [√] 获取未读消息数
- [√] 获取已读和未读消息
- [√] 标记全部已读
- [√] 标记单个消息为已读



----

## 启动程序
``` bash
# install dependencies
yarn or npm install

# serve with hot reload at localhost:3888
yarn serve or npm serve

# build for production with minification
yarn build or npm run build

```

----




👍👍👍



## License
[MIT](https://opensource.org/licenses/MIT)

只要注明原作者许可声明，您可以自由地复制、分享、和修改。

Copyright (c) 2017-present, [xiejiahe](https://github.com/xjh22222228)

