import { ZodError } from 'zod'

const EMPTY_FORM_STATE = {
  status: 'UNSET',
  message: null,
  validationErrors: [],
  timestamp: Date.now()
}

const fromErrorToFormState = (error) => {
  // if validation error with Zod, return first error message
  if (error instanceof ZodError) {

    const { fieldErrors } = error.flatten()
    const validationErrors = Object.entries(fieldErrors).map(e => {
      const [ key, messages ] = e 
      return {
        name: key,
        message: messages[0]
      }
    })

    // console.debug(validationErrors)

    return {
      status: 'ERROR',
      message: null,
      validationErrors: [validationErrors[0]],
      timestamp: Date.now()
    }
  // if another error instance, return error message
  // e.g. database error
  } else if (error instanceof Error) {
    return {
      status: 'ERROR',
      message: error.message,
      validationErrors: [],
      timestamp: Date.now(),
      // errors: {
      //   generic : { message: error.message }
      // }
    }
  // if not an error instance but something else crashed
  // return generic error message
  } else {
    return {
      status: 'ERROR',
      message: 'Une erreur s\'est produite...',
      validationErrors: [],
      timestamp: Date.now()
      // errors: {
      //   generic : { message: error.message }
      // }
    }
  }
}

export default fromErrorToFormState

export { 
  EMPTY_FORM_STATE
}