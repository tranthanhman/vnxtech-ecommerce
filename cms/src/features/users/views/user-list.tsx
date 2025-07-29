import type { Role, UserStatus, User } from '@/types/user.types'
import UsersDialogs from '../components/users-dialogs'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/userStore'
import { UserPlus } from 'lucide-react'
import DataTable from '@/components/ui/table/index'
import {Checkbox} from '@/components/ui/checkbox'
import {useState} from 'react'
import type {ColumnDef} from '@tanstack/react-table'
import {getUsers} from '../api/get-users'
import {useQuery} from '@tanstack/react-query'
import DataTableActions from '@/components/ui/table/data-table-actions'

export default function UserListPage() {
  const { setOpen } = useUserStore()

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(20)

  const { data } = useQuery({
    queryKey: ['users', pageIndex, pageSize],
    queryFn: () => getUsers(pageIndex + 1, pageSize),
  })

  const handlePageChange = (pagination: { pageIndex: number; pageSize: number }) => {
    setPageIndex(pagination.pageIndex)
    setPageSize(pagination.pageSize)
  }

  // Define columns for the User data table
  const columns: ColumnDef<User>[] = [
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
      accessorKey: 'username',
      header: 'Username',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone Number',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => {
        const roleValue = row.getValue<Role>('role')
        return <div className="capitalize">{roleValue}</div>
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statusValue = row.getValue<UserStatus>('status')
        return <div className="capitalize">{statusValue}</div>
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

  return (
    <>
      <div className="flex flex-wrap justify-between items-center mb-2 space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User List</h2>
          <p className="text-muted-foreground">Manage your users and their roles here.</p>
        </div>

        <Button className="space-x-1" onClick={() => setOpen('add')}>
          Add User <UserPlus size={18} />
        </Button>
      </div>


      <DataTable
        data={data?.users || []}
        columns={columns}
        serverSide
        totalPages={data?.pagination?.totalPages}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPaginationChange={handlePageChange}
      />

      <UsersDialogs />
    </>
  )
}
