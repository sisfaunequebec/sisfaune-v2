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
  console.debug(insertResult)

  return Response.json({ status: 'ok', insertResult })
}

export {
  GET
}

// export const config = {
//   type: "experimental-scheduled",
//   schedule: "* * * * *"
// }