 export type LoginWithGoole = {
   provider: 'google'
   idTokenGoogle: string
   user: {
     name: string
     email: string
     photo: string
   }
 }
