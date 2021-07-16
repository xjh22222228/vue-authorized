// Copyright 2021 the vue-authorized authors. All rights reserved. MIT license.

export type IReactive = {
  value: unknown[]
  hasPermission: boolean
}

export type IAuthority =
  | string
  | number
  | unknown[]
  | null
  | undefined
