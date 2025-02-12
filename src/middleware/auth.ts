import { useStore } from '../stores/index'
import { useRouter } from 'vue-router'

export default function useAuth() {
  const store = useStore()
  const router = useRouter()

  if (!store.user || Object.keys(store.user).length === 0) {
    router.push('/')
  }
}
