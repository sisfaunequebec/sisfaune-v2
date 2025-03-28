import { useQueryStates } from 'nuqs'

import { useBreakpointValue } from '@chakra-ui/react'

import { Button } from '@/components/ui/button'

import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle
} from '@/components/ui/dialog'

import { searchParams, urlKeys } from '@/logic/data/events/events-params'

const ExportDialog = ({ close, eventId }) => {
  const size = useBreakpointValue({ base: 'cover', md: 'md' })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom' })

  const [params] = useQueryStates(searchParams, { urlKeys })

  return (
    <DialogRoot open size={size} placement='center' motionPreset={motion} onOpenChange={e => close(false)} closeOnInteractOutside>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportation des événements ou spécimens</DialogTitle>
        </DialogHeader>
        <DialogBody>

        </DialogBody>
        <DialogFooter gap={2}>
          <DialogActionTrigger asChild>
            <Button size='sm' variant='outline' onClick={() => close(false)} minW={24}>Annuler</Button>
          </DialogActionTrigger>
          <Button size='sm' colorPalette='blue' onClick={() => close(true)} minW={24}>Exporter</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default ExportDialog
