import type { Prisma, Source } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SourceCreateArgs>({
  source: {
    one: { data: { name: 'String', description: 'String', url: 'String' } },
    two: { data: { name: 'String', description: 'String', url: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Source, 'source'>
