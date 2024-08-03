import * as React from 'react'
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native'
import {useTheme, Snackbar, Provider as PaperProvider} from 'react-native-paper'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {LinearGradient} from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import {Ionicons} from '@expo/vector-icons'
import useProposeReferendumForm from '../Hooks/useProposeReferendumForm'
import FormInputField from '../Components/FormInputField'
import DatePickerField from '../Components/DatePickerField'

const validationSchema = Yup.object().shape({
    question: Yup.string().required('Referendum question is required'),
    details: Yup.string().required('Details are required'),
    date: Yup.string().required('Date is required')
})

const ProposeReferendumForm: React.FC = () =>
{
    const theme = useTheme()
    const {
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
    } = useProposeReferendumForm()

    return (
        <PaperProvider>
            <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Animatable.Text animation="fadeInDown" style={styles.headerText}>Propose a New Referendum</Animatable.Text>
                    <Animatable.Text animation="fadeInDown" delay={200} style={styles.pitchText}>Voice Your Vision</Animatable.Text>
                    <Text style={styles.infoText}>
                        Please allow up to five days for the review. Once approved, you will be notified by email, after which you may invite users to participate.
                    </Text>
                    <Formik
                        initialValues={{question: '', details: '', date: ''}}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
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
                                <DatePickerField
                                    date={date}
                                    open={open}
                                    setOpen={setOpen}
                                    onConfirm={(params: {date: Date}) => onConfirm(params, setFieldValue)}
                                    filterDate={filterDate}
                                />
                                {touched.date && errors.date && <Text style={styles.error}>{errors.date}</Text>}
                                <Animatable.View animation="fadeInUp" delay={200}>
                                    <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit as any}>
                                        <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </TouchableOpacity>
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
    error: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5,
        textAlign: 'center',
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginVertical: 12,
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.9,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    submitButton: {
        backgroundColor: '#34C759',
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
    },
    snackbar: {
        backgroundColor: '#333333',
    },
})

export default ProposeReferendumForm