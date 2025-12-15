import { useEffect, useState } from 'react'

const useLookup = (url, queryParams, tags, cache) => {
  const [items, setItems] = useState([])

  const isDev = process.env.NODE_ENV === 'development'

  const queryString = new URLSearchParams(queryParams).toString()
  const fullUrl = [url, queryParams && `?${queryString}`].join('')

  const cacheSetting = cache ?? (isDev ? 'no-cache' : 'force-cache')

  useEffect(() => {
    const load = async () => {
      const res = await fetch(fullUrl, { cache: cacheSetting, next: { tags } })
      const result = await res.json() 
      setItems(result)
    }
    load()
  }, [setItems])

  // console.debug('useLookup, items', items)
  return items
}

export default useLookup