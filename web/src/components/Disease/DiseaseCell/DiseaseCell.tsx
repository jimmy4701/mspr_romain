import type { FindDiseaseById, FindDiseaseByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Disease from 'src/components/Disease/Disease'

export const QUERY: TypedDocumentNode<
  FindDiseaseById,
  FindDiseaseByIdVariables
> = gql`
  query FindDiseaseById($id: Int!) {
    disease: disease(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Disease not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindDiseaseByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  disease,
}: CellSuccessProps<FindDiseaseById, FindDiseaseByIdVariables>) => {
  return <Disease disease={disease} />
}
