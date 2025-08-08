import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { type User, type Role, type UserStatusEnum } from '@/types/user.types'
import DataTableActions from '@/components/ui/table/data-table-actions'

export const columns: ColumnDef<User>[] = [
    {
      id: 'id',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone Number',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const role = row.getValue<Role>('role')
        return <div className="capitalize">{role.name}</div>
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue<UserStatusEnum>('status')
        return <div className="capitalize">{status}</div>
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: () => <DataTableActions />,
    },
  ]