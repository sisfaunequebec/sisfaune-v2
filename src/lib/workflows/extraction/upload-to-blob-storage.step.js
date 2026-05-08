import { readFileSync } from 'fs'

import { getWritable } from 'workflow'

import { put } from '@vercel/blob'

const uploadToBlobStorage = async (filePath) => {
  'use step'

  const fileContent = readFileSync(filePath)

  const blobName = `extracted-data-${Date.now()}.xlsx`

  const writer = getWritable().getWriter()
  const encoder = new TextEncoder()

  try {
    const result = await put(blobName, fileContent, { access: 'public' })
    const { url } = result

    console.debug('File uploaded to blob storage:', url)

    const payload = JSON.stringify({ 
      progress: 100,
      message: 'Téléversement du fichier... ', // `File uploaded to blob storage: ${url}`,
      result: { filename: blobName, url }
    }) + '\n'

    await writer.write(encoder.encode(payload))

    return { filename: blobName, url }
  } catch (error) {
    console.error('Error uploading file to blob storage:', error)
    throw error
  }
}

export default uploadToBlobStorage