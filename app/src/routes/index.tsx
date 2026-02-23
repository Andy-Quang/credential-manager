import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../components/AuthProvider'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  return user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
}
