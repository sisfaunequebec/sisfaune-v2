'use server'

import { resetUserPassword } from '@/lib/data/users/service'

const resetPassword = async (data) => {
  const newPassword = resetUserPassword(data)
  return newPassword
}

export default resetPassword