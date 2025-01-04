import Toolbar from './components/toolbar'

const Layout = async ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  )
}

export default Layout


