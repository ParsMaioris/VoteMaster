import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {getOwnedReferendums} from '../Redux/OwnerSlice'
import {VoterDetailRouteProp} from '../Infra/Navigation'
import {Ionicons} from '@expo/vector-icons'
import {addEligibility, checkEligibility, selectEligibility, selectEligibilityError, selectEligibilityStatus} from '../Redux/EligibilitySlice'
import * as Animatable from 'react-native-animatable'
import useReferendumHelper from '../Hooks/useReferendumHelper'
import {referendums} from '../Mocks/MockReferendums'
import {ref} from 'yup'

const VoterDetailScreen: React.FC<VoterDetailRouteProp> = ({route}) =>
{
    const {id, name} = route.params
    const voter = {id, name}
    const dispatch = useDispatch<AppDispatch>()
    const ownerId = useSelector((state: RootState) => state.user.id)
    const allReferendumMap = referendums

    const [invitedReferendums, setInvitedReferendums] = useState<string[]>([])
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [eligibilityMap, setEligibilityMap] = useState<{[key: string]: boolean}>({})
    const eligibilityStatus = useSelector((state: RootState) => state.eligibility.status)
    const eligibilityError = useSelector((state: RootState) => state.eligibility.error)
    const ownedReferendums = useReferendumHelper()

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() =>
    {
        const fetchOwnedReferendums = async () =>
        {
            setIsLoading(true)
            await dispatch(getOwnedReferendums(ownerId))

            setIsLoading(false)
        }

        fetchOwnedReferendums()
    }, [dispatch, ownerId, voter.id])

    const handleInvite = (referendumId: string) =>
    {
        dispatch(addEligibility({
            userId: voter.id,
            userName: voter.name,
            referendumId: referendumId,
            referendumTitle: referendums.find(referendum => referendum.id === referendumId)?.title || '',
        }))
        setInvitedReferendums([...invitedReferendums, referendumId])
        setSuccessMessage(`${voter.name} has been successfully invited to ${referendums.find(referendum => referendum.id === referendumId)?.title}`)
        setTimeout(() => setSuccessMessage(null), 3000)
    }

    if (isLoading || eligibilityStatus === 'loading')
    {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }

    if (eligibilityError)
    {
        return <Text style={styles.errorText}>{eligibilityError}</Text>
    }


    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInDown" duration={1000} style={styles.contentContainer}>
                <Text style={styles.headerText}>Add {voter.name} to a Referendum</Text>
                {successMessage && (
                    <Animatable.View animation="fadeIn" duration={600} style={styles.successContainer}>
                        <Text style={styles.successText}>{successMessage}</Text>
                    </Animatable.View>
                )}
                <FlatList
                    data={ownedReferendums}
                    keyExtractor={(item) => item.id}
                    renderItem={({item, index}) =>
                    {
                        const isEligible = eligibilityMap[`${voter.id}-${item.id}`]
                        return (
                            <Animatable.View animation="fadeInUp" duration={800} delay={index * 100} style={styles.referendumContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.referendumButton,
                                        (invitedReferendums.includes(item.id) || isEligible) && styles.invitedContainer
                                    ]}
                                    onPress={() => handleInvite(item.id)}
                                    disabled={invitedReferendums.includes(item.id) || isEligible}
                                >
                                    <View style={styles.referendumInfo}>
                                        <Ionicons name="document-text-outline" size={24} color="#007AFF" />
                                        <Text style={styles.referendumText}>{item.title}</Text>
                                    </View>
                                    <Ionicons
                                        name={(invitedReferendums.includes(item.id) || isEligible) ? "checkmark-circle-outline" : "add-circle-outline"}
                                        size={24}
                                        color={(invitedReferendums.includes(item.id) || isEligible) ? "#4CAF50" : "#007AFF"}
                                    />
                                </TouchableOpacity>
                            </Animatable.View>
                        )
                    }}
                />
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1D1D1F',
        marginBottom: 20,
        textAlign: 'center',
    },
    successContainer: {
        backgroundColor: '#DFF2BF',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    successText: {
        fontSize: 16,
        color: '#4CAF50',
        textAlign: 'center',
    },
    referendumContainer: {
        marginBottom: 15,
    },
    referendumButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    invitedContainer: {
        backgroundColor: '#E0F7FA',
    },
    referendumInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    referendumText: {
        fontSize: 18,
        color: '#1D1D1F',
        marginLeft: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#1D1D1F',
    },
})

export default VoterDetailScreen