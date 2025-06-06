import Header from './lib/components/header'

const Layout = async ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout
