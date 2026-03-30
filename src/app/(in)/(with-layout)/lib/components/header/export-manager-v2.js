'use client'
import { useEffect } from 'react'

import { saveAs } from 'file-saver'

import useTasks from '@/lib/data/tasks/use-tasks'

import { toaster } from '@/app/lib/components/ui/toaster'

const ExportManager = () => {
  const { data: tasks = [] } = useTasks()

  useEffect(() => {
    queueMicrotask(async () => {
      for (const task of tasks) {
        const { id, status } = task

        if (toaster.isVisible(id) && status === 'termine') {

          toaster.update(id, {
            title: 'Extraction terminée !',
            description: null,
            type: 'success',
            duration: 5000
          })

          saveAs(`/api/extraction/download/${id}`)
        }
      }
    })
  }, [tasks])

  return null
}

export default ExportManager

