import type { PandemicStat } from '@prisma/client'

import {
  pandemicStats,
  pandemicStat,
  createPandemicStat,
  updatePandemicStat,
  deletePandemicStat,
} from './pandemicStats'
import type { StandardScenario } from './pandemicStats.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pandemicStats', () => {
  scenario('returns all pandemicStats', async (scenario: StandardScenario) => {
    const result = await pandemicStats()

    expect(result.length).toEqual(Object.keys(scenario.pandemicStat).length)
  })

  scenario(
    'returns a single pandemicStat',
    async (scenario: StandardScenario) => {
      const result = await pandemicStat({ id: scenario.pandemicStat.one.id })

      expect(result).toEqual(scenario.pandemicStat.one)
    }
  )

  scenario('creates a pandemicStat', async (scenario: StandardScenario) => {
    const result = await createPandemicStat({
      input: {
        cumulative_cases: 9057137,
        daily_new_cases: 5537950,
        active_cases: 2394319,
        cumulative_deaths: 9484967,
        daily_new_deaths: 7758652,
        location_id: scenario.pandemicStat.two.location_id,
        source_id: scenario.pandemicStat.two.source_id,
      },
    })

    expect(result.cumulative_cases).toEqual(9057137)
    expect(result.daily_new_cases).toEqual(5537950)
    expect(result.active_cases).toEqual(2394319)
    expect(result.cumulative_deaths).toEqual(9484967)
    expect(result.daily_new_deaths).toEqual(7758652)
    expect(result.location_id).toEqual(scenario.pandemicStat.two.location_id)
    expect(result.source_id).toEqual(scenario.pandemicStat.two.source_id)
  })

  scenario('updates a pandemicStat', async (scenario: StandardScenario) => {
    const original = (await pandemicStat({
      id: scenario.pandemicStat.one.id,
    })) as PandemicStat
    const result = await updatePandemicStat({
      id: original.id,
      input: { cumulative_cases: 9254473 },
    })

    expect(result.cumulative_cases).toEqual(9254473)
  })

  scenario('deletes a pandemicStat', async (scenario: StandardScenario) => {
    const original = (await deletePandemicStat({
      id: scenario.pandemicStat.one.id,
    })) as PandemicStat
    const result = await pandemicStat({ id: original.id })

    expect(result).toEqual(null)
  })
})
