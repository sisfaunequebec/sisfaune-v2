import getDataFromFtp from './get-data-from-ftp'
import readCsv from './read-csv'
import insertData from './insert-data'

const GET = async (request) => {
  const { nextUrl: { searchParams } } = request

  const ftpResult = await getDataFromFtp()
  if (ftpResult.error) {
    return Response.json({ status: 'error', error: ftpResult.error })
  }

  const data = await readCsv(ftpResult.file)

  const insertResult = await insertData(data)

  if (insertResult.error) {
    return Response.json({ status: 'error', error: insertResult.error })
    // send error email
  }

  console.debug('insertResult', insertResult)
  const insertedRowCount = insertResult.data[5]

  // send success email

  return Response.json({ status: 'ok', insertedRowCount })
}

export {
  GET
}

// export const config = {
//   type: "experimental-scheduled",
//   schedule: "* * * * *"
// }