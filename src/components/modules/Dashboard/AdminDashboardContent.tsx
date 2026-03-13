import { getDashboardData } from "@/services/dashboard.service"
import { ApiResponse } from "@/types/api.type"
import { IAdminDashboardData } from "@/types/dashboard.type"
import { useQuery } from "@tanstack/react-query"
import { StatsCard } from "../shared/StatsCard"
import AppoinmentBarChart from "../shared/AppoinmentBarChart"
import AppoinmentPieChart from "../shared/AppoinmentPieChart"


const AdminDashboardContent = () => {
  const { data: adminDashboardData } = useQuery({
    queryKey: ['admin-dashboard-data'],
    queryFn: getDashboardData,
    refetchOnWindowFocus: "always"
  })
  const { data } = adminDashboardData as ApiResponse<IAdminDashboardData>
  return (
    <div>
      <StatsCard
        title="Total Appointments"
        value={data?.appointmentCount || 0}
        iconName="CalendarDays"
        description="Number of appointments scheduled"
      />
      <StatsCard
        title="Total Patients"
        value={data?.patientCount || 0}
        iconName="Users"
        description="Number of patients registered"
      />

      <AppoinmentBarChart
        data={data?.barChartData || []}
      />

      <AppoinmentPieChart
        data={data?.pieChartData || []}
      />
    </div>
  )
}

export default AdminDashboardContent