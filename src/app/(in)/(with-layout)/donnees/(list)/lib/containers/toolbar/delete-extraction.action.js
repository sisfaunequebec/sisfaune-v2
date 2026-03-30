'use server'

import { deleteExtraction } from '@/lib/data/tasks/extraction/service'

const deleteExtractionAction = async (id) => {
  const result = await deleteExtraction(id)
  return result
}

export default deleteExtractionAction


