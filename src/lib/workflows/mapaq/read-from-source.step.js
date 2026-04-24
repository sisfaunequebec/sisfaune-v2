import { FatalError } from 'workflow'

import sendEmailConfirmation from './send-confirmation.step'

import getDataFromFtp from './lib/get-data-from-ftp'
import readCsv from './lib/read-csv'

const readFromSource = async () => {
  'use step'

  const ftpResult = await getDataFromFtp()

  const { file, error } = ftpResult

  if (error) {
    console.debug(`Error downloading from source...`, JSON.stringify(error))
    await sendEmailConfirmation(null, error.detail)
    throw new FatalError(error.detail)
  }

  try {
    console.debug(`Reading CSV...`)
    const data = await readCsv(file)
    return data
  } catch (e) {
    const { message } = e
    console.debug(`Error reading CSV...`, JSON.stringify(message))
    await sendEmailConfirmation(null, message)
    throw new FatalError(message)
  }
}

export default readFromSource 