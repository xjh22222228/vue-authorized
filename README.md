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

`authority` 参数接收 `string`/`Array`/`number`/`boolean` , 如果是数组则有任意一个匹配则验证通过
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


接收插槽 `no-match` 没有权限的情况下显示内容：
```vue
<template>
  <Authorized
    authority="user:add"
  >
    <div>有权限则显示</div>

    <template v-slot:no-match>
      无权限
    </template>
  </Authorized>
</template>
```


无权限传入 `null`, 请不要传入空数组，因为权限集可能是异步加载，可能会导致触发2次事件等其他BUG
```vue
<script lang="ts">
import Authorized from 'vue-authorized'

// Good
Authorized.setPermissions(null)

// Bad
Authorized.setPermissions([])
```





## 属性
| 参数           | 描述              |类型           | 默认值              |是否必填   |
| ------------- |------------------- |-------------- |------ |
| authority | 校验是否有权限 | `string`/`boolean`/`number`/`unknow[]` | - | 否 |



## 事件
| 参数           | 描述              |
| ------------- |------------------- |
| no-match | 权限校验不通过触发 | 



## LICENSE
[MIT](./LICENSE)
