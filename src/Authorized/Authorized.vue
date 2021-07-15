// Copyright 2021 the vue-authorized authors. All rights reserved. MIT license.

<template>
  <template v-if="hasPerm">
    <slot></slot>
  </template>
  <template v-else>
    <slot name="no-match"></slot>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue'
import { permssions } from './reactive'
import { IAuthority } from './type'
import { checkedPermission } from './utils'

export default defineComponent({
  name: 'Authorized',

  props: {
    authority: [String, Array, Boolean, Number] as PropType<IAuthority>
  },

  setup(props) {
    const hasPerm = ref(checkedPermission(props.authority, true))

    watch([permssions, () => props.authority], () => {
      hasPerm.value = checkedPermission(props.authority, true)
    })

    return {
      hasPerm,
    }
  }
})
</script>
