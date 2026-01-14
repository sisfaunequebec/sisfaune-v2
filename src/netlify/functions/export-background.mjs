import fs from 'fs'
import path from 'path'

import { Readable } from 'stream'

import tmp from 'tmp'
import ExcelJS from 'exceljs'

// import { DateTime } from 'luxon'

import { getStore } from '@netlify/blobs'

import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

import {
  createLoader
} from 'nuqs/server'

const loader = createLoader(searchParams, { urlKeys })

async function streamExcelFile() {
  const tempFile = tmp.fileSync({ template: 'export-XXXXXX.xlsx' })
  const filePath = tempFile.name

  console.log(`Streaming to temp file: ${filePath}`)

  // 1. Initialize the workbook writer with a file path
  const options = {
    filename: filePath,
    useStyles: true,
    useSharedStrings: true
  }
  
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options)
  const worksheet = workbook.addWorksheet('Main Report')

  // 2. Define Columns
  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Timestamp', key: 'timestamp', width: 20 },
  ];

  // 3. Simulate a massive data source (e.g., a Database Cursor or ReadStream)
  for (let i = 1; i <= 100000; i++) {
    const rowData = {
      id: i,
      name: `User_${i}`,
      timestamp: new Date().toISOString()
    }

    // Add row and commit it to the stream immediately
    worksheet.addRow(rowData).commit();
  }

  // 4. Finalize the workbook
  await workbook.commit()
  console.log('Excel file successfully streamed to disk')

  return filePath
}

const handler = async (req, context) => {
  const { url: raw } = req
  
  const url = new URL(raw)
  const { searchParams } = url

  const params = loader(searchParams)
  // console.debug('Export', params)

  // const store = getStore('data-export', { siteID: '58d1d99c-beda-4a8f-b979-02f061f72ec4' })
  // const { modified } = await store.setJSON('test', params)
  // const { modified } = await store.setJSON('excel.xlsx', params)

  const filePath = await streamExcelFile()
  console.debug(filePath)

  const fileName = path.basename(filePath)
  const fileStream = fs.createReadStream(filePath)
  const webStream = Readable.toWeb(fileStream)

  const store = getStore('data-export', { siteID: '58d1d99c-beda-4a8f-b979-02f061f72ec4' })
  await store.set(fileName, webStream)

  return Response.json({ status: 'ok' })
}

export default handler

// export const config = {
//   path: '/data/export'
// }


// // Check that the request is a POST method
//   if (event.httpMethod !== 'POST') {
//     return {
//       statusCode: 405, // Method Not Allowed
//       body: 'Method Not Allowed',
//       headers: { 'Allow': 'POST' }
//     };
//   }

//   // The request body is available as event.body (a string)
//   const bodyString = event.body;

//   try {
//     // Parse the JSON string into a JavaScript object
//     const data = JSON.parse(bodyString);

//     // Use the data as needed
//     console.log('Received data:', data);

//     return {
//       statusCode: 200,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message: 'Success', receivedData: data })
//     };
//   } catch (error) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ message: 'Error parsing JSON body' })
//     };
//   }