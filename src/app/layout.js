import Provider from '@/app/lib/components/ui/provider'

// import { Flex, Container, Center, Text } from '@chakra-ui/react'
import system from '@/style'
// import { ColorModeProvider } from '@/components/ui/color-mode'

import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { SessionProvider } from 'next-auth/react'
import ReactQueryProvider from '@/lib/data/query-provider'

import { Toaster } from '@/app/lib/components/ui/toaster'

export const metadata = {
  title: 'SIS Faune'
}

const RootLayout = async ({ children }) => {
  return (
    <html lang='fr' suppressHydrationWarning>
      <body>
        <Provider system={system}>
          <Toaster />
          {/* <ColorModeProvider> */}
          <NuqsAdapter>
            <SessionProvider>
              <ReactQueryProvider>
                {children}
              </ReactQueryProvider>
            </SessionProvider>
          </NuqsAdapter>
          {/* </ColorModeProvider> */}
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
