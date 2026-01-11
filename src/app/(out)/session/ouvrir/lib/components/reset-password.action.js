'use server'

import { resetUserPassword } from '@/lib/data/users/service'

const resetPassword = async (data) => {
  const result = await resetUserPassword(data)
  return result
}

export default resetPassword