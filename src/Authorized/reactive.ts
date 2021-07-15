// Copyright 2021 the vue-authorized authors. All rights reserved. MIT license.

import { reactive } from 'vue'
import { IReactive } from './type'

export const permssions = reactive<IReactive>({
  value: []
})

export const persMap = new Map<unknown, unknown>()
