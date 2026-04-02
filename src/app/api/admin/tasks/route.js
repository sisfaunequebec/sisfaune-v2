import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

import { cookies } from 'next/headers'

import getAuthUser from '@/lib/auth/get-user'

// import orm from '@/lib/data/database'
import { getExtractions } from '@/lib/data/tasks/extraction/service'

const GET = async (request) => {
  const user = await getAuthUser()
  const { id: userId } = user

  const cookieStore = await cookies()
  const sessionIdcookie = cookieStore.get('etl_session_id')
  const { value: sessionId } = sessionIdcookie

  // console.debug('GET /api/admin/tasks - sessionId:', sessionId, 'userId:', userId)
  const tasks = await getExtractions(sessionId, userId) 
  // console.debug('GET /api/admin/tasks - tasks:', tasks)
  
  return NextResponse.json(tasks)
}


export {
  GET
}

