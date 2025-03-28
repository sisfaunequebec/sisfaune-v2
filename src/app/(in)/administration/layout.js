import Toolbar from './lib/components/toolbar'

const AdminLayout = ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  )
}

export default AdminLayout
