import type { Disease } from '@prisma/client'

import {
  diseases,
  disease,
  createDisease,
  updateDisease,
  deleteDisease,
} from './diseases'
import type { StandardScenario } from './diseases.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('diseases', () => {
  scenario('returns all diseases', async (scenario: StandardScenario) => {
    const result = await diseases()

    expect(result.length).toEqual(Object.keys(scenario.disease).length)
  })

  scenario('returns a single disease', async (scenario: StandardScenario) => {
    const result = await disease({ id: scenario.disease.one.id })

    expect(result).toEqual(scenario.disease.one)
  })

  scenario('creates a disease', async () => {
    const result = await createDisease({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a disease', async (scenario: StandardScenario) => {
    const original = (await disease({ id: scenario.disease.one.id })) as Disease
    const result = await updateDisease({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a disease', async (scenario: StandardScenario) => {
    const original = (await deleteDisease({
      id: scenario.disease.one.id,
    })) as Disease
    const result = await disease({ id: original.id })

    expect(result).toEqual(null)
  })
})
