// import { sleep } from 'workflow'

import sendEmailConfirmation from './send-confirmation.step'
import readFromSource from './read-from-source.step'
import insertDataInTarget from './insert-data-in-target.step'

const integrateMapaqData = async () => {
 'use workflow'

 console.info('Starting MAPAQ workflow...')

 const data = await readFromSource()
 const inserted = await insertDataInTarget(data)

 const insertedRowCount = inserted[5]

 await sendEmailConfirmation(insertedRowCount, null)

 console.info('MAPAQ workflow is complete!')

 return null
}

export default integrateMapaqData