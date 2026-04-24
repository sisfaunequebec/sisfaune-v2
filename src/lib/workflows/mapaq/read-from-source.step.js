import { FatalError } from 'workflow'

import sendEmailConfirmation from './send-confirmation.step'

import getDataFromFtp from './lib/get-data-from-ftp'

const readFromSource = async () => {
  'use step'

  const ftpResult = await getDataFromFtp()

  const { file, error } = ftpResult

  if (error) {
    console.debug(`Error downloading from source...`, JSON.stringify(error))
    await sendEmailConfirmation(null, error.detail)

    throw new FatalError(error.detail)
  }

  return file
}

export default readFromSource 