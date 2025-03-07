import Toolbar from './lib/components/toolbar'

const Layout = ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  )
}

export default Layout
