import type { Prisma, Location } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.LocationCreateArgs>({
  location: {
    one: {
      data: {
        country_name: 'String',
        province_state: 'String',
        iso_code: 'String',
        latitude: 3219801.908631297,
        longitude: 1592612.9283417389,
        who_region: 'String',
      },
    },
    two: {
      data: {
        country_name: 'String',
        province_state: 'String',
        iso_code: 'String',
        latitude: 9435853.455717955,
        longitude: 5142824.473927927,
        who_region: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Location, 'location'>
