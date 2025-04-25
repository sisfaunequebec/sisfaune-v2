import Toolbar from './lib/containers/toolbar'

const ListLayout = async ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  )
}

export default ListLayout
