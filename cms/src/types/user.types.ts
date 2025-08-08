export enum UserStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  INVITED = 'invited',
  SUSPENDED = 'suspended',
}

export enum RoleEnum {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  USER = 'user',
}

export type Role = {
  id: number
  name: RoleEnum
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface User {
  id: string
  name: string
  avatar: string
  email?: string
  phoneNumber: string
  status: UserStatusEnum | null
  role: Role
  password: string
  createdAt: string
  updatedAt: string
}

export interface UserState {
  open: string | null
  currentRow: User | null
  setOpen: (str: string | null) => void
  setCurrentRow: (user: User) => void
}
