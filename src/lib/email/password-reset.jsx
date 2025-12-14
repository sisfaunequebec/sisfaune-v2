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

export const ResetPasswordEmail = ({ username, password }) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className={'my-auto mx-auto font-sans px-2 pb-[20px]'} >
        <Preview>SIS-Faune | Nouveau mot de passe</Preview>
        <Container className={'mx-auto my-[40px] max-w-[465px] px-[20px] items-center'}>
          <Header title={'Votre Votre nouveau mot de passe'} />
          {/* <Section className={'font-bold text-center'}>
            <Img src={`${baseUrl}/logo_sisfaune_big.png`} alt={'Logo SIS'} width={240} className={'mx-auto'} />
            <Heading className={'mx-0 my-[30px] p-0 text-[18px]'}>Votre nouveau mot de passe</Heading>
            <Hr />
          </Section> */}
          <Section>
            <Text className={'text-[16px]'}>Bonjour <strong>{ username }</strong></Text>
            <Text className={'text-[16px]'}>Le mot de passe suivant vous a été assigné :</Text>
          </Section>
          <Section className={'bg-gray-100 text-[14px] rounded px-6 py-4'}>
            <Text className={'m-0 p-0'}><strong>{ password }</strong></Text>
          </Section>
          <Section>
            <Text className={'text-[16px]'}>Nous vous recommandons fortement de le changer lors de votre prochaine session.</Text>
            <Text className={'text-[16px]'}>Merci de votre collaboration,</Text>
            <Hr />
            <Footer />
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

ResetPasswordEmail.PreviewProps = {
  username: 'bruno_gendron',
  password: 'password'
}

export default ResetPasswordEmail
