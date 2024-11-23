import Provider from "@/components/ui/provider"

export const metadata = {
  title: 'SIS Faune'
}

import { Flex, Container, Center, Text } from '@chakra-ui/react'

const RootLayout = async ({ children }) => {
  return (
    <html lang={'fr'} suppressHydrationWarning={true}>
      <body>
      <Provider>
        {children}
      </Provider>
      </body>
    </html>
  )
}

export default RootLayout
