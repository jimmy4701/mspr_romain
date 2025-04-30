import type { FindSourceById, FindSourceByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Source from 'src/components/Source/Source'

export const QUERY: TypedDocumentNode<FindSourceById, FindSourceByIdVariables> =
  gql`
    query FindSourceById($id: Int!) {
      source: source(id: $id) {
        id
        name
        description
        url
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Source not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSourceByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  source,
}: CellSuccessProps<FindSourceById, FindSourceByIdVariables>) => {
  return <Source source={source} />
}
