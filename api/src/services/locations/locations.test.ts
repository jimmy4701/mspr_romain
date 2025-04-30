import type { Location } from '@prisma/client'

import {
  locations,
  location,
  createLocation,
  updateLocation,
  deleteLocation,
} from './locations'
import type { StandardScenario } from './locations.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('locations', () => {
  scenario('returns all locations', async (scenario: StandardScenario) => {
    const result = await locations()

    expect(result.length).toEqual(Object.keys(scenario.location).length)
  })

  scenario('returns a single location', async (scenario: StandardScenario) => {
    const result = await location({ id: scenario.location.one.id })

    expect(result).toEqual(scenario.location.one)
  })

  scenario('creates a location', async () => {
    const result = await createLocation({
      input: {
        country_name: 'String',
        province_state: 'String',
        iso_code: 'String',
        latitude: 8245503.48376404,
        longitude: 2993254.33053947,
        who_region: 'String',
      },
    })

    expect(result.country_name).toEqual('String')
    expect(result.province_state).toEqual('String')
    expect(result.iso_code).toEqual('String')
    expect(result.latitude).toEqual(8245503.48376404)
    expect(result.longitude).toEqual(2993254.33053947)
    expect(result.who_region).toEqual('String')
  })

  scenario('updates a location', async (scenario: StandardScenario) => {
    const original = (await location({
      id: scenario.location.one.id,
    })) as Location
    const result = await updateLocation({
      id: original.id,
      input: { country_name: 'String2' },
    })

    expect(result.country_name).toEqual('String2')
  })

  scenario('deletes a location', async (scenario: StandardScenario) => {
    const original = (await deleteLocation({
      id: scenario.location.one.id,
    })) as Location
    const result = await location({ id: original.id })

    expect(result).toEqual(null)
  })
})
