<template>
  <Authorized authority="user:add" @no-match="handleNoMatch">
    <button>add</button>
  </Authorized>

  <Authorized authority="user:add1" @no-match="handleNoMatch">
    <template v-slot:no-match>
      no-match
    </template>
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
    Authorized.setPermissions(pers)
    AuthorizedProd.setPermissions(pers)

    function handleNoMatch(authority) {
      console.log('no match', authority)
    }

    return {
      handleNoMatch
    }
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
