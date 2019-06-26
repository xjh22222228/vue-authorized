import http from '@/utils/http';
import api from '@/api';


export function serviceGetUserCollections(loginname) {
  return http.get(`${api.userCollections}${loginname}`);
}

export function serviceGetTopics(params) {
  return http.get(api.topics, { params });
}

export function serviceLogin(data) {
  return http.post(api.login, data);
}

export function serviceGetMessages() {
  return http.get(api.fetchMessages);
}

export function serviceMessageMarkAll() {
  return http.post(api.messageMarkAll);
}

export function serviceGetTopicDetail(topicId, params) {
  return http.get(`${api.topicDetail}${topicId}`, { params });
}

export function serviceNewTopic(data) {
  return http.post(api.newTopics, data);
}

export function serivceUpdateTopic(data) {
  return http.post(api.updateTopics, data);
}

export function serviceCancelCollection(data) {
  return http.post(api.cancelCollection, data);
}

export function serviceAddCollection(data) {
  return http.post(api.collection, data);
}

export function serviceReplies(topicId, data) {
  return http.post(`${api.replies}${topicId}/replies`, data);
}

export function serviceLike(replyId, data) {
  return http.post(`${api.like}${replyId}/ups`, data);
}

export function serviceGetUser(loginname) {
  return http.get(`${api.user}${loginname}`);
}

export function serviceGetMessageCount() {
  return http.get(api.messageCount);
}