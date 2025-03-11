import { useStore } from '../stores/index'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export default function useAuth() {
  const store = useStore()
  const router = useRouter()

  const token = Cookies.get('Authorization')

  if (!token || !store.user.name || !store.user.email) {
    router.push('/login')
  }
}
