import { sleep } from 'workflow'

import getDataFromFtp from './get-data-from-ftp'

async function step() {
  'use step'
  return { id: 'test' }
}

const workflow = async () => {
 'use workflow'

 console.debug('Starting MAPAQ workflow')

 await getDataFromFtp()

 console.log('MAPAQ workflow is complete!')

 return { status: 'started' }
}

export default workflow