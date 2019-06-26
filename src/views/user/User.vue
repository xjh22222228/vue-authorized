<template>
  <section class="index-section">
    <div class="topics-container user">
      <div class="box">
        <div class="box-title">
          <router-link to="/">主页</router-link>
          <em class="slashes"> / </em>
          <span>个人主页</span>
        </div>
        <div class="user-info">
          <div class="user">
            <img :src="user.avatar_url" alt="avatar" />
            <span>{{ user.loginname }}</span>
          </div>
          <div>{{ user.score }} 积分</div>
          <div class="view-topics-collections">
            <router-link :to="`/user/${user.loginname}/collections`">查看话题收藏</router-link>
          </div>
          <div class="create-at">注册时间 {{ user.create_at | fromNow }}</div>
        </div>
      </div>
      <div class="box">
        <div class="box-title">最近创建的话题</div>
        <List :topics="user.recent_topics" />
      </div>
      <div class="box">
        <div class="box-title">最近参与的话题</div>
        <List :topics="user.recent_replies" />
      </div>
    </div>
    <Sidebar />
  </section>
</template>

<script>
import { serviceGetUser } from '@/services';
import { defaultAvatar } from '@/constants';
import { value, onCreated, watch } from 'vue-function-api';

export default {
  name: 'User',
  setup(props, ctx) {
    const user = value({
      user: {
        loginname: '--',
        avatar_url: defaultAvatar,
        githubUsername: 'xjh22222228',
        create_at: Date.now(),
        score: 0,
        recent_topics: [],              // 最近创建的话题
        recent_replies: [],             // 最近参与的话题
      }
    });

    const fetchUserDetail = () => {
      serviceGetUser(ctx.root.$route.params.loginname)
      .then(res => {
        if (res.data.success) {
          user.value = res.data.data;
        }
      })
      .catch(e => {
        ctx.root.$Message.warning('不存在此用户');
        ctx.root.$router.replace('/');
      });
    };

    onCreated(() => {
      fetchUserDetail();
    });

    watch(() => ctx.root.$route, (to, from) => {
      if (to.name !== 'User') return;
      fetchUserDetail();
    }, { lazy: true });

    return {
      user,
      fetchUserDetail
    }
  }
}
</script>

<style lang="scss">
.user {

  .box {
    margin-bottom: 15px;
    background: #fff;
    border-radius: 3px;

    .box-title {
      padding: 10px;
      background: $box-top-color;

      a {
        color: #80bd01;

        &:hover {
          text-decoration: underline;
        }
      }

      .slashes {
        color: #ccc;
      }

      span {
        color: #999;
      }
    }

    .user-info {
      padding: 15px 10px;

      .user {
        margin-bottom: 10px;

          img {
            width: 50px;
            height: 50px;
            background: #f6f6f6;
            vertical-align: middle;
          }

          span {
            margin-left: 10px;
            vertical-align: middle;
          }
      }

      .view-topics-collections {
        margin-top: 5px;

        a {
          color: #333;

          &:hover {
            text-decoration: underline;
          }
        }
      }

      .create-at {
        margin-top: 10px;
        color: #666;
      }
    }
  }

  .unique-topics-list .title {
    width: calc(100% - 100px) !important;
  }
}
</style>
