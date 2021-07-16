// Copyright 2021 the vue-authorized authors. All rights reserved. MIT license.

import { reactive } from 'vue'
import { IReactive } from './type'

export const permssions = reactive<IReactive>({
  value: [],

  // 优先验证 hasPermission，如果为 false 则无权限
  // 因为 value 可能会异步加载，初始化为空无法准确判断
  hasPermission: true
})

export const persMap = new Map<unknown, unknown>()
