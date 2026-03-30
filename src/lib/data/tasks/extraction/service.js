'use server'
import 'server-only'

import { cookies } from 'next/headers'

import { customAlphabet } from 'nanoid'
import { alphanumeric   } from 'nanoid-dictionary'

import getUser from '@/lib/auth/get-user'

const baseUrl = process.env.URL
const url = `${baseUrl}/.netlify/functions/extract-background`

import orm from '../../database'

const nanoid = customAlphabet(alphanumeric, 12)

const startExtraction = async (params = {}) => {
  const user = await getUser()
  const { id: userId } = user

  const cookieStore = await cookies()
  const sessionIdcookie = cookieStore.get('etl_session_id')
  const { value: sessionId } = sessionIdcookie

  const { texte, statut, programme, region, groupe, date, debut, fin, analyse } = params

  const taskId = nanoid()

  const body = {
    taskId,
    userId,
    sessionId,
    params: { texte, statut, programme, region, groupe, date, debut, fin, analyse }
  }

  console.debug('Starting extraction with params:', url, body)

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  return { data: { id: taskId }, errors: null }
}

const getExtractions = async (sessionId, userId) => {
  const tasks = await orm.Task.findMany({
    where: {
      sessionId,
      userId
    },
    orderBy:  [
      { updatedAt: 'asc' },
      { createdAt: 'asc' }
    ],
  })

  return tasks
}

const deleteExtraction = async (id) => {
  await orm.Task.delete({
    where: {
      id
    }
  })

  return { data: null, errors: null }
}

export {
  startExtraction,
  getExtractions,
  deleteExtraction
}