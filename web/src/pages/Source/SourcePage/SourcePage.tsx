import SourceCell from 'src/components/Source/SourceCell'

type SourcePageProps = {
  id: number
}

const SourcePage = ({ id }: SourcePageProps) => {
  return <SourceCell id={id} />
}

export default SourcePage
