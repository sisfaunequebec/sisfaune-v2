'use server'
import prisma from '@/lib/data/database'

import { canUserSubmitInProgram, canUserViewProgram } from '@/lib/auth/acl'

const getAllPrograms = async () => {
  const programs = await prisma.LutEventProgram.findMany()
  return programs
}

const toChoicesViewModel = (program) => {
  const { id: value, name: label } = program
  return {
    value,
    label
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
