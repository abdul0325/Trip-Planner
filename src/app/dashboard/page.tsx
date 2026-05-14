import { AuthGuard } from "@/components/shared/auth-guard"
import PremiumDashboardLayout from "@/components/dashboard/premium-dashboard-layout"
import DashboardHome from "@/components/dashboard/dashboard-home"

export default function DashboardPage() {
  return (
    <AuthGuard>
      <PremiumDashboardLayout>
        <DashboardHome />
      </PremiumDashboardLayout>
    </AuthGuard>
  )
}
