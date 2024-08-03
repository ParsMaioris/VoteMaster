import * as React from 'react'
import {StyleSheet, Dimensions, Text} from 'react-native'
import {TextInput} from 'react-native-paper'
import * as Animatable from 'react-native-animatable'

const FormInputField = ({label, value, onChangeText, onBlur, error, touched, multiline = false, numberOfLines = 1}: any) =>
{
    return (
        <Animatable.View animation="fadeInUp">
            <TextInput
                label={label}
                mode="outlined"
                multiline={multiline}
                numberOfLines={numberOfLines}
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                style={[styles.input, touched && error ? styles.errorInput : null]}
                error={touched && error ? true : false}
                theme={{
                    colors: {
                        primary: '#007AFF',
                    },
                }}
            />
            {touched && error && <Text style={styles.error}>{error}</Text>}
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 0,
    },
    errorInput: {
        borderColor: 'red',
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5,
        textAlign: 'center',
        width: '100%',
    },
})

export default FormInputField