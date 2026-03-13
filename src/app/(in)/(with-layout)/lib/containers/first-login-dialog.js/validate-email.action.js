'use server'

import { validateEmail } from '@/lib/auth/service'

const validateEmailAction = async (userId, data) => {
  const result = await validateEmail(userId, data)
  return result
}

export default validateEmailAction
