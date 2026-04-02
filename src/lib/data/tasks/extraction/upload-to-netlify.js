import path from 'path'
import { readFile } from 'node:fs/promises'

import getBlobStore from '@/lib/data/tasks/extraction/get-blob-store'

const uploadToNetlify = async (taskId, filePath) => {
  try {
    const fileName = path.basename(filePath)
    const fileBuffer = await readFile(filePath)

    const store = getBlobStore()

    await store.set(fileName, fileBuffer)
    return fileName
  } catch (err) {
    throw err
  }
}

export default uploadToNetlify