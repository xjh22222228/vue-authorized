// Copyright 2021 the vue-authorized authors. All rights reserved. MIT license.

import { permssions, persMap } from './reactive'
import { IAuthority } from './type'

export function handleSetPermissions(pers: unknown[]) {
  if (!Array.isArray(pers)) {
    return
  }

  persMap.clear()
  for (let i = 0; i < pers.length; i++) {
    persMap.set(pers[i], true)
  }

  permssions.value = pers
}

// Check permissions
// Return to target if it fails
export function checkedPermission<Target = unknown>(
  authority: IAuthority,
  target: Target,
): Target | boolean {

  if (target === undefined) {
    target = true as any
  }

  // falsy: No permissions specified
  if (!authority) {
    return target
  }

  if (
    typeof authority === 'string' ||
    typeof authority === 'boolean' ||
    typeof authority === 'undefined' ||
    authority === null
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
