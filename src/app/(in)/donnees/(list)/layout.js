import { auth } from '@/lib/auth'

import Toolbar from './lib/components/toolbar'

const ListLayout = async ({ children }) => {
  const session = await auth()
  const { user } = session

  return (
    <>
      <Toolbar user={user} />
      {children}
    </>
  )
}

export default ListLayout
