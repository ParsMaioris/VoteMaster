import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {format, addDays, isBefore} from 'date-fns'
import {AppDispatch, RootState} from '../Redux/Store'
import {submitReferendumRequest} from '../Redux/ReferendumRequestSlice'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../Infra/Navigation'

const useProposeReferendumForm = () =>
{
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
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
            referendumDate: values.date,
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
        setOpen(false)
    }

    const onConfirm = (params: {date: Date}, setFieldValue: (field: string, value: any) => void) =>
    {
        setOpen(false)
        setDate(params.date)
        setFieldValue('date', format(params.date, 'yyyy-MM-dd'))
    }

    const filterDate = (date: Date) =>
    {
        const today = new Date()
        const minDate = addDays(today, 7)
        return !isBefore(date, minDate)
    }

    return {
        open,
        date,
        snackbarVisible,
        snackbarMessage,
        setOpen,
        handleSubmit,
        onDismiss,
        onConfirm,
        filterDate,
        setSnackbarVisible
    }
}

export default useProposeReferendumForm