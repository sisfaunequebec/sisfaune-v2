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

import Header from './lib/header'
import Footer from './lib/footer'

const baseUrl = process.env.URL 

export const MapaqErrorEmail = ({ error }) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className={'my-auto mx-auto font-sans px-2 pb-[20px]'} >
        <Preview>SIS-Faune | ERREUR d&apos;importation des données de signalement du MAPAQ</Preview>
        <Container className={'mx-auto my-[40px] max-w-[465px] px-[20px] items-center'}>
          <Header title={'ERREUR d\'importation des données de signalement du MAPAQ'} />
          {/* <Section className={'font-bold text-center'}>
            <Img src={`${baseUrl}/logo_sisfaune_big.png`} alt={'Logo SIS'} width={240} className={'mx-auto'} />
            <Heading className={'mx-0 my-[30px] p-0 text-[18px]'}>ERREUR d&apos;importation des données de signalement du MAPAQ</Heading>
            <Hr />
          </Section> */}
          <Section>
            {/* <Text className={'text-[16px]'}>Bienvenue { firstName } !</Text> */}
            <Text className={'text-[16px]'}>Une erreur s&apos;est produite lors de importation quotidienne des données de signalement du MAPAQ :</Text>
          </Section>
          <Section className={'bg-gray-100 text-[14px] rounded px-6 py-4'}>
            <Text className={'m-0 p-0'}>{ error }</Text>
          </Section>
          <Section>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

MapaqErrorEmail.PreviewProps = {
  error: 'test'
}

export default MapaqErrorEmail
