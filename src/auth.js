import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import wait from '@/utilities/wait'

const users = {
  'bruno.gendron.consult@gmail.com': { name: 'Bruno Gendron', password: '123456' },
  'admin@sisfaunequebec.ca': { name: 'Admin SISFaune', password: '123456' }
}

// class InvalidLoginError extends CredentialsSignin {
//   code = "Invalid identifier or password"
// }

const credentialsProvider = Credentials({
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    await wait(Math.random() * 2000)

    const { email, password } = credentials

    const user = users[email]

    if (!user) { 
      const error = new CredentialsSignin()
      error.errors = { email: 'Cette adresse est inconnue...'} 
      throw error
    }

    const { password: userPassword } = user
    if (userPassword !== password) { 
      const error = new CredentialsSignin()
      error.errors = { password: 'Le mot de passe est erroné...'} 
      throw error
    }

    const { name } = user

    return {
      email: email,
      name: name,
      image: 'https://avatars.githubusercontent.com/u/67470890?s=200&v=4'
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
  ]
})