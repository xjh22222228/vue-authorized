const API = {
  // 获取用户详情信息
  login: '/api/v1/accesstoken',
  // 获取主题列表
  topics: '/api/v1/topics',
  // 获取主题详情包括回复
  topicDetail: '/api/v1/topic/',
  // 收藏主题
  collection: '/api/v1/topic_collect/collect',
  // 取消收藏主题
  cancelCollection: '/api/v1/topic_collect/de_collect',
  // 点赞/取消点赞  /reply/:reply_id/ups 为评论点赞
  like: '/api/v1/reply/',
  // 获取未读消息数
  messageCount: '/api/v1/message/count',
  // 获取已读和未读消息
  fetchMessages: '/api/v1/messages',
  // 标记全部已读
  messageMarkAll: '/api/v1/message/mark_all',
  // 标记单个消息为已读  /message/mark_one/:msg_id
  messageMarkOne: '/api/v1/message/mark_one/',
  // 新建评论 /topic/:topic_id/replies
  replies: '/api/v1/topic/',
  // 新建主题
  newTopics: '/api/v1/topics',
  // 编辑主题
  updateTopics: '/api/v1/topics/update',
  // 用户详情 /user/:loginname
  user: '/api/v1/user/',
  // 用户所收藏的主题  /topic_collect/:loginname
  userCollections: '/api/v1/topic_collect/',
};


export default API;