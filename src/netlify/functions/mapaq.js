

import getDataFromFtp from '../lib/mapaq/get-data-from-ftp'
import readCsv from '@/app/api/scheduled/mapaq/read-csv'
import insertData from '@/app/api/scheduled/mapaq/insert-data'
import sendEmailConfirmation from '@/app/api/scheduled/mapaq/send-confirmation'

const handler = async (req) => {
    const ftpResult = await getDataFromFtp()

    if (ftpResult.error) {
        console.debug(`Error downloading ${sourceFileName}...`)
        sendEmailConfirmation(null, ftpResult.error.detail)
        return
    }

    console.debug(`Reading CSV...`)
    const data = await readCsv(ftpResult.file)

    console.debug(`Inserting data...`)
    const insertResult = await insertData(data)

    if (insertResult.error) {
        console.debug(`Error inserting data...`)
        await sendEmailConfirmation(null, insertResult.error)
        return Response.json({ status: 'error', error: insertResult.error})
    }

    console.debug(`Done inserting data (${insertedRowCount} rows inserted).`)
    const insertedRowCount = insertResult.data[5]

    await sendEmailConfirmation(insertedRowCount, null)
    return Response.json({ status: 'ok', insertedRowCount })
}

export default handler

export const config = {
    schedule: "0 23 * * *"
}