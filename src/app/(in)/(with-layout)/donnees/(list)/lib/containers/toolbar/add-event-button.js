'use client'
import { useCallback, useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useSWRConfig } from 'swr'

import wait from '@/utils/wait'

import { toaster } from '@/app/lib/components/ui/toaster'

import { RxPlus } from 'react-icons/rx'

import getUser from '@/lib/auth/get-user'
import { getSubmitableProgramsForUser } from '@/lib/data/lookups/event-programs'

import useDialog from '@/utils/use-dialog'

import ResponsiveButton from '@/app/lib/components/responsive-button'

import AddEventDialog from './add-event-dialog'
import addEventAction from './add-event-dialog/add-event.action'

const usePrograms = () => {
  const [programs, setPrograms] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPrograms() {
      setIsLoading(true)
      const user = await getUser()
      const programs = await getSubmitableProgramsForUser(user)
      setPrograms(programs)
      setIsLoading(false)
    }

    loadPrograms()
  }, [])

  return { programs, isLoading }
}

const AddEventButton = ({ }) => {
  const router = useRouter()
  const { mutate, cache } = useSWRConfig()

  const { ask: confirmAdd, dialog: addEventDialog } = useDialog(AddEventDialog)
  const { programs, isLoading } = usePrograms()

  const handleClick = useCallback(async () => {
    const result = await confirmAdd({ programs, onAdd: addEventAction })

    if (result) {
      const { id: addedEventId } = result
      
      router.replace(`/donnees/evenements/${addedEventId}`)
      
      await wait(1000)
      
      for (const key of cache.keys()) {
        if (key.includes('/api/data/events')) {
          mutate(key)
        }
        if (key.includes('/api/data/specimens')) {
          mutate(key)
        }
      }

      const { id: addEventId } = result

      toaster.create({
        title: `L'événement no ${addEventId} a été ajouté avec succès...`,
        type: 'success',
        duration: 3000
      })
    }
  }, [confirmAdd, programs, router, mutate, cache])

  return (
    <>
      {addEventDialog}
      <ResponsiveButton label={'Nouvel événement'} colorPalette={'blue'} icon={<RxPlus />} onClick={handleClick} />
    </>
  )
}

export default AddEventButton