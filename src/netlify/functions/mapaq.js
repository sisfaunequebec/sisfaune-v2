import getDataFromFtp from '@/app/api/scheduled/mapaq/get-data-from-ftp'
import readCsv from '@/app/api/scheduled/mapaq/read-csv'
import insertData from '@/app/api/scheduled/mapaq/insert-data'
import sendEmailConfirmation from '@/app/api/scheduled/mapaq/send-confirmation'

const handler = async (req) => {
    // const { next_run } = await req.json()
    // console.log("Received event! Next invocation at:", next_run)

    const ftpResult = await getDataFromFtp()
    const data = await readCsv(ftpResult.file)

    console.debug(data)
}

export default handler

export const config = {
    schedule: "*/5 * * * *"
}