import { Button } from "@/components/ui/button"

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
} from "@/components/ui/dialog"

const DetruireEvenementDialog = ({ close, eventId }) => {
  return (
    <DialogRoot lazyMount open={true} size={'sm'} placement={'center'} motionPreset={'slide-in-bottom'} role={'alertdialog'} onOpenChange={e => close(false)} closeOnInteractOutside={true}>
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

