import { NextResponse } from 'next/server'
import { start } from 'workflow/api'

import workflow from '@/lib/workflows/mapaq'

export async function POST() {
 await start(workflow)
 return NextResponse.json({ message: 'Workflow started' })
}