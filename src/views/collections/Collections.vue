<template>
  <section class="index-section">
    <div class="topics-container collections">
      <div class="collections-loading" v-show="loading">loading...</div>
      <div class="collections-title">
        <router-link to="/">主页</router-link>
        <em class="slashes"> / </em>
        <span>{{ loginname }} 收藏的话题</span>
      </div>
      <List :topics="userCollections" />
    </div>
    <Sidebar />
  </section>
</template>

<script>
import { serviceGetUserCollections } from '@/services';
import { value, onCreated } from 'vue-function-api';

export default {
  name: 'Collections',
  props: ['loginname'],
  setup(props, ctx) {
    const userCollections = value([]);
    const loading = value(true);

    const getUserCollections = () => {
      serviceGetUserCollections(ctx.root.$route.params.loginname)
      .then(res => {
        if (res.data.success) {
          userCollections.value = res.data.data;
          loading.value = false;
        }
      })
      .catch(e => {
        ctx.root.$Message.warning('不存在此用户');
        ctx.root.$router.replace('/');
      });
    };

    onCreated(() => {
      getUserCollections();
    });

    return {
      loginname: props.loginname,
      userCollections,
      loading,
      getUserCollections
    };
  }
}
</script>

<style lang="scss">
.collections {
  position: relative;
  min-height: 250px;
  background: #fff;

  .collections-loading {
    position: absolute;
    top: 80px;
    left: calc(50% - 30px);
  }

  .collections-title {
    padding: 10px;
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
}
</style>
