import Provider from '@/components/ui/provider'
import { ColorModeProvider } from '@/components/ui/color-mode'

export const metadata = {
  title: 'SIS Faune'
}

import { Flex, Container, Center, Text } from '@chakra-ui/react'

const RootLayout = async ({ children }) => {
  return (
    <html lang={'fr'} suppressHydrationWarning={true}>
      <body>
        <Provider>
          <ColorModeProvider>
            {children}
          </ColorModeProvider>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
