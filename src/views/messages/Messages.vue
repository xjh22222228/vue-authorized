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
import Msg from '@/components/msg/Msg';
import { state } from '@/store';
import { serviceGetMessages, serviceMessageMarkAll } from '@/services';
import { value, onCreated, onMounted } from 'vue-function-api';

export default {
  name: 'Messages',
  components: {
    Msg,
  },
  setup() {
    const loading = value(false);
    const message = value({
      has_read_messages: [],    // 已读
      hasnot_read_messages: []  // 未读
    });

    const getMessages = () => {
      serviceGetMessages()
      .then(res => {
        if (res.data.success) {
          loading.value = false;
          message.value = res.data.data;
        }
      })
      .catch(e => {
        ctx.root.$router.replace('/');
      });
    };

    onCreated(() => {
      getMessages();
    });

    onMounted(() => {
      // 标记全部已读
      if (state.messageCount > 0) {
        serviceMessageMarkAll();
      }
    });

    return {
      loading,
      message,
      getMessages
    }
  }
}
</script>

<style lang="scss">
.messages {
  
  .top {
    padding: 10px 10px;
    background: $box-top-color;

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
