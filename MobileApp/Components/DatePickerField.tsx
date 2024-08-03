import * as React from 'react'
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {DatePickerModal, en, registerTranslation} from 'react-native-paper-dates'
import {addDays, format} from 'date-fns'
import {enUS} from 'date-fns/locale'

registerTranslation('en', en)

const DatePickerField = ({date, open, setOpen, onConfirm, filterDate, label, style}: any) =>
{
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
                <Ionicons name="calendar-outline" size={24} color="#fff" />
                <Text style={styles.buttonText}>{date ? format(date, 'MMMM dd', {locale: enUS}) : label}</Text>
            </TouchableOpacity>
            <DatePickerModal
                mode="single"
                visible={open}
                onDismiss={() => setOpen(false)}
                date={date}
                locale={'en'}
                onConfirm={onConfirm}
                validRange={{startDate: addDays(new Date(), 7)}}  // Setting the valid range for date selection
                animationType="slide"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#007AFF',
        width: '100%',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#ffffff',
        fontWeight: '600',
    },
})

export default DatePickerField