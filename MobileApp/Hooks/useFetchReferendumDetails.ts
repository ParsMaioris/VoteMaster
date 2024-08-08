import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllReferendumDetails, selectReferendumStatus} from '../Redux/ReferendumSlice'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../Infra/Navigation'

const useFetchReferendumDetails = () =>
{
    const dispatch = useDispatch()
    const referendumStatus = useSelector(selectReferendumStatus)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    useEffect(() =>
    {
        if (referendumStatus !== 'succeeded')
        {
            dispatch(getAllReferendumDetails())
        }

        if (referendumStatus === 'failed')
        {
            navigation.navigate('ErrorScreen')
        }
    }, [])
}

export default useFetchReferendumDetails