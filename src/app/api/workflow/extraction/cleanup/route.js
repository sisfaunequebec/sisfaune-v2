import { NextResponse } from 'next/server'

import { DateTime } from 'luxon'

import { list, del } from '@vercel/blob'

const filterBlobsOlderOneDay = (blob) => {
  const { uploadedAt } = blob

  const then = DateTime.fromJSDate(uploadedAt)
  const diff = then.diffNow('days').days
  
  return diff < -1
}

export async function GET() {
  const result = await list()
  const { blobs } = result

  const blobsToDelete = blobs.filter(filterBlobsOlderThan7Days)
  const urlsToDelete = blobsToDelete.map(b => b.url)

  if (urlsToDelete.length) {
    await del(urlsToDelete)
  }

  return new NextResponse(null, { status: 204 })
}