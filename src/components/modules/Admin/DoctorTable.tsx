import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getDoctor } from "@/services/doctor.service"
import { IDoctorData } from "@/types/doctor.type"
import { useQuery } from "@tanstack/react-query"
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'

export const DoctorTable = () => {
  const { data: doctorDataResponse } = useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctor
  })
  const { data: doctors } = doctorDataResponse! || [];


  const doctorColumns: ColumnDef<IDoctorData>[] = [
    { accessorKey: 'name', header: 'Name' },
    //   { accessorKey: "specialization", header: "Specialization" },
    { accessorKey: "experience", header: "Experience" },
    //   { accessorKey: "rating", header: "Rating" },
  ]

  const { getHeaderGroups, getRowModel } = useReactTable({
    data: doctors,
    columns: doctorColumns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Table>
      <TableHead>
        {getHeaderGroups().map((hg) => (
          <TableRow key={hg.id}>
            {
              hg.headers.map((header) => (
                <TableHeader key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHeader>
              ))
            }
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
