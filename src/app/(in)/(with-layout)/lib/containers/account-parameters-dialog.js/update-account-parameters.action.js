'use server'

import { updateAccount } from '@/lib/auth/service'

const updateUserParametersAction = async (userId, data) => {
  const result = await updateAccount(userId, data)
  return result
}

export default updateUserParametersAction
