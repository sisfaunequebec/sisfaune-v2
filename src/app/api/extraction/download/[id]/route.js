import { NextResponse } from 'next/server'

import { DateTime } from 'luxon'

import orm from '@/lib/data/database'

import getBlobStore from '@/lib/data/tasks/extraction/get-blob-store'

const DAYS_TO_BLOBS_DELETION = 5

const GET = async (req, { params }) => {
  const { id } = await params

  const extraction = await orm.Task.update({
    where: {
      id
    },
    data: {
      // wasSeen: true
    }
  })

  const { result } = extraction
  const { blobKey } = result

  const store = getBlobStore()

  const blob = await store.get(blobKey, { type: 'blob' })

  const arrayBuffer = await blob.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const todayAsString = DateTime.now().toFormat('yyyy-LL-dd')

  const fileName = `specimens-${todayAsString}-${blobKey}.xlsx`

  const dateToDeletion = DateTime.now().minus({ days: DAYS_TO_BLOBS_DELETION }).toJSDate()

  const blobsToBeDeleted = await orm.Task.findMany({
    where: {
      updatedAt: {
        lt: dateToDeletion
      }
    }
  })

  for (const blobKey of blobsToBeDeleted.map(t => t.result.blobKey)) {
    await store.delete(blobKey)
  }

  await orm.Task.deleteMany({
    where: {
      // wasSeen: true,
      updatedAt: {
        lt: dateToDeletion
      }
    }
  })

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Change based on file type
      'Content-Disposition': `attachment; filename="${fileName}"`
    }
  })
}

export {
  GET
}
