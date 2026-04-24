import { NextResponse } from 'next/server'
import { start } from 'workflow/api'

import workflow from '@/lib/workflows/mapaq'

export async function GET() {
 const run = await start(workflow)
 const status = await run.status
 return NextResponse.json({ message: status, runId: run.runId })
}