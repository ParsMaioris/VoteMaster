import {useSelector} from 'react-redux'
import {RootState} from '../Redux/Store'

const useReferendumHelper = () =>
{
  const allReferendums = useSelector((state: RootState) => state.referendum.referendumMap)
  const ownedReferendumIds = useSelector((state: RootState) => state.owner.ownedReferendumIds)
  const ownedReferendums = ownedReferendumIds.map(id => allReferendums[id])

  return ownedReferendums
}

export default useReferendumHelper