import Provider from '@/components/ui/provider'

// import { Flex, Container, Center, Text } from '@chakra-ui/react'
import system from '@/style'
// import { ColorModeProvider } from '@/components/ui/color-mode'

export const metadata = {
  title: 'SIS Faune'
}

const RootLayout = async ({ children }) => {
  return (
    <html lang='fr' suppressHydrationWarning>
      <body>
        <Provider system={system}>
          {/* <ColorModeProvider> */}
          {children}
          {/* </ColorModeProvider> */}
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
