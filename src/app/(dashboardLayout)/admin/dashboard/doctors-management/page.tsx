import { DoctorTable } from "@/components/modules/Admin/DoctorTable";
import { getAllDoctors } from "@/services/doctor.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function DoctorsManagementPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['doctors'],
    queryFn: getAllDoctors,
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 6, // 1 hour
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorTable />
    </HydrationBoundary>
  );
}
