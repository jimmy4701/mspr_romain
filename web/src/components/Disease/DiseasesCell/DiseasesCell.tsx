import type { FindDiseases, FindDiseasesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Diseases from 'src/components/Disease/Diseases'

export const QUERY: TypedDocumentNode<FindDiseases, FindDiseasesVariables> =
  gql`
    query FindDiseases {
      diseases {
        id
        name
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No diseases yet.{' '}
      <Link to={routes.newDisease()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindDiseases>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  diseases,
}: CellSuccessProps<FindDiseases, FindDiseasesVariables>) => {
  return <Diseases diseases={diseases} />
}
