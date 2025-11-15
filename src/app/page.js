import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

const Root = async () => {
  const session = await auth()

  if (!session) {
    return redirect('/session/ouvrir')
  }

  return redirect('/donnees/evenements')
}

export default Root
