import { useBreakpointValue } from '@chakra-ui/react'

import { Text, VStack } from '@chakra-ui/react'

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

import { RxInfoCircled } from 'react-icons/rx'

const DetruireEvenementDialog = ({ close, eventId }) => {
  const size = useBreakpointValue({ base: 'cover', md: 'sm' })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom'})

  return (
    <DialogRoot open={true} size={size} placement={'center'} motionPreset={motion} onOpenChange={e => close(false)} closeOnInteractOutside={true} role={'alertdialog'}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Effacement d&apos;un événement</DialogTitle>
        </DialogHeader>
        <DialogBody as={VStack}>
          <Text fontWeight={'bold'}>Attention&nbsp;! Voulez-vous réellement effacer<br/>l&apos;événement no {eventId}&nbsp;?</Text>
          <Text>Cette action est irréversible...</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button size={['lg', null, 'sm']} variant={'outline'} onClick={() => close(false)} minW={24}>Annuler</Button>
          </DialogActionTrigger>
          <Button size={['lg', null, 'sm']} colorPalette={'red'} onClick={() => close(true)} minW={24}>
            {/* <RxInfoCircled /> */}
            Effacer
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default DetruireEvenementDialog

