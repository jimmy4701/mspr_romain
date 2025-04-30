export const schema = gql`
  type Location {
    id: Int!
    country_name: String!
    province_state: String!
    iso_code: String!
    latitude: Float!
    longitude: Float!
    who_region: String!
    pandemic_stats: [PandemicStat]!
  }

  type Query {
    locations: [Location!]! @requireAuth
    location(id: Int!): Location @requireAuth
  }

  input CreateLocationInput {
    country_name: String!
    province_state: String!
    iso_code: String!
    latitude: Float!
    longitude: Float!
    who_region: String!
  }

  input UpdateLocationInput {
    country_name: String
    province_state: String
    iso_code: String
    latitude: Float
    longitude: Float
    who_region: String
  }

  type Mutation {
    createLocation(input: CreateLocationInput!): Location! @requireAuth
    updateLocation(id: Int!, input: UpdateLocationInput!): Location!
      @requireAuth
    deleteLocation(id: Int!): Location! @requireAuth
  }
`
