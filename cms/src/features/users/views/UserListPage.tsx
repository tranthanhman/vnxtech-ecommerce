import type { User } from '../types'
import { usersMock } from '../__mocks__/fakeUsers'
import { columns, UserDataTable } from '../components'
import UsersDialogs from '../components/users-dialogs'
import { Button } from '@/components/ui/button'
import { useUserStore } from '../store'
import {UserPlus} from 'lucide-react'

export default function UserListPage() {
  const users: User[] = usersMock

  const { setOpen } = useUserStore()

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
      <div className="overflow-auto flex-1 px-4 py-1 -mx-4 lg:flex-row lg:space-y-0 lg:space-x-12">
        <UserDataTable columns={columns} data={users} />
      </div>

      <UsersDialogs />
    </>
  )
}
