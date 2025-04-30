import type {
  EditDiseaseById,
  UpdateDiseaseInput,
  UpdateDiseaseMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DiseaseForm from 'src/components/Disease/DiseaseForm'

export const QUERY: TypedDocumentNode<EditDiseaseById> = gql`
  query EditDiseaseById($id: Int!) {
    disease: disease(id: $id) {
      id
      name
    }
  }
`

const UPDATE_DISEASE_MUTATION: TypedDocumentNode<
  EditDiseaseById,
  UpdateDiseaseMutationVariables
> = gql`
  mutation UpdateDiseaseMutation($id: Int!, $input: UpdateDiseaseInput!) {
    updateDisease(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ disease }: CellSuccessProps<EditDiseaseById>) => {
  const [updateDisease, { loading, error }] = useMutation(
    UPDATE_DISEASE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Disease updated')
        navigate(routes.diseases())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateDiseaseInput,
    id: EditDiseaseById['disease']['id']
  ) => {
    updateDisease({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Disease {disease?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <DiseaseForm
          disease={disease}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
