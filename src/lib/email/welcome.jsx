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

export const WelcomeEmail = ({ firstName, username, password }) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className={'my-auto mx-auto font-sans px-2 pb-[20px]'} >
        <Preview>SIS-Faune | Inscription</Preview>
        <Container className={'mx-auto my-[40px] max-w-[465px] px-[20px] items-center'}>
          <Header title={'Votre inscription'} />
          {/* <Section className={'font-bold text-center'}>
            <Img src={`${baseUrl}/logo_sisfaune_big.png`} alt={'Logo SIS'} width={240} className={'mx-auto'} />
            <Heading className={'mx-0 my-[30px] p-0 text-[18px]'}>Votre inscription</Heading>
            <Hr />
          </Section> */}
          <Section>
            <Text className={'text-[16px]'}>Bienvenue { firstName } !</Text>
            <Text className={'text-[16px]'}>Vous avez été invité.e à utiliser la base de données <br/><strong>SIS-Faune</strong>.</Text>
            <Text className={'text-[16px]'}>Pour y accéder, veuillez cliquer sur ce <Link href={baseUrl}>lien</Link>, ou coller l&apos;adresse suivante (<span className={'underline'}>sisfaunequebec.ca</span>) dans votre navigateur, et utiliser les informations de connexion ci-dessous :</Text>
          </Section>
          <Section className={'bg-gray-100 text-[14px] rounded px-6 py-4'}>
            <Text className={'m-0 p-0'}>
              Nom d&apos;utilisateur : <strong>{ username }</strong><br />
              Mot de passe : <strong>{ password }</strong>
            </Text>
          </Section>
          <Section>
            <Text className={'text-[16px]'}>Nous vous recommandons fortement de changer votre mot de passe lors de votre première session de travail.</Text>
            <Text className={'text-[16px]'}>Bonne utilisation !</Text>
            <Hr />
            <Footer />
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

WelcomeEmail.PreviewProps = {
  greeting: 'Bruno',
  username: 'bruno_gendron',
  password: 'password'
}

export default WelcomeEmail
