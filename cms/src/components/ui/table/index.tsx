import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table'

import type { ColumnDef } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table'
import { DataTablePagination } from './data-table-pagination'
import DataTableToolbar from './data-table-toolbar'
import { LoaderCircle } from 'lucide-react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  totalPages?: number
  serverSide?: boolean
  pageIndex: number
  pageSize: number
  loading?: boolean
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  totalPages,
  serverSide = false,
  pageIndex,
  pageSize,
  onPaginationChange,
  loading = false,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: serverSide ? totalPages : undefined,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: serverSide,
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater
      onPaginationChange(next)
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !serverSide ? getPaginationRowModel() : undefined,
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />

      <div className="overflow-auto flex-1 px-4 py-1 -mx-4 lg:flex-row lg:space-y-0 lg:space-x-12">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24">
                  <div className="flex justify-center items-center h-full min-h-[400px]">
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  )
}
