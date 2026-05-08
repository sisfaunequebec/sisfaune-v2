import extractToExcel from './extract-to-excel.step'
import uploadToBlobStorage from './upload-to-blob-storage.step'

const extractData = async (params) => {
  'use workflow'

  const filePath = await extractToExcel(JSON.parse(params))
  console.debug('Excel file created at', filePath)

  const uploadResult = await uploadToBlobStorage(filePath)
  console.debug('File uploaded to blob storage at', uploadResult)

  console.info('Data extraction workflow is complete!')

  return null
}

export default extractData