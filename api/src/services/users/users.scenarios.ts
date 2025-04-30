import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String5520316',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2025-04-30T09:46:25.642Z',
      },
    },
    two: {
      data: {
        email: 'String7572012',
        hashedPassword: 'String',
        salt: 'String',
        updatedAt: '2025-04-30T09:46:25.642Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
