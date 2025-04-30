import type {
  CreateDiseaseMutation,
  CreateDiseaseInput,
  CreateDiseaseMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DiseaseForm from 'src/components/Disease/DiseaseForm'

const CREATE_DISEASE_MUTATION: TypedDocumentNode<
  CreateDiseaseMutation,
  CreateDiseaseMutationVariables
> = gql`
  mutation CreateDiseaseMutation($input: CreateDiseaseInput!) {
    createDisease(input: $input) {
      id
    }
  }
`

const NewDisease = () => {
  const [createDisease, { loading, error }] = useMutation(
    CREATE_DISEASE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Disease created')
        navigate(routes.diseases())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateDiseaseInput) => {
    createDisease({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Disease</h2>
      </header>
      <div className="rw-segment-main">
        <DiseaseForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDisease
