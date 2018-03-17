

react版开发之后开发的vue版， 其实vue版跟react版结构基本上是没多大变化的，只是语法上不同。

这是目前react版和vue版功能最齐全的第三方cnode版本了！

如果你是刚接触react或vue这恰好是一个好机会

react版cnode[点这里](https://github.com/xjh22222228/react-cnode)


[源码github](https://github.com/xjh22222228/vue-cnode)

[在线预览](https://xjh22222228.github.io/vue-cnode/index.html)


![](https://raw.githubusercontent.com/xjh22222228/React-CNode/master/public/images/11.png)


![](https://raw.githubusercontent.com/xjh22222228/React-CNode/master/public/images/22.png)


![](https://raw.githubusercontent.com/xjh22222228/React-CNode/master/public/images/33.png)


![](https://raw.githubusercontent.com/xjh22222228/React-CNode/master/public/images/44.png)


### 技术栈
```
"vue": "^2.5.2",
"vue-router": "^3.0.1",
"vuex": "^3.0.1",
"iview": "^2.10.1",
"axios": "^0.17.1",
"moment": "^2.20.1",
"webpack": "^3.6.0",
"simplemde": "^1.11.2",
"highlight": "^9.12.0",
"scss": "",
"ES6": "",
"flex": "",
```

### 开发目录
```
.
├── README.md
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package-lock.json
├── package.json
├── src
│   ├── App.vue                     # 视图入口
│   ├── api                         # API配置文件
│   │   └── index.js
│   ├── assets                      # 处理静态资源文件目录
│   │   ├── images
│   │   │   ├── app-qrcode.png
│   │   │   ├── github.svg
│   │   │   └── not-match.gif
│   │   └── scss
│   │       ├── _variable.scss
│   │       ├── media.scss
│   │       └── style.scss
│   ├── components
│   │   ├── footer
│   │   │   └── Footer.vue          # 底部组件
│   │   ├── header
│   │   │   └── Header.vue          # 头部组件
│   │   ├── msg
│   │   │   └── Msg.vue             # 未读消息和已读消息列表组件
│   │   ├── sidebar
│   │   │   └── Sidebar.vue         # 侧边栏组件
│   │   └── topics-list
│   │       └── TopicsList.vue      # 话题列表组件
│   ├── main.js                     # 程序入口文件
│   ├── router
│   │   └── index.js                # 路由配置
│   ├── store
│   │   └── index.js                # 状态管理
│   └── views
│       ├── 404
│       │   └── 404.vue             # 404页
│       ├── collections
│       │   └── Collections.vue     # 收藏页
│       ├── index
│       │   └── Index.vue           # 主页
│       ├── login
│       │   └── Login.vue           # 登录页
│       ├── messages
│       │   └── Messages.vue        # 未读消息页
│       ├── release
│       │   └── Release.vue         # 发布/编辑页
│       ├── topic
│       │   └── Topic.vue           # 查看话题详情页
│       └── user
│           └── User.vue            # 用户详情页/个人主页
└── static                          # 静态资源目录
    └── images
        ├── 11.png
        ├── 22.png
        ├── 33.png
        └── 44.png
```


### API清单 x 15
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

启动程序
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3888
npm start

# build for production with minification
npm run build

```

----


### 结语
+ CNode主题详情是使用markdown写的，样式可以使用github-markdown-css。
+ CNode提供的API获取主题没有返回总条数导致不能算出总页数, 所以我写死了250页。
+ 大部分功能都需要登录的，所以游客只能进行浏览，如果感兴趣的可以尝试登录, 不会保存你的accesstoken, 欢迎监督。
+ 发布话题和评论使用的markdown编辑器 [simplemde](https://github.com/sparksuite/simplemde-markdown-editor)
+ 因为托管在github上，所以首次打开的速度会稍微慢一点，之后基本上是秒开。
+ 这应该是一个很好的学习机会，Vue转react，react转Vue都很好上手。

学到东西不要忘了给个star哦，谢谢!

...

👍👍👍


----


### License

[MIT](http://opensource.org/licenses/MIT)

