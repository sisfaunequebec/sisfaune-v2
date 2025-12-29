'use server'

import { revalidatePath } from 'next/cache'

import { addAnalysis } from '@/lib/data/analyses/service'

const addAnalysisAction = async (eventId, data) => {
  const result = await addAnalysis(eventId, data)
  revalidatePath(`donnees/evenements/${eventId}`)
  return result
}

export default addAnalysisAction
