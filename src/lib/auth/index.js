import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import wait from '@/utilitaires/wait'

import { USERS } from './mocks'

import orm from '../data/database'

// class InvalidLoginError extends CredentialsSignin {
//   code = "Invalid identifier or password"
// }

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
      }
    })

    if (!user) {
      const error = new CredentialsSignin()
      error.errors = { password: 'Ce nom d\'utilisateur ou ce mot de passe sont inconnus...' }
      throw error
    }

    // const { password: userPassword } = user

    // if (userPassword !== password) {
    //   const error = new CredentialsSignin()
    //   error.errors = { password: 'Le mot de passe est erroné...' }
    //   throw error
    // }

    const { name, email, firstName, lastName } = user
    const fullName = [firstName, lastName].filter(Boolean).join(' ')

    return {
      fullName,
      email
    }

    // if (process.env.NODE_ENV === 'development') {
    //   return {
    //     email: 'bob@alice.com',
    //     name: 'Bob Alice',
    //     image: 'https://avatars.githubusercontent.com/u/67470890?s=200&v=4'
    //   }
    // }

    // // logic to salt and hash password
    // const pwHash = saltAndHashPassword(credentials.password)

    // // logic to verify if the user exists
    // user = await getUserFromDb(credentials.email, pwHash)

    // if (!user) {
    //   // No user found, so this is their first attempt to login
    //   // meaning this is also the place you could do registration
    //   throw new Error('User not found.')
    // }

    // // return user object with their profile data
    // return user
  }
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentialsProvider
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
        token.fullName = user.fullName
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.user.fullName = token.fullName
      return session
    }
  }
})
