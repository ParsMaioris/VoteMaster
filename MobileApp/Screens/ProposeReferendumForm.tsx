import * as React from 'react'
import
{
    StyleSheet,
    View,
    Text,
    Linking,
    TouchableOpacity,
    Platform,
    Keyboard,
} from 'react-native'
import {useTheme, Snackbar, Provider as PaperProvider, Button, TextInput} from 'react-native-paper'
import {Formik, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {LinearGradient} from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import useProposeReferendumForm from '../Hooks/useProposeReferendumForm'
import DatePickerField from '../Components/DatePickerField'
import {format, differenceInDays} from 'date-fns'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

interface FormValues
{
    question: string
    details: string
    startDate: string
    endDate: string
}

const validationSchema = Yup.object().shape({
    question: Yup.string()
        .max(150, 'Referendum question must be at most 150 characters')
        .required('Referendum question is required'),
    details: Yup.string()
        .max(1000, 'Details must be at most 1000 characters')
        .required('Details are required'),
    startDate: Yup.date()
        .required('Start date is required')
        .typeError('Invalid date format'),
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
                <KeyboardAwareScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps='always'>
                    <Animatable.Text animation="fadeInDown" style={styles.headerText}>Propose a New Referendum</Animatable.Text>
                    <Animatable.Text animation="fadeInDown" delay={200} style={styles.pitchText}>Voice Your Vision</Animatable.Text>
                    <Text style={styles.infoText}>
                        Feel free to propose a referendum. This helps us create more prototypes and mock referendums. The ability to take ownership and invite participants will be available in a future update.
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
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        label="Referendum Question"
                                        value={values.question}
                                        onChangeText={handleChange('question')}
                                        onBlur={handleBlur('question')}
                                        multiline
                                        numberOfLines={4}
                                        maxLength={150}
                                        scrollEnabled={false} // Disable scrolling
                                        textAlignVertical="top" // Align text to the top
                                        style={styles.textInput}
                                    />
                                    {touched.question && errors.question && <Text style={styles.error}>{errors.question}</Text>}
                                    <Text style={styles.characterCount}>{values.question.length}/150</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        label="Details"
                                        value={values.details}
                                        onChangeText={handleChange('details')}
                                        onBlur={handleBlur('details')}
                                        multiline
                                        numberOfLines={6}
                                        maxLength={1000}
                                        scrollEnabled={false} // Disable scrolling
                                        textAlignVertical="top" // Align text to the top
                                        style={styles.textInput}
                                    />
                                    {touched.details && errors.details && <Text style={styles.error}>{errors.details}</Text>}
                                    <Text style={styles.characterCount}>{values.details.length}/1000</Text>
                                </View>
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
                                <Animatable.View animation="fadeInUp" delay={500}>
                                    <Button mode="contained" style={styles.submitButton} onPress={handleSubmit}>
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </Button>
                                </Animatable.View>
                            </View>
                        )}
                    </Formik>
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>
                            For high-volume referendums, please contact us at{' '}
                            <TouchableOpacity onPress={() => Linking.openURL('https://directdemocracy.global')}>
                                <Text style={styles.footerLink}>Direct Democracy Corporation</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </KeyboardAwareScrollView>
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
    inputContainer: {
        width: '100%',
        marginBottom: 10,
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
    characterCount: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'right',
        width: '100%',
    },
    textInput: {
        backgroundColor: 'white',
    },
    submitButton: {
        backgroundColor: '#004AAD',
        marginVertical: 20,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#004AAD',
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
    footerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
    },
    footerLink: {
        marginTop: 3,
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
})

export default ProposeReferendumForm