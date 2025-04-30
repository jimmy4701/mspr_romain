export const schema = gql`
  type Source {
    id: Int!
    name: String!
    description: String!
    url: String!
    pandemic_stats: [PandemicStat]!
  }

  type Query {
    sources: [Source!]! @requireAuth
    source(id: Int!): Source @requireAuth
  }

  input CreateSourceInput {
    name: String!
    description: String!
    url: String!
  }

  input UpdateSourceInput {
    name: String
    description: String
    url: String
  }

  type Mutation {
    createSource(input: CreateSourceInput!): Source! @requireAuth
    updateSource(id: Int!, input: UpdateSourceInput!): Source! @requireAuth
    deleteSource(id: Int!): Source! @requireAuth
  }
`
