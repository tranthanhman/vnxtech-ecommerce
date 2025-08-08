import UsersDialogs from '../components/users-dialogs'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/userStore'
import { UserPlus } from 'lucide-react'
import DataTable from '@/components/ui/table/index'
import { useState } from 'react'
import { getUsers } from '../api/get-users'
import { useQuery } from '@tanstack/react-query'
import { columns } from '../components/column'

export default function UserListPage() {
  const { setOpen } = useUserStore()

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(20)

  const { data, isLoading } = useQuery({
    queryKey: ['users', pageIndex, pageSize],
    queryFn: () => getUsers(pageIndex + 1, pageSize),
  })

  const handlePageChange = (pagination: { pageIndex: number; pageSize: number }) => {
    setPageIndex(pagination.pageIndex)
    setPageSize(pagination.pageSize)
  }

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
        data={data?.data?.users || []}
        columns={columns}
        serverSide
        totalPages={data?.data?.pagination?.totalPages}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPaginationChange={handlePageChange}
        loading={isLoading}
      />

      <UsersDialogs />
    </>
  )
}
