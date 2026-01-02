'use server'

import { revalidatePath } from 'next/cache'

import { updateAnalysisGroupResults } from '@/lib/data/analyses/service'

const updateAnalysisGroupAction = async (eventId, data) => {
  await updateAnalysisGroupResults(data)

  revalidatePath(`donnees/evenements/${eventId}`)
}

export default updateAnalysisGroupAction
