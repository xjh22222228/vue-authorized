<template>
  <Authorized authority="user:add">
    <button>add</button>
  </Authorized>
</template>

<script type="setup">
import Authorized, { setPermissions } from './Authorized'

export default {
  name: 'App',

  components: {
    Authorized,
  },

  setup() {
    setTimeout(() => {
      const pers = [
        'user:add',
        'user:del',
        'user:modify'
      ]
      setPermissions(pers)
    }, 1000)
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
