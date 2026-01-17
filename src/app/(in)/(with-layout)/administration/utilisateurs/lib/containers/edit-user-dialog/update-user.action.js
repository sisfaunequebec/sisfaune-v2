'use server'

import { updateUser } from '@/lib/data/users/service'

const updateUserAction = async (userId, data) => {
  const result = await updateUser(userId, data)
  console.debug('updateUserAction', result)
  return result
}

export default updateUserAction
