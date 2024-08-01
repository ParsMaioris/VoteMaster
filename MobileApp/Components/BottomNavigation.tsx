import React, {useState, useCallback} from 'react'
import {View, TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useNavigation, useRoute, useFocusEffect, CommonActions} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient'
import {RootStackParamList} from '../Infra/Navigation'

interface BottomNavigationProps
{
    backgroundColor?: string
    selectedItem?: keyof RootStackParamList
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
    backgroundColor = '#F5F5F7',
    selectedItem = 'LandingPage',
}) =>
{
    const [selected, setSelected] = useState<keyof RootStackParamList>(selectedItem)
    const [isLoading, setIsLoading] = useState<keyof RootStackParamList | null>(null)
    const navigation = useNavigation()
    const route = useRoute()

    useFocusEffect(
        useCallback(() =>
        {
            setSelected(route.name as keyof RootStackParamList)
            setIsLoading(null)
        }, [route])
    )

    const handlePress = (name: keyof RootStackParamList) =>
    {
        if (name !== selected)
        {
            setSelected(name)
            setIsLoading(name)
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name}],
                })
            )
        }
    }

    const navItems = [
        {name: 'Home', icon: 'home-outline', routeName: 'LandingPage'},
        {name: 'Referendums', icon: 'list-circle-outline', routeName: 'Referendums'},
        {name: 'Profile', icon: 'person-circle-outline', routeName: 'Profile'},
    ]

    return (
        <LinearGradient colors={['#007BFF', '#006FDD']} style={styles.container}>
            {navItems.map((item) => (
                <NavItem
                    key={item.routeName}
                    name={item.name}
                    icon={item.icon}
                    isSelected={selected === item.routeName}
                    isLoading={isLoading === item.routeName}
                    onPress={() => handlePress(item.routeName)}
                />
            ))}
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
                <Ionicons name={icon} size={28} color={isSelected ? '#00FFFF' : '#FFFFFF'} style={isSelected && styles.selectedIcon} />
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
        color: '#00FFFF',
    },
    selectedIcon: {
        fontWeight: 'bold',
        color: '#00FFFF',
    },
})

export default BottomNavigation