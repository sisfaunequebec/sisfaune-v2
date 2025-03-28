import Toolbar from './lib/components/toolbar'

const ListLayout = ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  )
}

export default ListLayout
