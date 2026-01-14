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

const uploadToNetlify = async (filePath) => {
  try {
    const fileName = path.basename(filePath)
    const store = getStore('data-export', { 
      siteID: '58d1d99c-beda-4a8f-b979-02f061f72ec4' 
    })

    // Read the entire file into memory as a Buffer
    // This avoids the "disturbed or locked" stream error entirely
    const fileBuffer = await readFile(filePath)

    await store.set(fileName, fileBuffer)

    console.log('File successfully uploaded to store')
  } catch (err) {
    console.error('Upload failed:', err)
    throw err
  }
  // return new Promise((resolve, reject) => {
  //   const fileStream = fs.createReadStream(filePath)
  //   const webStream = Readable.toWeb(fileStream)

  //   fileStream.on('open', async () => {
  //     try {

  //       const fileName = path.basename(filePath)

  //       const store = getStore('data-export', { siteID: '58d1d99c-beda-4a8f-b979-02f061f72ec4' })
  //       await store.set(fileName, webStream)

  //       console.log('File successfully uploaded to store')

  //       resolve()
  //     } catch (err) {
  //       reject(err)
  //     }
  //   });

  //   fileStream.on('error', reject)
  // })
}

const handler = async (req, context) => {
  const { url: raw } = req
  
  const url = new URL(raw)
  const { searchParams } = url

  const params = loader(searchParams)

  const filePath = await streamExcelFile()
  await uploadToNetlify(filePath)

  return Response.json({ status: 'ok' })
}

export default handler
