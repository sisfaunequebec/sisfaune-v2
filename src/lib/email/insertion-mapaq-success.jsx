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

export const MapaqSuccessEmail = ({ insertedRowCount }) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className={'my-auto mx-auto font-sans px-2 pb-[20px]'} >
        <Preview>SIS-Faune | Importation des données de signalement du MAPAQ</Preview>
        <Container className={'mx-auto my-[40px] max-w-[465px] px-[20px] items-center'}>
          <Header title={'CECI EST UN MESSAGE AUTOMATIQUE...'} />
          {/* <Section className={'font-bold text-center'}>
            <Img src={`${baseUrl}/logo_sisfaune_big.png`} alt={'Logo SIS'} width={240} className={'mx-auto'} />
            <Heading className={'mx-0 my-[30px] p-0 text-[18px]'}>CECI EST UN MESSAGE AUTOMATIQUE...</Heading>
            <Hr />
          </Section> */}
          <Section>
            <Text className={'text-[16px]'}>L&apos;importation quotidienne des données de signalement du MAPAQ a réussi.</Text>
          </Section>
          <Section className={'bg-gray-100 text-[14px] rounded px-6 py-4'}>
            <Text className={'text-[16px]'}>{insertedRowCount} nouveaux événements ont été insérés.</Text>
          </Section>
          <Section>
            <Footer />
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

MapaqSuccessEmail.PreviewProps = {
  insertedRowCount: 4
}

export default MapaqSuccessEmail
