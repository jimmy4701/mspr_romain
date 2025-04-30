import EditPandemicStatCell from 'src/components/PandemicStat/EditPandemicStatCell'

type PandemicStatPageProps = {
  id: number
}

const EditPandemicStatPage = ({ id }: PandemicStatPageProps) => {
  return <EditPandemicStatCell id={id} />
}

export default EditPandemicStatPage
