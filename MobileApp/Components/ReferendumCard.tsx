import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native'
import * as Animatable from 'react-native-animatable'
import {Referendum} from '../Redux/ReferendumSlice'

type Props = {
    item: Referendum
    index: number
    isEligible: boolean
    status: string
    handleOpenModal: (referendum: Referendum) => void
    handleVote: (id: string) => void
    handleLearnMore: (id: string) => void
}

const ReferendumCard: React.FC<Props> = ({item, index, isEligible, status, handleOpenModal, handleVote, handleLearnMore}) =>
{
    const isExpired = new Date(item.endTime!) < new Date()

    const getTimeRemaining = (endTime: string) =>
    {
        const total = Date.parse(endTime) - Date.now()
        if (total <= 0) return 'Expired'

        const days = Math.floor(total / (1000 * 60 * 60 * 24))
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((total / 1000 / 60) % 60)

        if (days > 0)
        {
            return `${days}d`
        }
        return `${hours}h ${minutes}m`
    }

    return (
        <Animatable.View animation="fadeInUp" duration={800} delay={index * 100} style={styles.card}>
            <TouchableOpacity onPress={() => handleOpenModal(item)} style={styles.cardContent}>
                <Animatable.Image
                    animation="fadeIn"
                    delay={index * 200}
                    source={typeof item.image === 'string' ? {uri: item.image} : item.image}
                    style={styles.image}
                />
                <Animatable.Text animation="fadeIn" delay={index * 300} style={styles.title}>
                    {item.title}
                </Animatable.Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                {status === 'loading' ? (
                    <ActivityIndicator size="small" color="#007AFF" />
                ) : (
                    <>
                        {!isExpired && isEligible && (
                            <Animatable.View animation="fadeIn" delay={index * 500} style={styles.buttonWrapper}>
                                <TouchableOpacity style={styles.voteButton} onPress={() => handleVote(item.referendumId)}>
                                    <Text style={styles.buttonText}>Vote</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        )}
                        {isExpired && (
                            <Animatable.View animation="fadeIn" delay={index * 500} style={styles.buttonWrapper}>
                                <TouchableOpacity style={styles.promptButton} onPress={() => handleVote(item.referendumId)}>
                                    <Text style={styles.buttonText}>Results</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        )}
                        <Animatable.View animation="fadeIn" delay={index * 600} style={styles.buttonWrapper}>
                            <TouchableOpacity style={styles.learnButton} onPress={() => handleLearnMore(item.referendumId)}>
                                <Text style={styles.buttonText}>Info</Text>
                            </TouchableOpacity>
                        </Animatable.View>
                    </>
                )}
            </View>
            {!isExpired && (
                <Animatable.Text animation="fadeIn" delay={index * 700} style={styles.expirationText}>
                    Ends in: {getTimeRemaining(item.endTime!)}
                </Animatable.Text>
            )}
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
    },
    cardContent: {
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 15,
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 10,
        textAlign: 'center',
        overflow: 'hidden',
    },
    expirationText: {
        fontSize: 14,
        color: '#4682B4',
        marginTop: 10,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    voteButton: {
        backgroundColor: '#004AAD',
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#004AAD',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    promptButton: {
        backgroundColor: '#004AAD',
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#004AAD',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    learnButton: {
        backgroundColor: '#70757A',
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#70757A',
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
})

export default ReferendumCard