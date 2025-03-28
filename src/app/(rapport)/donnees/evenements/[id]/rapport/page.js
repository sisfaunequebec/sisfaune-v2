'use client'
import { useParams } from 'next/navigation'

import { AbsoluteCenter } from '@chakra-ui/react'

const Rapport = () => {
  const params = useParams()
  const { id: idEvenement } = params
  return (
    <AbsoluteCenter>Rapport pour l&apos;événement no {idEvenement}</AbsoluteCenter>
  )
}

export default Rapport
