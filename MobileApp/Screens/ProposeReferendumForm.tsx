import * as React from 'react'
import {ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert} from 'react-native'
import {TextInput, useTheme} from 'react-native-paper'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {DatePickerModal} from 'react-native-paper-dates'
import {Provider as PaperProvider} from 'react-native-paper'
import {format} from 'date-fns'
import {enUS} from 'date-fns/locale'
import {LinearGradient} from 'expo-linear-gradient'
import {Ionicons} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

import {registerTranslation, en} from 'react-native-paper-dates'
registerTranslation('en', en)

const validationSchema = Yup.object().shape({
    question: Yup.string().required('Referendum question is required'),
    details: Yup.string().required('Details are required'),
    date: Yup.string().required('Date is required'),
})

const ProposeReferendumForm: React.FC = () =>
{
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    const handleSubmit = (values: any) =>
    {
        Alert.alert(
            'Under Development',
            'This feature is under development. Please come back later. You are about to shape your future with confidence and clarity.',
            [{text: 'OK'}]
        )
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

    return (
        <PaperProvider>
            <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Animatable.Text animation="fadeInDown" style={styles.headerText}>Propose a New Referendum</Animatable.Text>
                    <Animatable.Text animation="fadeInDown" delay={200} style={styles.pitchText}>Voice Your Vision</Animatable.Text>
                    <Formik
                        initialValues={{question: '', details: '', date: ''}}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched}) => (
                            <View style={styles.formContainer}>
                                <Animatable.View animation="fadeInUp" delay={400}>
                                    <TextInput
                                        label="Referendum Question"
                                        mode="outlined"
                                        multiline
                                        numberOfLines={4}
                                        onChangeText={handleChange('question')}
                                        onBlur={handleBlur('question')}
                                        value={values.question}
                                        style={[styles.input, touched.question && errors.question ? styles.errorInput : null]}
                                        error={touched.question && errors.question ? true : false}
                                        theme={{
                                            colors: {
                                                primary: '#007AFF',
                                                underlineColor: 'transparent',
                                            },
                                        }}
                                    />
                                    {touched.question && errors.question && <Text style={styles.error}>{errors.question}</Text>}
                                </Animatable.View>

                                <Animatable.View animation="fadeInUp" delay={600}>
                                    <TextInput
                                        label="Details"
                                        mode="outlined"
                                        multiline
                                        numberOfLines={6}
                                        onChangeText={handleChange('details')}
                                        onBlur={handleBlur('details')}
                                        value={values.details}
                                        style={[styles.input, touched.details && errors.details ? styles.errorInput : null]}
                                        error={touched.details && errors.details ? true : false}
                                        theme={{
                                            colors: {
                                                primary: '#007AFF', // Apple blue color
                                                underlineColor: 'transparent',
                                            },
                                        }}
                                    />
                                    {touched.details && errors.details && <Text style={styles.error}>{errors.details}</Text>}
                                </Animatable.View>

                                <Animatable.View animation="fadeInUp" delay={800}>
                                    <TouchableOpacity style={[styles.button, styles.dateButton]} onPress={() => setOpen(true)}>
                                        <Ionicons name="calendar-outline" size={24} color="#fff" />
                                        <Text style={styles.buttonText}>{date ? format(date, 'PPP', {locale: enUS}) : 'Select Date'}</Text>
                                    </TouchableOpacity>
                                    <DatePickerModal
                                        mode="single"
                                        visible={open}
                                        onDismiss={onDismiss}
                                        date={date}
                                        locale={'en'}
                                        onConfirm={(params) => onConfirm(params, setFieldValue)}
                                    />
                                    {touched.date && errors.date && <Text style={styles.error}>{errors.date}</Text>}
                                </Animatable.View>

                                <Animatable.View animation="fadeInUp" delay={1000}>
                                    <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit as any}>
                                        <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
                                        <Text style={styles.buttonText}>Submit</Text>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
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
        fontSize: 18,
        fontWeight: '300',
        color: '#0056b3',
        textAlign: 'center',
        marginBottom: 30,
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    errorInput: {
        borderColor: 'red',
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
    dateButton: {
        backgroundColor: '#007AFF',
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
    error: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5,
        textAlign: 'center',
        width: '100%',
    },
})

export default ProposeReferendumForm