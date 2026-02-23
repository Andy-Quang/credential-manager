import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../components/AuthProvider'
import Dashboard from '../components/Dashboard'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Dashboard />
}
