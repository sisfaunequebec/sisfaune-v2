import { readFileSync } from 'fs'

import { getWritable } from 'workflow'

import { put } from '@vercel/blob'

const uploadToBlobStorage = async (filePath) => {
  'use step'

  const writer = getWritable().getWriter()
  const encoder = new TextEncoder()

  await writer.write(encoder.encode(JSON.stringify({ 
    progress: 90,
    message: 'Téléversement du fichier... ', // `File uploaded to blob storage: ${url}`,
  }) + '\n'))

  const fileContent = readFileSync(filePath)

  const blobName = `extracted-data-${Date.now()}.xlsx`

  try {
    const result = await put(blobName, fileContent, { access: 'public' })
    const { url } = result

    console.debug('File uploaded to blob storage:', url)

    await writer.write(encoder.encode(JSON.stringify({ 
      progress: 100,
      message: 'Téléversement du fichier... ', // `File uploaded to blob storage: ${url}`,
      result: { filename: blobName, url }
    }) + '\n'))

    return { filename: blobName, url }
  } catch (error) {
    console.error('Error uploading file to blob storage:', error)
    throw error
  }
}

export default uploadToBlobStorage