'use server'
import { cache } from 'react'

import prisma from '@/lib/data/database'

import { canUserSubmitInProgram, canUserViewProgram } from '@/lib/auth/acl'

const getAllPrograms = async () => {
  const programs = await prisma.LutEventProgram.findMany()
  return programs
}

const toChoicesViewModel = (program) => {
  const { id, name } = program
  return {
    id,
    name
  }
}

const getActivePrograms = async () => {
  const programs = await getAllPrograms()
  const activePrograms = programs
    .filter(p => p.isActive)
    .map(p => toChoicesViewModel(p))
  return activePrograms
}

const getViewableProgramsForUser = async (user) => {
  const programs = await getAllPrograms()
  console.debug('getViewableProgramsForUser:', programs, user)
  const viewableProgramsForUser = programs
    .filter(p => p.isActive)
    .filter(p => canUserViewProgram(user, p.id))
    .map(p => toChoicesViewModel(p))
  return viewableProgramsForUser
}

const getSubmitableProgramsForUser = async (user) => {
  const programs = await getAllPrograms()
  const submitableProgramsForUser = programs
    .filter(p => p.isActive)
    .filter(p => canUserSubmitInProgram(user, p.id))
    .map(p => toChoicesViewModel(p))
  return submitableProgramsForUser
}

export default getActivePrograms

export {
  getAllPrograms,
  getViewableProgramsForUser,
  getSubmitableProgramsForUser
} 
