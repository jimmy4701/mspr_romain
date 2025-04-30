import type { Source } from '@prisma/client'

import {
  sources,
  source,
  createSource,
  updateSource,
  deleteSource,
} from './sources'
import type { StandardScenario } from './sources.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sources', () => {
  scenario('returns all sources', async (scenario: StandardScenario) => {
    const result = await sources()

    expect(result.length).toEqual(Object.keys(scenario.source).length)
  })

  scenario('returns a single source', async (scenario: StandardScenario) => {
    const result = await source({ id: scenario.source.one.id })

    expect(result).toEqual(scenario.source.one)
  })

  scenario('creates a source', async () => {
    const result = await createSource({
      input: { name: 'String', description: 'String', url: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.url).toEqual('String')
  })

  scenario('updates a source', async (scenario: StandardScenario) => {
    const original = (await source({ id: scenario.source.one.id })) as Source
    const result = await updateSource({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a source', async (scenario: StandardScenario) => {
    const original = (await deleteSource({
      id: scenario.source.one.id,
    })) as Source
    const result = await source({ id: original.id })

    expect(result).toEqual(null)
  })
})
