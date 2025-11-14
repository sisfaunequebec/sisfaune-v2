import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import wait from '@/utils/wait'

const Root = async () => {
  // await wait(5000)
  const session = await auth()

  if (!session) {
    return redirect('/session/ouvrir')
  }

  return redirect('/donnees/evenements')
}

export default Root
