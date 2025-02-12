export type LoginWithGoole = {
  provider: 'google'
  idTokenGoogle: string
  user: {
    name: string
    email: string
    photo: string
  }
}

export type LoginUserSimple = {
  email: string
  password: string
  rememberMe: boolean
}
