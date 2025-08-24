'use server'

import { revalidatePath } from 'next/cache'

import { updateLaboratory } from '@/lib/data/laboratory/service'

const updateLaboratoryAction = async (eventId, data) => {
  
  const { labResponsible, ...rest } = data
  const labResponsibleId = labResponsible?.id ?? null
  // console.debug('updateLaboratoryAction', data, labResponsibleId)
  await updateLaboratory(eventId, 
    {
      ...rest,
      labResponsibleId
    }
  )
  revalidatePath(`donnees/evenements/${eventId}`)
}

export default updateLaboratoryAction
