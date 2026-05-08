// import { getWritable } from 'workflow'

import extractToExcel from './extract-to-excel.step'
import uploadToBlobStorage from './upload-to-blob-storage.step'

const extractData = async (params) => {
  'use workflow'

  // console.info('Starting data extraction workflow with params: ', params)

  const filePath = await extractToExcel(JSON.parse(params))
  console.debug('Excel file created at', filePath)

  const uploadResult = await uploadToBlobStorage(filePath)
  console.debug('File uploaded to blob storage at', uploadResult)

  console.info('Data extraction workflow is complete!')

  return { file: filePath }
}

export default extractData