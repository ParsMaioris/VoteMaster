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
        <LinearGradient colors={['#007BFF', '#006FDD']} style={styles.container}>
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
            <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
            <>
                <Ionicons name={icon} size={28} color="#FFFFFF" style={isSelected && styles.selectedIcon} />
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
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 20,
        margin: 10,
        backgroundColor: '#007BFF',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 4,
    },
    selectedLabel: {
        fontWeight: 'bold',
        color: '#FFD700',
    },
    selectedIcon: {
        fontWeight: 'bold',
        color: '#FFD700',
    },
})

export default BottomNavigation