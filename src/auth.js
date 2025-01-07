import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const credentialsProvider = Credentials({
  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
  // e.g. domain, username, password, 2FA token, etc.
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    // console.info(credentials)
    
    let user = null
    const { email } = credentials

    return {
      email: email,
      name: 'Bruno Gendron',
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