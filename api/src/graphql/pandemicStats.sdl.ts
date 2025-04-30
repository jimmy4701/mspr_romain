export const schema = gql`
  type PandemicStat {
    id: Int!
    cumulative_cases: Int!
    daily_new_cases: Int!
    active_cases: Int!
    cumulative_deaths: Int!
    daily_new_deaths: Int!
    date: DateTime!
    location: Location!
    location_id: Int!
    diseases: [Disease]!
    source_id: Int!
    source: Source!
  }

  type Query {
    pandemicStats: [PandemicStat!]! @requireAuth
    pandemicStat(id: Int!): PandemicStat @requireAuth
  }

  input CreatePandemicStatInput {
    cumulative_cases: Int!
    daily_new_cases: Int!
    active_cases: Int!
    cumulative_deaths: Int!
    daily_new_deaths: Int!
    date: DateTime!
    location_id: Int!
    source_id: Int!
  }

  input UpdatePandemicStatInput {
    cumulative_cases: Int
    daily_new_cases: Int
    active_cases: Int
    cumulative_deaths: Int
    daily_new_deaths: Int
    date: DateTime
    location_id: Int
    source_id: Int
  }

  type Mutation {
    createPandemicStat(input: CreatePandemicStatInput!): PandemicStat!
      @requireAuth
    updatePandemicStat(
      id: Int!
      input: UpdatePandemicStatInput!
    ): PandemicStat! @requireAuth
    deletePandemicStat(id: Int!): PandemicStat! @requireAuth
  }
`
