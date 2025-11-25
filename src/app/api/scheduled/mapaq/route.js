import getDataFromFtp from './get-data-from-ftp'
import readCsv from './read-csv'
import insertData from './insert-data'
import sendEmailConfirmation from './send-confirmation'

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const ftpResult = await getDataFromFtp()
  if (ftpResult.error) {
    sendEmailConfirmation(null, ftpResult.error.detail)
    return Response.json({ status: 'error', error: ftpResult.error.detail })
  }

  const data = await readCsv(ftpResult.file)
  // console.debug(data)

  const insertResult = await insertData(data)

  if (insertResult.error) {
    sendEmailConfirmation(null, insertResult.error)
    return Response.json({ status: 'error', error: insertResult.error})
  }

  // console.debug('insertResult', insertResult)
  const insertedRowCount = insertResult.data[5]

  // send success email
  sendEmailConfirmation(insertedRowCount, null)
  return Response.json({ status: 'ok', insertedRowCount })
}

export {
  GET
}

// export const config = {
//   type: "experimental-scheduled",
//   schedule: "* * * * *"
// }