import type {
  CreatePandemicStatMutation,
  CreatePandemicStatInput,
  CreatePandemicStatMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PandemicStatForm from 'src/components/PandemicStat/PandemicStatForm'

const CREATE_PANDEMIC_STAT_MUTATION: TypedDocumentNode<
  CreatePandemicStatMutation,
  CreatePandemicStatMutationVariables
> = gql`
  mutation CreatePandemicStatMutation($input: CreatePandemicStatInput!) {
    createPandemicStat(input: $input) {
      id
    }
  }
`

const NewPandemicStat = () => {
  const [createPandemicStat, { loading, error }] = useMutation(
    CREATE_PANDEMIC_STAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('PandemicStat created')
        navigate(routes.pandemicStats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePandemicStatInput) => {
    createPandemicStat({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New PandemicStat</h2>
      </header>
      <div className="rw-segment-main">
        <PandemicStatForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPandemicStat
