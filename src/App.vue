<template>
  <Authorized authority="user:add">
    <button>add</button>
  </Authorized>



  <hr />
  <div>production:</div>

  <!-- npm production -->
  <AuthorizedProd authority="user:add">
    <button>add</button>
  </AuthorizedProd>

  <AuthorizedProd authority="123">
    <button>No Show</button>
  </AuthorizedProd>
</template>

<script type="setup">
import Authorized from './Authorized'

import AuthorizedProd from 'vue-authorized'

export default {
  name: 'App',

  components: {
    Authorized,
    AuthorizedProd
  },

  setup() {
    const pers = [
      'user:add',
      'user:del',
      'user:modify'
    ]
    setTimeout(() => {
      Authorized.setPermissions(pers)
    }, 1000)

    AuthorizedProd.setPermissions(pers)
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
