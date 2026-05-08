import { readFileSync } from 'fs'

import { getWritable } from 'workflow'

import { put } from '@vercel/blob'

const uploadToBlobStorage = async (filePath) => {
  'use step'

  const writer = getWritable().getWriter()
  await writer.write(JSON.stringify({ progress: 90, message: `Uploading file ${filePath} to blob storage...` }))

  console.debug('Uploading file to blob storage...', filePath)

  const fileContent = readFileSync(filePath)

  const blobName = `extracted-data-${Date.now()}.xlsx`

  try {
    const result = await put(blobName, fileContent, { access: 'public' })
    const { url } = result
    await writer.write(JSON.stringify({ progress: 100, message: `File uploaded to blob storage: ${url}`, result: url }))
    console.debug('File uploaded to blob storage:', url)
    return url
  } catch (error) {
    console.error('Error uploading file to blob storage:', error)
    throw error
  }
}

export default uploadToBlobStorage