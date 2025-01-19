import { useState } from 'react'

const useDialog = (DialogFactory) => {
  const [dialog, setDialog] = useState(null)

  const ask = (props) => {
    return new Promise(resolve => {
      const close = result => {
        setDialog(null)
        resolve(result)
      }
      const dialog = <DialogFactory close={close} {...props} />
      setDialog(dialog)
    })
  }

  return { ask, dialog }
}

export default useDialog
