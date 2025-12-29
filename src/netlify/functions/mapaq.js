

import getDataFromFtp from '@/app/api/scheduled/mapaq/get-data-from-ftp'
import readCsv from '@/app/api/scheduled/mapaq/read-csv'
import insertData from '@/app/api/scheduled/mapaq/insert-data'
import sendEmailConfirmation from '@/app/api/scheduled/mapaq/send-confirmation'

const handler = async (req) => {
    const ftpResult = await getDataFromFtp()

    if (ftpResult.error) {
        console.debug(ftpResult.error.detail)
        sendEmailConfirmation(null, ftpResult.error.detail)
        return
    }

    const data = await readCsv(ftpResult.file)

    const insertResult = await insertData(data)

    if (insertResult.error) {
      sendEmailConfirmation(null, insertResult.error)
      return Response.json({ status: 'error', error: insertResult.error})
    }

    const insertedRowCount = insertResult.data[5]

    // send success email
    console.debug(insertedRowCount)
    sendEmailConfirmation(insertedRowCount, null)
    return Response.json({ status: 'ok', insertedRowCount })
}

export default handler

export const config = {
    schedule: "0 23 * * *"
}