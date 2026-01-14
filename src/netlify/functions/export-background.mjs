import { searchParams, urlKeys } from '@/lib/data/events/get-events.params'

import {
  createLoader
} from 'nuqs/server'

const loader = createLoader(searchParams, { urlKeys })

const handler = async (req, context) => {
  const { url: raw } = req
  
  const url = new URL(raw)
  const { searchParams } = url

  const params = loader(searchParams)
  console.debug('Export', params)

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