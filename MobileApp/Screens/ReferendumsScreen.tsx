import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import {useSelector} from 'react-redux'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import {RootState} from '../Redux/Store'
import {referendums as mockReferendums} from '../Mocks/MockReferendums'
import {Referendum} from '../DTOs/Referendums'
import {LinearGradient} from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import BottomNavigation from '../Components/BottomNavigation'
import useEligibilityCheck from '../Hooks/useEligibilityCheck'
import ReferendumModal from '../Components/ReferendumModal'
import useReferendumHandlers from '../Hooks/useReferendumHandlers'

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Referendums'>
}

const ReferendumsScreen: React.FC<Props> = ({navigation}) =>
{
    const userId = useSelector((state: RootState) => state.user.id)
    const userName = useSelector((state: RootState) => state.user.name)
    const {isEligibleForAny, loading, fetchError, status, eligibilityMap} = useEligibilityCheck(userId, userName)

    const {
        modalVisible,
        selectedReferendum,
        handleOpenModal,
        handleCloseModal,
        renderItem
    } = useReferendumHandlers(userId, eligibilityMap, status, navigation)

    const [activeReferendums, setActiveReferendums] = useState<Referendum[]>([])
    const [expiredReferendums, setExpiredReferendums] = useState<Referendum[]>([])

    useEffect(() =>
    {
        const today = new Date()
        const active: Referendum[] = []
        const expired: Referendum[] = []

        mockReferendums.forEach(referendum =>
        {
            if (referendum.endTime)
            {
                const endDate = new Date(referendum.endTime)
                if (endDate >= today)
                {
                    active.push(referendum)
                } else
                {
                    expired.push(referendum)
                }
            }
        })

        setActiveReferendums(active)
        setExpiredReferendums(expired)
    }, [])

    if (loading || status === 'loading')
    {
        return (
            <View style={styles.loadingContainer}>
                <View style={styles.loadingContent}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
                <View style={styles.bottomNavigationWrapper}>
                    <BottomNavigation />
                </View>
            </View>
        )
    }

    if (fetchError)
    {
        return (
            <View style={[styles.container, {flex: 1}]}>
                <Text style={[styles.errorText, {flexGrow: 1}]}>{fetchError}</Text>
                <View style={styles.bottomNavigationWrapper}>
                    <BottomNavigation />
                </View>
            </View>
        )
    }

    return (
        <LinearGradient colors={['#FFFAFA', '#F5F5F7']} style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading...</Text>
                    <View style={styles.bottomNavigationWrapper}>
                        <BottomNavigation />
                    </View>
                </View>
            ) : (
                <>
                    {isEligibleForAny ? (
                        <Animatable.View animation="fadeInDown" duration={1000} style={styles.contentContainer}>
                            <Text style={styles.sectionTitle}>Active Referendums</Text>
                            <FlatList
                                data={activeReferendums}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.listContainer}
                                numColumns={2}
                            />
                            {expiredReferendums.length > 0 && expiredReferendums.some(r => eligibilityMap[`${userId}-${r.id}`]) && (
                                <>
                                    <Text style={styles.sectionTitle}>Past Referendums</Text>
                                    <FlatList
                                        data={expiredReferendums}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.id}
                                        contentContainerStyle={styles.listContainer}
                                        numColumns={2}
                                    />
                                </>
                            )}
                        </Animatable.View>
                    ) : (
                        <Animatable.View animation="fadeInDown" duration={1000} style={styles.notEligibleContainer}>
                            <Text style={styles.notEligibleText}>It looks like there are no referendums available for you right now. Enjoy a well-deserved break and check back soon!</Text>
                        </Animatable.View>
                    )}
                </>
            )}
            {selectedReferendum && (
                <ReferendumModal
                    visible={modalVisible}
                    onClose={handleCloseModal}
                    referendum={selectedReferendum}
                />
            )}
            <View style={styles.bottomNavigationWrapper}>
                <BottomNavigation />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#F0F4F8',
    },
    bottomNavigationWrapper: {
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
    },
    contentContainer: {
        flex: 1,
        padding: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#1D1D1F',
    },
    notEligibleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    notEligibleText: {
        fontSize: 18,
        color: '#444',
        textAlign: 'center',
        paddingVertical: 20,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 40,
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
        marginVertical: 10,
        textAlign: 'center',
    },
})

export default ReferendumsScreen