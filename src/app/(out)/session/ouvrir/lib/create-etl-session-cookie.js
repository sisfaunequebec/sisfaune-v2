
import { cookies } from 'next/headers'

import { customAlphabet } from 'nanoid'
import { alphanumeric   } from 'nanoid-dictionary'

const createEtlSessionCookie = async () => {
  const cookieStore = await cookies()

  const nanoid = customAlphabet(alphanumeric, 12)

  cookieStore.set('etl_session_id', nanoid(), {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
}

export default createEtlSessionCookie