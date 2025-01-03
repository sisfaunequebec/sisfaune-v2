import { useBreakpointValue } from '@chakra-ui/react'

import { Text } from '@chakra-ui/react'

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

const DetruireEvenementDialog = ({ close, eventId }) => {
  const size = useBreakpointValue({ base: 'cover', md: 'sm' })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom'})

  return (
    <DialogRoot open={true} size={size} placement={'center'} motionPreset={motion} onOpenChange={e => close(false)} closeOnInteractOutside={true} role={'alertdialog'}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle textStyle={['2xl', null, 'lg']}>Attention !</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text fontWeight={'bold'} textStyle={['xl', null, 'md']}>Voulez-vous réellement effacer l&apos;événement no {eventId}&nbsp;?</Text>
          <Text textStyle={['lg', null, 'sm']}>Cette action est irréversible...</Text>
        </DialogBody>
        <DialogFooter gap={2}>
          <DialogActionTrigger asChild>
            <Button size={['xl', null, 'md']} variant={'outline'} onClick={() => close(false)} minW={24}>Annuler</Button>
          </DialogActionTrigger>
          <Button size={['xl', null, 'md']} colorPalette={'red'} onClick={() => close(true)} minW={24}>Effacer</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default DetruireEvenementDialog

