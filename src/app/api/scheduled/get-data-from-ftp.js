const os = require('os')
// const fs = require('fs')
const path = require('path')

const ftp = require('basic-ftp')

import getToday from './get-today'

const FTP_SOURCE_DIRECTORY = '/Rage raton/Extraction GIRMA'

const {
  FTP_SOURCE_HOST = 'ftps.mapaq.gouv.qc.ca', // FTP_SOURCE_HOST,
  FTP_SOURCE_PORT = 990,
  FTP_SOURCE_USER = 'FTPS0407', // FTP_SOURCE_USER
  FTP_SOURCE_PASSWORD = 'ZneSurVR3h@S', // FTP_SOURCE_PASSWORD
} = process.env

const getDataFromFtp = async () => {
  let fromFtpClient = null

  const tempFileName = 'temp.csv'
  const tempDir = os.tmpdir()
  const tempFile = path.join(tempDir, tempFileName)

  try {
    // Download CSV file from FTP...
    const today = getToday() // '20251117' 

    const sourceFileName = `RAGE_REPONSES_V_VOLET_4_${today}.csv`

    fromFtpClient = new ftp.Client()

    const sourceFtpOptions = {
      host: FTP_SOURCE_HOST,
      port: FTP_SOURCE_PORT,
      user: FTP_SOURCE_USER,
      password: FTP_SOURCE_PASSWORD,
      secure: 'implicit'
    }

    console.debug('Connecting to source...')

    await fromFtpClient.access(sourceFtpOptions)
    await fromFtpClient.cd(FTP_SOURCE_DIRECTORY)

    console.debug(`Downloading ${sourceFileName} from source...`)

    await fromFtpClient.downloadTo(tempFile, sourceFileName)

    return {
      file: tempFile,
      error: null
    }
  } catch(err) {
    console.error(err)

    const { message } = err

    const exception = new Error('GetDataFromFtpException')
    exception.detail = message

    return {
      file: null,
      error: exception
    }
  } finally {
    fromFtpClient.close()
  }
}

export default getDataFromFtp