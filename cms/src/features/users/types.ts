export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  INVITED = 'invited',
  SUSPENDED = 'suspended',
}

export enum Role {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  CASHIER = 'cashier',
  MANAGER = 'manager',
}

export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  avatar: string
  email?: string
  phoneNumber: string
  status: UserStatus | null
  role: Role | null
  password:string,
  createdAt: string
  updatedAt: string
}

export interface UserState {
  open: string | null
  currentRow: User | null
  setOpen: (str: string | null) => void
  setCurrentRow: (user : User) => void
}
