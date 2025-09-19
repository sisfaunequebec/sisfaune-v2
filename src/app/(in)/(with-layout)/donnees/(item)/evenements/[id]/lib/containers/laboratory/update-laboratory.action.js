'use server'

import { revalidatePath } from 'next/cache'

import { updateLaboratory } from '@/lib/data/laboratory/service'

const updateLaboratoryAction = async (eventId, data) => {
  
  const { labResponsible, labReceivedBy: labReceivedByRaw, ...rest } = data
  const labResponsibleId = labResponsible?.id ?? null
  const labReceivedById = labReceivedByRaw?.id ?? null
  // console.debug('updateLaboratoryAction', data, labResponsibleId)
  await updateLaboratory(eventId, 
    {
      ...rest,
      labResponsibleId,
      labReceivedBy: labReceivedById
    }
  )
  revalidatePath(`donnees/evenements/${eventId}`)
}

export default updateLaboratoryAction
