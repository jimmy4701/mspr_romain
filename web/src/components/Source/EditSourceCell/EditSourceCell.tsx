import type {
  EditSourceById,
  UpdateSourceInput,
  UpdateSourceMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SourceForm from 'src/components/Source/SourceForm'

export const QUERY: TypedDocumentNode<EditSourceById> = gql`
  query EditSourceById($id: Int!) {
    source: source(id: $id) {
      id
      name
      description
      url
    }
  }
`

const UPDATE_SOURCE_MUTATION: TypedDocumentNode<
  EditSourceById,
  UpdateSourceMutationVariables
> = gql`
  mutation UpdateSourceMutation($id: Int!, $input: UpdateSourceInput!) {
    updateSource(id: $id, input: $input) {
      id
      name
      description
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ source }: CellSuccessProps<EditSourceById>) => {
  const [updateSource, { loading, error }] = useMutation(
    UPDATE_SOURCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Source updated')
        navigate(routes.sources())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateSourceInput,
    id: EditSourceById['source']['id']
  ) => {
    updateSource({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Source {source?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SourceForm
          source={source}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
