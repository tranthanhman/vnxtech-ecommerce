// features/users/services/user.mock.ts
import { faker } from '@faker-js/faker'
import { Role, UserStatus, type User } from '../types'

export const usersMock: User[] = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    username: faker.internet.username({ firstName, lastName }).toLowerCase(),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.enumValue(UserStatus),
    role: faker.helpers.enumValue(Role),
    avatar: faker.image.avatar(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  }
})
