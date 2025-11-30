import bcrypt from 'bcrypt'

import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import orm from '../data/database'

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
    
    const { password: hashedPassword } = user

    const match = await bcrypt.compare(password, hashedPassword)

    if (!match) {
      const error = new CredentialsSignin()
      error.errors = {  username: 'Ce nom d\'utilisateur est inconnu ou le mot de passe est erronné...' }
      throw error
    }

    const { id, name, email, firstName, lastName, isAdmin, permissions: permissionsAsArray } = user
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
      permissions
    }
  }
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentialsProvider
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // user is available during sign-in
        token.id = user.id
        token.fullName = user.fullName
        token.isAdmin = user.isAdmin
        token.permissions = user.permissions
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.fullName = token.fullName
      session.user.isAdmin = token.isAdmin
      session.user.permissions = token.permissions
      return session
    }
  }
})
