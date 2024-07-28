import React, {useState, useEffect} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation, NavigationProp, useRoute, useFocusEffect} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient'
import {RootStackParamList} from '../Infra/Navigation'

interface BottomNavigationProps
{
    backgroundColor?: string
    selectedItem?: keyof RootStackParamList
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({backgroundColor = '#F5F5F7', selectedItem = 'LandingPage'}) =>
{
    const [selected, setSelected] = useState<keyof RootStackParamList>(selectedItem)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const route = useRoute()

    useFocusEffect(
        React.useCallback(() =>
        {
            setSelected(route.name as keyof RootStackParamList)
            setIsLoading(false)
        }, [route])
    )

    const handlePress = (name: keyof RootStackParamList) =>
    {
        setSelected(name)
        setIsLoading(true)
        navigation.navigate(name)
    }

    return (
        <LinearGradient colors={['#E8E8E8', '#F5F5F7']} style={styles.container}>
            <NavItem
                name="Home"
                icon="home-outline"
                isSelected={selected === 'LandingPage'}
                isLoading={isLoading && selected === 'LandingPage'}
                onPress={() => handlePress('LandingPage')}
            />
            <NavItem
                name="Referendums"
                icon="list-circle-outline"
                isSelected={selected === 'Referendums'}
                isLoading={isLoading && selected === 'Referendums'}
                onPress={() => handlePress('Referendums')}
            />
            <NavItem
                name="Profile"
                icon="person-circle-outline"
                isSelected={selected === 'Profile'}
                isLoading={isLoading && selected === 'Profile'}
                onPress={() => handlePress('Profile')}
            />
        </LinearGradient>
    )
}

interface NavItemProps
{
    name: string
    icon: keyof typeof Ionicons.glyphMap
    isSelected: boolean
    isLoading: boolean
    onPress: () => void
}

const NavItem: React.FC<NavItemProps> = ({name, icon, isSelected, isLoading, onPress}) => (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress} disabled={isLoading}>
        {isLoading ? (
            <ActivityIndicator size="small" color="#007AFF" />
        ) : (
            <>
                <Ionicons name={icon} size={28} color={isSelected ? "#FF9500" : "#007AFF"} />
                <Text style={[styles.label, isSelected && styles.selectedLabel]}>{name}</Text>
            </>
        )}
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 70,
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 15,
        margin: 10,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    label: {
        color: '#007AFF',
        fontSize: 12,
        marginTop: 4,
    },
    selectedLabel: {
        color: '#FF9500',
        fontWeight: 'bold',
    },
})

export default BottomNavigation