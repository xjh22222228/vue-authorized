<p align="center">
  <p align="center">用于Vue3, 基于 ABAC 权限验证</p>
  <p align="center">
    <img src="https://img.shields.io/github/package-json/v/xjh22222228/vue-authorized" />
    <img src="https://img.shields.io/static/v1.svg?label=&message=Vue3&style=flat-square&color=3fb984" />
    <img src="https://img.shields.io/github/license/xjh22222228/vue-authorized" />
  </p>
</p>




## 安装
```bash
npm i vue-authorized -S
# or
yarn add vue-authorized
```


## 使用

一个典型的例子：
```vue
<template>
  <Authorized
    authority="user:add"
  >
    <div>有权限则显示</div>
  </Authorized>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Authorized from 'vue-authorized'

export default defineComponent({
  components: {
    Authorized
  },

  setup() {
    
    // 通常情况从API取得权限集
    fetch('/permissions').then(res => {
      // ['user:add', 'user:del', ...]
      const permissions = res.json()
      // 设置权限, 接收一个数组
      Authorized.setPermissions(permissions)
    })
  }
})
</script>
```


通过 API `Authorized.checked` 验证权限
```vue
<template>
  <div v-if="hasPerm">有权限则显示</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Authorized from 'vue-authorized'

export default defineComponent({
  components: {
    Authorized
  },

  setup() {
    // 接收第二个参数 target，默认为true, 权限通过则返回 target
    // Authorized.checked('user:add', 'hello') // => 'hello'

    const hasPerm = Authorized.checked('user:add')

    return {
      hasPerm,
    }
  }
})
</script>
```



## LICENSE
[MIT](./LICENSE)
