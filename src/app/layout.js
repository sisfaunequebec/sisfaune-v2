import Provider from '@/app/lib/components/ui/provider'

// import { Flex, Container, Center, Text } from '@chakra-ui/react'
import system from '@/style'
// import { ColorModeProvider } from '@/components/ui/color-mode'

import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { SessionProvider } from 'next-auth/react'

export const metadata = {
  title: 'SIS Faune'
}

const RootLayout = async ({ children }) => {
  return (
    <html lang='fr' suppressHydrationWarning>
      <body>
        <Provider system={system}>
          {/* <ColorModeProvider> */}
          <NuqsAdapter>
            <SessionProvider>
              {children}
            </SessionProvider>
          </NuqsAdapter>
          {/* </ColorModeProvider> */}
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
