import React from 'react'
import {
  Html,
  Head,
  Tailwind,
  Body,
  Preview,
  Container,
  Section,

  Heading,
  Hr,

  Img,
  Link,

  Text,

} from '@react-email/components'

const baseUrl = process.env.URL 

const Footer = () => {
  return (
    <Text className={'text-[16px]'}>
      <strong>SIS-Faune</strong><br />
      <Link href={baseUrl}>sisfaunequebec.ca</Link>
    </Text>
  )
}

export default Footer
