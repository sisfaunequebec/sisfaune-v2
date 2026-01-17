'use server'

import { getUser } from '@/lib/data/users/service'

const getUserAction = async (userId) => {
  const result = await getUser(userId)
  return result
}

export default getUserAction
