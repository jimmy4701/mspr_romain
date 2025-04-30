import type { Prisma, PandemicStat } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PandemicStatCreateArgs>({
  pandemicStat: {
    one: {
      data: {
        cumulative_cases: 1789812,
        daily_new_cases: 1706378,
        active_cases: 4855084,
        cumulative_deaths: 7034949,
        daily_new_deaths: 3094713,
        location: {
          create: {
            country_name: 'String',
            province_state: 'String',
            iso_code: 'String',
            latitude: 9864896.956879355,
            longitude: 764444.4211214529,
            who_region: 'String',
          },
        },
        source: {
          create: { name: 'String', description: 'String', url: 'String' },
        },
      },
    },
    two: {
      data: {
        cumulative_cases: 4338048,
        daily_new_cases: 3252555,
        active_cases: 9143725,
        cumulative_deaths: 5547736,
        daily_new_deaths: 6115894,
        location: {
          create: {
            country_name: 'String',
            province_state: 'String',
            iso_code: 'String',
            latitude: 855234.0128147007,
            longitude: 9698497.838462183,
            who_region: 'String',
          },
        },
        source: {
          create: { name: 'String', description: 'String', url: 'String' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<PandemicStat, 'pandemicStat'>
