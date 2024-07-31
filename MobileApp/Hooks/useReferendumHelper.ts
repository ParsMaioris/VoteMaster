import {useSelector} from 'react-redux'
import {RootState} from '../Redux/Store'
import {referendums} from '../Mocks/MockReferendums'

const useReferendumHelper = () =>
{
  const allReferendums = referendums
  const ownedReferendumIds = useSelector((state: RootState) => state.owner.ownedReferendumIds)
  const ownedReferendums = ownedReferendumIds.map(id => allReferendums.find(referendum => referendum.id === id))

  return ownedReferendums
}

export default useReferendumHelper