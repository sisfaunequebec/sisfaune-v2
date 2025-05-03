import Toolbar from './lib/containers/toolbar'

export const metadata = {
  title: 'Base de données | SIS Faune'
}

const ListLayout = async ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  )
}

export default ListLayout
