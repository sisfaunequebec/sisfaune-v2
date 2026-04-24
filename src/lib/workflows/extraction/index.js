import extractToExcel from './extract-to-excel.step'

const extractData = async () => {
 'use workflow'

 console.info('Starting data extraction workflow...')

 const filePath = await extractToExcel()
 console.debug('Excel file created at', filePath)

 console.info('Data extraction workflow is complete!')

 return { file: filePath }
}

export default extractData