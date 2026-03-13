import bcrypt from 'bcrypt'
import crypto from 'crypto'

import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import orm from '../data/database'

const hashDotnetMembershipPassword = (password, salt) => {
  var bytes = new Buffer(password || '', 'utf16le')
  var src = new Buffer(salt || '', 'base64')
  var dst = new Buffer(src.length + bytes.length)
  src.copy(dst, 0, 0, src.length)
  bytes.copy(dst, src.length, 0, bytes.length)

  return crypto.createHash('sha1').update(dst).digest('base64')
}

const validateDotnetMembershipPassword = (password, hash, salt) => {
  const test = hashDotnetMembershipPassword(password, salt)
  const isValid = test === hash
  return isValid
}

const checkCredentials = async (user, password) => {
  const { password: hashedPassword, hash, salt, email } = user

  if (hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword)

    if (!match) {
      const error = new CredentialsSignin()
      error.errors = {  username: 'Ce nom d\'utilisateur est inconnu ou le mot de passe est erronné...' }
      throw error
    }
  } else {
    const match = validateDotnetMembershipPassword(password, hash, salt)

    if (!match) {
      const error = new CredentialsSignin()
      error.errors = {  username: 'Ce nom d\'utilisateur est inconnu ou le mot de passe est erronné...' }
      throw error
    }
  }
  
}

const credentialsProvider = Credentials({
  credentials: {
    username: {},
    password: {}
  },

  authorize: async (credentials) => {
    const { username, password } = credentials

    const user = await orm.User.findFirst({ 
      where: {
        username
      },
      include: {
        permissions: {
          include: {
            program: true
          }
        }
      }
    })

    if (!user) {
      const error = new CredentialsSignin()
      error.errors = { username: 'Ce nom d\'utilisateur est inconnu ou le mot de passe est erronné...' }
      throw error
    }

    await checkCredentials(user, password)

    const { id, email, firstName, lastName, isAdmin, canReopenEvent, permissions: permissionsAsArray } = user
    const fullName = [firstName, lastName].filter(Boolean).join(' ')

    const permissions = permissionsAsArray.map(p => {
      const { program, programId, roleId: role, canSubmit } = p
      const { name: programName } = program
      return {
        programId,
        programName: programName,
        role,
        canSubmit
      }
    })

    return {
      id,
      fullName,
      email,
      isAdmin,
      canReopenEvent,
      permissions
    }
  }
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentialsProvider
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    // },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.fullName = user.fullName
        token.isAdmin = user.isAdmin
        token.canReopenEvent = user.canReopenEvent
        token.permissions = user.permissions
      }

      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.fullName = token.fullName
      session.user.isAdmin = token.isAdmin
      session.user.canReopenEvent = token.canReopenEvent
      session.user.permissions = token.permissions
      session.isFirstLogin = true

      return session
    }
  }
})
