"use client"

import { IDoctorData } from "@/types/doctor.type"
import { useQuery } from "@tanstack/react-query"
import DataTable from "../shared/DataTable"
import doctorsColumns from "./doctorsColumns"
import { getAllDoctors } from "@/services/doctor.service"
import TestTable from "./TestTable"

export const DoctorTable = () => {
  const { data: doctorDataResponse, isLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: getAllDoctors
  })
  const { data: doctors } = doctorDataResponse! || [];

  const handleView = (doctor: IDoctorData) => {
    console.log("handle View", doctor);
  }

  const handleEdit = (doctor: IDoctorData) => {
    console.log("handle Edit", doctor);
  }

  const handleDelete = (doctor: IDoctorData) => {
    console.log("handle Delete", doctor);
  }

  return (
    <>
    <DataTable
       data={doctors}
        columns={doctorsColumns}
        isLoading={isLoading}
        emptyMessage="No doctors found."
        actions={
          {
            onView : handleView,
            onEdit : handleEdit,
            onDelete : handleDelete
          }
        }
    />
    {/* <TestTable /> */}
    </>
  )
}
