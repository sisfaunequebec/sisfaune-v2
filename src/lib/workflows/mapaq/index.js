// import { sleep } from 'workflow'

import readFromSource from './read-from-source.step'
import sendEmailConfirmation from './send-confirmation.step'

// import getDataFromFtp from './lib/get-data-from-ftp'
import readCsv from './lib/read-csv'

const integrateMapaqData = async () => {
 'use workflow'

 console.info('Starting MAPAQ workflow...')

 const file = await readFromSource()

//  console.info(`Reading CSV...`)
//  const data = await readCsv(ftpResult.file)
//  console.debug(data)

 console.info(`Inserting data...`)

 console.info('MAPAQ workflow is complete!')

//  await sendEmailConfirmation(10, null)

 return null
}

export default integrateMapaqData