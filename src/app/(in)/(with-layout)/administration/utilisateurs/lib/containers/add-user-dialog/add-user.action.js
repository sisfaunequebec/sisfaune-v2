'use server'

import { createUser } from '@/lib/data/users/service'

const addUserAction = async (data) => {
  const result = await createUser(data)
  return result
}

export default addUserAction
