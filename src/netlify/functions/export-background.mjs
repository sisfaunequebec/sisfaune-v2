import path from 'path'

import { readFile } from 'node:fs/promises'

import tmp from 'tmp'
import ExcelJS from 'exceljs'

import wait from '@/utils/wait'

import { PrismaClient } from '@prisma/client'

import { getStore } from '@netlify/blobs'

import cursorStreamExtension from '@/lib/data/stream-extension'

import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

import {
  createLoader
} from 'nuqs/server'

const loader = createLoader(searchParams, { urlKeys })
const prisma = new PrismaClient()
const orm = prisma.$extends(cursorStreamExtension)

async function extractToExcel(params) {

  const dataStream = orm.event.cursorStream({
    include: {
      type: true,
      reportOrigin: true,
      program: true,
      status: true,
      submitter: true,
      discoverer: true,
      collaborator: true,
      habitatType: true,
      lab: true,
      labResponsible: true,
      labShippingMethod: true,
      createdBy: true,
    }
  })

  const tempFile = tmp.fileSync({ template: 'export-XXXXXX.xlsx' })
  const filePath = tempFile.name

  console.log(`Streaming to temp file: ${filePath}`)

  const options = {
    filename: filePath,
    useStyles: true,
    useSharedStrings: true
  }
  
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options)

  const eventsWorksheet = workbook.addWorksheet('Événements')
  const specimensWorksheet = workbook.addWorksheet('Spécimens')
  const resultsWorksheet = workbook.addWorksheet('Résultats d\'analyses')

  eventsWorksheet.columns = [
    { header: 'Numéro d\événement', key: 'id'},
    // { header: 'Type', key: 'typeId' },
    // { header: 'Provenance du signalement', key: 'typeId' },
    // { header: 'Programme', key: 'programId' },
    // { header: 'Statut', key: 'programId' },
    { header: 'Numéro SILAB', key: 'silabId'},
    { header: 'Numéro MAPAQ', key: 'mapaqId'},
    { header: 'Numéro incident CQSAS', key: 'cqsasIncidentNumber'},
    // { header: 'Soumissionnaire', key: 'programId' },
    // { header: 'Découvreur', key: 'programId' },
    // { header: 'Date de découverte', key: 'programId' },
    // { header: 'Date du signalement', key: 'programId' },
    // { header: 'Date du fermeture', key: 'programId' },
    { header: 'Contact avec des humains', key: 'hadHumanContact'},
    { header: 'Contact avec des animaus', key: 'hadAnimalContact'},
  ]

  for await (const event of dataStream) {
    const { id, silabId, mapaqId, cqsasIncidentNumber, hadHumanContact, hadAnimalContact } = event
    eventsWorksheet.addRow(event).commit()
  }

  await workbook.commit()
  console.log('Excel file successfully streamed to disk')

  return filePath
}

const uploadToNetlify = async (filePath) => {
  console.debug('Uploading file to Netlify store...', filePath) 
  try {
    const fileName = path.basename(filePath)
    const store = getStore('data-export', { 
      siteID: '58d1d99c-beda-4a8f-b979-02f061f72ec4' 
    })

    const fileBuffer = await readFile(filePath)

    await store.set(fileName, fileBuffer)

    console.log('File successfully uploaded to store')
  } catch (err) {
    console.error('Upload failed:', err)
    throw err
  }
}

const handler = async (req, context) => {
  const { url: raw } = req
  
  const url = new URL(raw)
  const { searchParams } = url

  const params = loader(searchParams)

  const sessionId = context.cookies.get('etl_session_id')
  const userId = 'd74796c5-2328-44be-be9e-eae0ac8043c4'

  const task = await orm.tasks.create({
    data: {
      userId,
      sessionId
    }
  })

  const filePath = await extractToExcel(params, userId, sessionId)

  await wait(Math.random() * 20000)

  await uploadToNetlify(filePath)

  const updatedTask = await orm.tasks.update({
    where: { id: task.id },
    data: {
      status: 'termine'
    }
  })

  return Response.json({ status: 'ok' })
}

export default handler
