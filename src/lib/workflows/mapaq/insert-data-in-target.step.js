import sendEmailConfirmation from './send-confirmation.step'

import insertData from './lib/insert-data'

const insertDataInTarget = async (data) => {
  'use step'

  const insertResult = await insertData(data)
  const { error, inserted } = insertResult

  if (error) {
    console.debug(`Error inserting data...`, JSON.stringify(error))
    await sendEmailConfirmation(null, error)
    throw new FatalError(error)
  }

  return inserted
}

export default insertDataInTarget