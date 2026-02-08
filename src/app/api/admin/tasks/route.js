import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

import { cookies } from 'next/headers'

import getAuthUser from '@/lib/auth/get-user'

import orm from '@/lib/data/database'

const GET = async (request) => {
  const user = await getAuthUser()

  if (!user) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  const cookieStore = await cookies()
  const sessionIdcookie = cookieStore.get('etl_session_id')
  const { value: sessionId } = sessionIdcookie

  const tasks = await orm.tasks.findMany({
    where: {
      sessionId,
      userId: user.id
    },
    orderBy:  [
      { updatedAt: 'desc' },
      { createdAt: 'desc' }
    ],
  })

  return NextResponse.json(tasks)
}


export {
  GET
}

