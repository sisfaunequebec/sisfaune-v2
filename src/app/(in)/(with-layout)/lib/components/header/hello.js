'use client'

import daynight from 'daynight'

const Hello = ({ name }) => {
  const greeting = daynight().theme === 'day' ? 'Bonjour' : 'Bonsoir'
  return (
    <>{greeting}&nbsp;<strong>{name}</strong></>
  )
}

export default Hello


