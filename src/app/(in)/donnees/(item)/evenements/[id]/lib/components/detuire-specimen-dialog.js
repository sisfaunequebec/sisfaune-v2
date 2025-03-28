import { useBreakpointValue, Text, VStack } from '@chakra-ui/react'

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

// import { RxInfoCircled } from 'react-icons/rx'

const DetruireSpecimenDialog = ({ close, eventId }) => {
  const size = useBreakpointValue({ base: 'cover', md: 'sm' })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom' })

  return (
    <DialogRoot open size={size} placement='center' motionPreset={motion} onOpenChange={e => close(false)} closeOnInteractOutside role='alertdialog'>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Effacement d&apos;une spécimen</DialogTitle>
        </DialogHeader>
        <DialogBody as={VStack}>
          <Text fontWeight='bold'>Attention&nbsp;! Voulez-vous réellement effacer ce spécimen&nbsp;?</Text>
          <Text>Cette action est irréversible...</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button size={['lg', null, 'sm']} variant='outline' onClick={() => close(false)} minW={24}>Annuler</Button>
          </DialogActionTrigger>
          <Button size={['lg', null, 'sm']} colorPalette='red' onClick={() => close(true)} minW={24}>
            {/* <RxInfoCircled /> */}
            Effacer
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default DetruireSpecimenDialog
