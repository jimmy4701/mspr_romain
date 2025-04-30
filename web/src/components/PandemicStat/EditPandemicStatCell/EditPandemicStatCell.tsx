import type {
  EditPandemicStatById,
  UpdatePandemicStatInput,
  UpdatePandemicStatMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PandemicStatForm from 'src/components/PandemicStat/PandemicStatForm'

export const QUERY: TypedDocumentNode<EditPandemicStatById> = gql`
  query EditPandemicStatById($id: Int!) {
    pandemicStat: pandemicStat(id: $id) {
      id
      cumulative_cases
      daily_new_cases
      active_cases
      cumulative_deaths
      daily_new_deaths
      date
      location_id
      source_id
    }
  }
`

const UPDATE_PANDEMIC_STAT_MUTATION: TypedDocumentNode<
  EditPandemicStatById,
  UpdatePandemicStatMutationVariables
> = gql`
  mutation UpdatePandemicStatMutation(
    $id: Int!
    $input: UpdatePandemicStatInput!
  ) {
    updatePandemicStat(id: $id, input: $input) {
      id
      cumulative_cases
      daily_new_cases
      active_cases
      cumulative_deaths
      daily_new_deaths
      date
      location_id
      source_id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  pandemicStat,
}: CellSuccessProps<EditPandemicStatById>) => {
  const [updatePandemicStat, { loading, error }] = useMutation(
    UPDATE_PANDEMIC_STAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('PandemicStat updated')
        navigate(routes.pandemicStats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdatePandemicStatInput,
    id: EditPandemicStatById['pandemicStat']['id']
  ) => {
    updatePandemicStat({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PandemicStat {pandemicStat?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PandemicStatForm
          pandemicStat={pandemicStat}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
