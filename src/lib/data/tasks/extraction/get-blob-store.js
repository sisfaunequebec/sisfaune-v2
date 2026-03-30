
import { getStore } from '@netlify/blobs'

const NETLIFY_SITE_ID = '58d1d99c-beda-4a8f-b979-02f061f72ec4'
const NETLIFY_BLOB_TOKEN = 'nfp_dyV8dK5ZWPNuCQLP9TfodjjFvf48xQFUc2ef'

const getBlobStore = () => {
  const store = getStore('data-export', { 
    siteID: NETLIFY_SITE_ID,
    token: NETLIFY_BLOB_TOKEN
  })

  return store
}

export default getBlobStore
  