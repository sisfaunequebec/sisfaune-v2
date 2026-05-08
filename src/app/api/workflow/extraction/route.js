import { NextResponse } from 'next/server'
import { start } from 'workflow/api'

import workflow from '@/lib/workflows/extraction'

export async function POST(req) {
  // const body = await req.json()

  const run = await start(workflow, ['toto'])

  const stream = run.getReadable()
  
  return new Response(stream, {
    headers: {
      "Content-Type": "application/octet-stream"
    }
  })
  // return NextResponse.json({ runId: run.runId })
}