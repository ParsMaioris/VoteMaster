import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {submitReferendumRequest} from '../Redux/ReferendumRequestSlice'
import {format, addDays, isBefore} from 'date-fns'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../Infra/Navigation'

const useProposeReferendumForm = () =>
{
    const [openStartDate, setOpenStartDate] = useState(false)
    const [openEndDate, setOpenEndDate] = useState(false)
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const userId = useSelector((state: RootState) => state.user.id)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    const handleSubmit = async (values: any) =>
    {
        const resultAction = await dispatch(submitReferendumRequest({
            userId,
            question: values.question,
            details: values.details,
            referendumStartDate: values.startDate,
            referendumEndDate: values.endDate,
            referendumDate: values.endDate,
        }))

        if (submitReferendumRequest.fulfilled.match(resultAction))
        {
            setSnackbarMessage('Referendum request submitted successfully!')
            setSnackbarVisible(true)

            setTimeout(() =>
            {
                setSnackbarVisible(false)
                navigation.navigate('LandingPage')
            }, 2000)
        } else
        {
            setSnackbarMessage('Failed to submit referendum request.')
            setSnackbarVisible(true)
        }
    }

    const onDismiss = () =>
    {
        setOpenStartDate(false)
        setOpenEndDate(false)
    }

    const onConfirmStartDate = (params: {date: Date}) =>
    {
        setOpenStartDate(false)
        setStartDate(params.date)
    }

    const onConfirmEndDate = (params: {date: Date}) =>
    {
        setOpenEndDate(false)
        setEndDate(params.date)
    }

    const filterDate = (date: Date) =>
    {
        const today = new Date()
        const minDate = addDays(today, 7)
        return !isBefore(date, minDate)
    }

    return {
        openStartDate,
        openEndDate,
        startDate,
        endDate,
        snackbarVisible,
        snackbarMessage,
        setOpenStartDate,
        setOpenEndDate,
        handleSubmit,
        onDismiss,
        onConfirmStartDate,
        onConfirmEndDate,
        filterDate,
        setSnackbarVisible,
    }
}

export default useProposeReferendumForm