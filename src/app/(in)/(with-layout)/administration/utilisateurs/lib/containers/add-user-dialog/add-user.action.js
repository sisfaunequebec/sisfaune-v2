'use server'

import { createUser } from '@/lib/data/users/service'

const addUserAction = async (data) => {
 
  const result = await createUser(data)
  console.debug('addUserAction', data, result)
  return result
}

export default addUserAction
