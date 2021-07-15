// Copyright 2021 the vue-authorized authors. All rights reserved. MIT license.

import Authorized from './Authorized.vue'
import { handleSetPermissions, checkedPermission } from './utils'

Authorized.setPermissions = handleSetPermissions
Authorized.checked = checkedPermission

export const setPermissions = handleSetPermissions
export const checked = checkedPermission

export default Authorized