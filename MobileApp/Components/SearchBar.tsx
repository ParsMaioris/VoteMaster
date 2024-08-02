import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'

interface SearchBarProps
{
    searchQuery: string
    setSearchQuery: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({searchQuery, setSearchQuery}) =>
{
    return (
        <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#9E9E9E" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search by Name or ID"
                placeholderTextColor="#9E9E9E"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#1C1C1E',
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
    },
})

export default SearchBar