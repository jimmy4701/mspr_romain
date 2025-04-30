import PandemicStatCell from 'src/components/PandemicStat/PandemicStatCell'

type PandemicStatPageProps = {
  id: number
}

const PandemicStatPage = ({ id }: PandemicStatPageProps) => {
  return <PandemicStatCell id={id} />
}

export default PandemicStatPage
