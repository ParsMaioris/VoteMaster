import {useSelector} from 'react-redux'
import {RootState} from '../Redux/Store'

const useReferendumHelper = () =>
{
  const referendums = useSelector((state: RootState) => state.referendum.referendums)
  const allReferendums = referendums
  const ownedReferendumIds = useSelector((state: RootState) => state.owner.ownedReferendumIds)
  const ownedReferendums = ownedReferendumIds.map(id => allReferendums.find(referendum => referendum.referendumId === id))

  return ownedReferendums
}

export default useReferendumHelper