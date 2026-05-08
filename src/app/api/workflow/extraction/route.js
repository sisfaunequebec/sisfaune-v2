import { NextResponse } from 'next/server'
import { start } from 'workflow/api'

import workflow from '@/lib/workflows/extraction'

export async function POST(req) {
  const body = await req.json()

  const run = await start(workflow, [JSON.stringify(body)])
  const stream = run.getReadable()
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson', 
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}