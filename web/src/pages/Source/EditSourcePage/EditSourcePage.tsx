import EditSourceCell from 'src/components/Source/EditSourceCell'

type SourcePageProps = {
  id: number
}

const EditSourcePage = ({ id }: SourcePageProps) => {
  return <EditSourceCell id={id} />
}

export default EditSourcePage
