export const schema = gql`
  type Disease {
    id: Int!
    name: String!
    pandemic_stats: [PandemicStat]!
  }

  type Query {
    diseases: [Disease!]! @requireAuth
    disease(id: Int!): Disease @requireAuth
  }

  input CreateDiseaseInput {
    name: String!
  }

  input UpdateDiseaseInput {
    name: String
  }

  type Mutation {
    createDisease(input: CreateDiseaseInput!): Disease! @requireAuth
    updateDisease(id: Int!, input: UpdateDiseaseInput!): Disease! @requireAuth
    deleteDisease(id: Int!): Disease! @requireAuth
  }
`
