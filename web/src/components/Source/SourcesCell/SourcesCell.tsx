import type { FindSources, FindSourcesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Sources from 'src/components/Source/Sources'

export const QUERY: TypedDocumentNode<FindSources, FindSourcesVariables> = gql`
  query FindSources {
    sources {
      id
      name
      description
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No sources yet.{' '}
      <Link to={routes.newSource()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindSources>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  sources,
}: CellSuccessProps<FindSources, FindSourcesVariables>) => {
  return <Sources sources={sources} />
}
