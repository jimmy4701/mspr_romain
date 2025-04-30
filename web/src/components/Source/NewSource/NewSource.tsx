import type {
  CreateSourceMutation,
  CreateSourceInput,
  CreateSourceMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SourceForm from 'src/components/Source/SourceForm'

const CREATE_SOURCE_MUTATION: TypedDocumentNode<
  CreateSourceMutation,
  CreateSourceMutationVariables
> = gql`
  mutation CreateSourceMutation($input: CreateSourceInput!) {
    createSource(input: $input) {
      id
    }
  }
`

const NewSource = () => {
  const [createSource, { loading, error }] = useMutation(
    CREATE_SOURCE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Source created')
        navigate(routes.sources())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateSourceInput) => {
    createSource({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Source</h2>
      </header>
      <div className="rw-segment-main">
        <SourceForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSource
