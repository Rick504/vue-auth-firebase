export type CreateUser = {
    name: string
    email: string
    password: string
}

export type StoreUser = {
  name: string | null
  email: string | null
  photo: string
  provider?: boolean
}

export type NewPasswords = {
  newPassword: string
  confirmNewPassword: string
}
