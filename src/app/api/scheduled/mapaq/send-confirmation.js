import { Resend } from 'resend'

import orm from '@/lib/data/database'

import MapaqSuccessEmail from '@/lib/email/insertion-mapaq-success'
import MapaqErrorEmail from '@/lib/email/insertion-mapaq-error'

const { RESEND_API_KEY, SENDING_NAME } = process.env

const sendEmailConfirmation = async ( insertedRowCount, error ) => {

  console.debug('Sending email confirmation:', insertedRowCount, error)

  const adminUser = await orm.User.findFirst({ where: { username: 'admin' }})
  console.debug('Admin user:', adminUser)
  const { email } = adminUser

  const resend = new Resend(RESEND_API_KEY)

  if (error) {
    console.debug('Sending error email:', error)
    await resend.emails.send({
      from: SENDING_NAME,
      to: [email],
      subject: 'SIS Faune - Importation des données de signalement du MAPAQ',
      react: MapaqErrorEmail({ error })
    })
  } else {
    console.debug('Sending success email:', insertedRowCount)
    await resend.emails.send({
      from: SENDING_NAME,
      to: [email],
      subject: 'SIS Faune - Importation des données de signalement du MAPAQ',
      react: MapaqSuccessEmail({ insertedRowCount })
    })
  }

}

export default sendEmailConfirmation