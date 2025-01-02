import DesktopMenu from './desktop'
import MobileMenu from './mobile'

const Menu = ({ username, email }) => {
  return (
    <>
      <DesktopMenu username={username} email={email} />
      <MobileMenu username={username} email={email} />
    </>
  )
}

export default Menu