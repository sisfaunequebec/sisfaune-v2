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

const Header = ({ title }) => {
  return (
    <Section className={'font-bold text-center'}>
      <Img src={`${baseUrl}/logo_sisfaune_big.png`} alt={'Logo SIS'} width={240} className={'mx-auto'} />
      <Heading className={'mx-0 my-[30px] p-0 text-[18px]'}>{title}</Heading>
      <Hr />
    </Section>
  )
}

export default Header
