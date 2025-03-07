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

const AjouterAnalyseDialog = ({ close, eventId }) => {
  const size = useBreakpointValue({ base: 'cover', md: 'md' })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom' })

  return (
    <DialogRoot open size={size} placement='center' motionPreset={motion} onOpenChange={e => close(false)} closeOnInteractOutside>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajout d&apos;une nouvelle analyse</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {/* <p><strong>Voulez-vous réellement effacer l&apos;événement no {eventId}&nbsp;?</strong></p>
          <p>Cette action est irréversible...</p> */}
        </DialogBody>
        <DialogFooter gap={2}>
          <DialogActionTrigger asChild>
            <Button size='sm' variant='outline' onClick={() => close(false)} minW={24}>Annuler</Button>
          </DialogActionTrigger>
          <Button size='sm' colorPalette='blue' onClick={() => close(true)} minW={24}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default AjouterAnalyseDialog
