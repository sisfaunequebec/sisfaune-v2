import { useBreakpointValue } from '@chakra-ui/react'

import { Button } from '@/components/ui/button'

import {
  DialogActionTrigger,
  DialogBody,
  // DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  // DialogTrigger,
} from '@/components/ui/dialog'
import { setErrorMap } from 'zod'

// console.debug(useBreakpointValue)

const DetruireEvenementDialog = ({ close, eventId }) => {
  const size = useBreakpointValue({ base: 'full', sm: 'sm' })
  const motion = useBreakpointValue({ base: 'scale', sm: 'slide-in-bottom'})

  return (
    <DialogRoot open={true} size={size} placement={'center'} motionPreset={motion} onOpenChange={e => close(false)} closeOnInteractOutside={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Attention !</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p><strong>Voulez-vous réellement effacer l&apos;événement no {eventId}&nbsp;?</strong></p>
          <p>Cette action est irréversible...</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant={'outline'} onClick={() => close(false)} minW={24}>Annuler</Button>
          </DialogActionTrigger>
          <Button colorPalette={'red'} onClick={() => close(true)} minW={24}>Effacer</Button>
        </DialogFooter>
        {/* <DialogCloseTrigger /> */}
      </DialogContent>
    </DialogRoot>
  )
}

export default DetruireEvenementDialog

