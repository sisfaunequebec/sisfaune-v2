import { Resend } from 'resend'

import orm from '@/lib/data/database'

import MapaqSuccessEmail from '@/lib/email/insertion-mapaq-success'
import MapaqErrorEmail from '@/lib/email/insertion-mapaq-error'

const { RESEND_API_KEY, SENDING_NAME, BCC_ADDRESS } = process.env

const sendEmailConfirmation = async ( insertedRowCount, error ) => {
  'use step'

  const adminUser = await orm.User.findFirst({ where: { username: 'admin' }})
  const { email } = adminUser

  const resend = new Resend(RESEND_API_KEY)

  if (error) {
    await resend.emails.send({
      from: SENDING_NAME,
      to: [email],
      cc: [BCC_ADDRESS],
      subject: 'SIS Faune - Importation des données de signalement du MAPAQ',
      react: MapaqErrorEmail({ error })
    })
  } else {
    await resend.emails.send({
      from: SENDING_NAME,
      to: [email],
      cc: [BCC_ADDRESS],
      subject: 'SIS Faune - Importation des données de signalement du MAPAQ',
      react: MapaqSuccessEmail({ insertedRowCount })
    })
  }

}

sendEmailConfirmation.maxRetries = 10

export default sendEmailConfirmation