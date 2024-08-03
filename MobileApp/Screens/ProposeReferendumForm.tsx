import * as React from 'react'
import {ScrollView, StyleSheet, View, Text} from 'react-native'
import {useTheme, Snackbar, Provider as PaperProvider, Button} from 'react-native-paper'
import {Formik, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {LinearGradient} from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import useProposeReferendumForm from '../Hooks/useProposeReferendumForm'
import FormInputField from '../Components/FormInputField'
import DatePickerField from '../Components/DatePickerField'
import {format, differenceInDays} from 'date-fns'

interface FormValues
{
    question: string
    details: string
    startDate: string
    endDate: string
}

const validationSchema = Yup.object().shape({
    question: Yup.string().required('Referendum question is required'),
    details: Yup.string().required('Details are required'),
    startDate: Yup.date().required('Start date is required').typeError('Invalid date format'),
    endDate: Yup.date()
        .required('End date is required')
        .typeError('Invalid date format')
        .min(Yup.ref('startDate'), 'End date cannot be before start date')
        .test('maxDuration', 'Referendum duration cannot exceed 10 days', function (value)
        {
            const {startDate} = this.parent
            return !startDate || !value || differenceInDays(new Date(value), new Date(startDate)) <= 10
        }),
})

const ProposeReferendumForm: React.FC = () =>
{
    const theme = useTheme()
    const {
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
        setSnackbarVisible
    } = useProposeReferendumForm()

    return (
        <PaperProvider>
            <LinearGradient colors={['#FFFFFF', '#F8F8F8']} style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Animatable.Text animation="fadeInDown" style={styles.headerText}>Propose a New Referendum</Animatable.Text>
                    <Animatable.Text animation="fadeInDown" delay={200} style={styles.pitchText}>Voice Your Vision</Animatable.Text>
                    <Text style={styles.infoText}>
                        Please allow up to five days for the review. Once approved, you will be notified by email, after which you may invite users to participate.
                    </Text>
                    <Formik
                        initialValues={{question: '', details: '', startDate: '', endDate: ''}}
                        validationSchema={validationSchema}
                        onSubmit={(values: FormValues, {setSubmitting}: FormikHelpers<FormValues>) =>
                        {
                            handleSubmit({
                                ...values,
                                startDate: format(new Date(values.startDate), 'yyyy-MM-dd'),
                                endDate: format(new Date(values.endDate), 'yyyy-MM-dd'),
                            })
                            setSubmitting(false)
                        }}
                    >
                        {({handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched}) => (
                            <View style={styles.formContainer}>
                                <FormInputField
                                    label="Referendum Question"
                                    value={values.question}
                                    onChangeText={handleChange('question')}
                                    onBlur={handleBlur('question')}
                                    error={errors.question}
                                    touched={touched.question}
                                    multiline
                                    numberOfLines={4}
                                />
                                <FormInputField
                                    label="Details"
                                    value={values.details}
                                    onChangeText={handleChange('details')}
                                    onBlur={handleBlur('details')}
                                    error={errors.details}
                                    touched={touched.details}
                                    multiline
                                    numberOfLines={6}
                                />
                                <View style={styles.datePickersContainer}>
                                    <View style={styles.datePickerWrapper}>
                                        <DatePickerField
                                            label="Start Date"
                                            date={values.startDate}
                                            open={openStartDate}
                                            setOpen={setOpenStartDate}
                                            onConfirm={(params: {date: Date}) =>
                                            {
                                                setFieldValue('startDate', params.date)
                                                onConfirmStartDate(params)
                                            }}
                                            filterDate={filterDate}
                                            style={styles.startDatePicker}
                                        />
                                        {touched.startDate && errors.startDate && <Text style={styles.error}>{errors.startDate}</Text>}
                                    </View>
                                    <View style={styles.datePickerWrapper}>
                                        <DatePickerField
                                            label="End Date"
                                            date={values.endDate}
                                            open={openEndDate}
                                            setOpen={setOpenEndDate}
                                            onConfirm={(params: {date: Date}) =>
                                            {
                                                setFieldValue('endDate', params.date)
                                                onConfirmEndDate(params)
                                            }}
                                            filterDate={filterDate}
                                            style={styles.endDatePicker}
                                        />
                                        {touched.endDate && errors.endDate && <Text style={styles.error}>{errors.endDate}</Text>}
                                    </View>
                                </View>
                                <Animatable.View animation="fadeInUp" delay={1000}>
                                    <Button mode="contained" style={styles.submitButton} onPress={handleSubmit}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </Button>
                                </Animatable.View>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={3000}
                    style={styles.snackbar}
                >
                    {snackbarMessage}
                </Snackbar>
            </LinearGradient>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 20,
    },
    pitchText: {
        fontSize: 20,
        fontWeight: '400',
        color: '#007AFF',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    infoText: {
        fontSize: 14,
        fontWeight: '300',
        color: '#666666',
        textAlign: 'center',
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    datePickersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    datePickerWrapper: {
        flex: 1,
    },
    startDatePicker: {
        marginRight: 5,
    },
    endDatePicker: {
        marginLeft: 5,
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
        textAlign: 'center',
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#34C759',
        marginVertical: 20,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
    },
    snackbar: {
        backgroundColor: '#333333',
    },
})

export default ProposeReferendumForm