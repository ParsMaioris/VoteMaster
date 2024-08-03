import * as React from 'react'
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {DatePickerModal, en, registerTranslation} from 'react-native-paper-dates'
import {addDays} from 'date-fns'
import {format} from 'date-fns'
import {enUS} from 'date-fns/locale'

registerTranslation('en', en)

const DatePickerField = ({date, open, setOpen, onConfirm, filterDate}: any) =>
{
    return (
        <>
            <TouchableOpacity style={[styles.button, styles.dateButton]} onPress={() => setOpen(true)}>
                <Ionicons name="calendar-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>{date ? format(date, 'PPP', {locale: enUS}) : 'Select Date'}</Text>
            </TouchableOpacity>
            <DatePickerModal
                mode="single"
                visible={open}
                onDismiss={() => setOpen(false)}
                date={date}
                locale={'en'}
                onConfirm={onConfirm}
                validRange={{startDate: addDays(new Date(), 7)}}
            />
        </>
    )
}

const styles = StyleSheet.create({
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
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#ffffff',
        fontWeight: '600',
    },
})

export default DatePickerField