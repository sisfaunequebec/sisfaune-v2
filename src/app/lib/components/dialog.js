import { useBreakpointValue, VStack } from '@chakra-ui/react'

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

const Dialog = ({ title, isAlert = false, children, close }) => {
  const size = useBreakpointValue({ base: 'cover', md: 'sm' })
  const motion = useBreakpointValue({ base: 'scale', md: 'slide-in-bottom' })
  const role = isAlert && 'alertdialog'

  return (
    <DialogRoot open size={size} placement='center' role={role} motionPreset={motion} onOpenChange={e => close(false)} closeOnInteractOutside>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody as={VStack}>
          {children}
        </DialogBody>
        <DialogFooter gap={2}>
          <DialogActionTrigger asChild>
            <Button size={['lg', null, 'sm']} variant='outline' onClick={() => close(false)} minW={24}>Annuler</Button>
          </DialogActionTrigger>
          <Button size={['lg', null, 'sm']} colorPalette='red' onClick={() => close(true)} minW={24}>Effacer</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default Dialog
