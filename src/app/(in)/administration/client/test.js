'use server'
import { createSafeActionClient } from 'next-safe-action'

import getPermissions from '@/lib/auth/get-permissions'

const actionClient = createSafeActionClient()

const testAction = actionClient
  // .schema(schema)
  .action(async () => {
    const permissions = await getPermissions()
    return permissions

    // return { failure: "Incorrect credentials" };
  })

export default testAction

export {
  getPermissions
}
