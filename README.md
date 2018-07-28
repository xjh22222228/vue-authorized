


> vue构建的第三方cnode社区网站 - vue-cli 3.x


react版cnode[点击这里](https://github.com/xjh22222228/react-cnode)



[源码github](https://github.com/xjh22222228/vue-cnode)


[在线预览](https://xjh22222228.github.io/vue-cnode/index.html)


![](https://raw.githubusercontent.com/xjh22222228/vue-cnode/master/public/img/animate.gif)








## 技术栈
```
"vue": "^2.5.16",
"vue-router": "^3.0.1",
"vuex": "^3.0.1"
"iview": "^3.0.0",
"axios": "^0.18.1",
"moment": "^2.20.1",
"simplemde": "^1.11.2",
"highlight": "^9.12.0",
"scss",
"ES6",
"flex",
```

## 目录架构
```
.
├── LICENSE
├── README.md
├── babel.config.js
├── package.json
├── public                               # 静态资源
│   ├── favicon.ico
│   ├── img
│   │   └── animate.gif
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src                                  # 开发目录
│   ├── App.vue                          # 跟组件入口
│   ├── api                              # 接口配置
│   │   └── index.js
│   ├── assets                           # 静态资源，webpack会处理此目录资源
│   │   ├── images
│   │   │   ├── app-qrcode.png
│   │   │   ├── github.svg
│   │   │   └── not-match.gif
│   │   └── scss
│   │       ├── _variable.scss
│   │       ├── media.scss
│   │       └── style.scss
│   ├── components                       # 组件
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
│   ├── main.js                          # 程序主入口
│   ├── registerServiceWorker.js         # 主要是用于缓存作用
│   ├── router                           # 路由配置
│   │   └── index.js
│   ├── store                            # 状态数据管理
│   │   └── index.js
│   └── views                            # 页面目录
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
└── yarn.lock
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


## 写在最后
这个项目对新手或进阶都是有帮助的，我认为这是一个非常好的学习机会。如果你认为这是一个非常不错的进阶项目，那么你可以分享给他人。

markdown样式可以使用[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)，github-markdown风格，

markdown编辑器推荐 [simplemde](https://github.com/sparksuite/simplemde-markdown-editor) ，我觉得非常好用，并且他的样式挺好看的。

本项目预览结果托管在github pages上，所以首次访问会稍微慢。


...

👍👍👍


----


## License
[MIT](https://opensource.org/licenses/MIT)

只要注明原作者许可声明，您可以自由地复制、分享、和修改。

Copyright (c) 2017-present, [xiejiahe](https://github.com/xjh22222228)

