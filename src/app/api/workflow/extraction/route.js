import { NextResponse } from 'next/server'
import { start } from 'workflow/api'

import workflow from '@/lib/workflows/extraction'

export async function POST(req) {
  const body = await req.json()
  console.debug(body)

  // const { taskId, userId, sessionId, params } = body

  const run = await start(workflow)
  const status = await run.status
  return NextResponse.json({ message: status, runId: run.runId })
}