import Toolbar from './components/toolbar'

const Layout = ({ children }) => {
  return (
    <>
      <Toolbar />
      {children}
    </>
  )
}

export default Layout
