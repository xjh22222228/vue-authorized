// Copyright 2021 the vue-authorized authors. All rights reserved. MIT license.

import { permssions, persMap } from './reactive'
import { IAuthority } from './type'

// 没有权限则传入 null
export function handleSetPermissions(pers: unknown[] | null) {
  // No permissions
  if (
    pers === null ||
    (Array.isArray(pers) && pers.length === 0)
  ) {
    permssions.hasPermission = false
    persMap.clear()
    return
  }

  if (!Array.isArray(pers)) {
    return
  }

  persMap.clear()
  for (let i = 0; i < pers.length; i++) {
    persMap.set(pers[i], true)
  }

  if (pers.length > 0) {
    permssions.hasPermission = true
  }

  permssions.value = pers
}

// Check permissions
// Return target
export function checkedPermission(
  authority: IAuthority,
  target = true,
): any {

  if (target === undefined) {
    target = true
  }

  // falsy: No permissions specified
  if (!authority) {
    return target
  }

  if (
    typeof authority === 'string' ||
    typeof authority === 'boolean' ||
    typeof authority === 'number' ||
    // null|undefined
    authority == null
  ) {
    if (persMap.has(authority)) {
      return target
    }

    return false
  }

  if (Array.isArray(authority)) {
    for (let i = 0; i < authority.length; i++) {
      if (persMap.has(authority[i])) {
        return target
      }
    }

    return false
  }


  throw new Error('[vue-authorized]: unsupported parameters')
}
