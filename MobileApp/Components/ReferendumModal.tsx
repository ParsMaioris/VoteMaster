import React, {useState} from 'react'
import {Modal, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator} from 'react-native'
import {Referendum} from '../Redux/ReferendumSlice'

type ReferendumModalProps = {
    visible: boolean
    onClose: () => void
    referendum: Referendum | null
}

const ReferendumModal: React.FC<ReferendumModalProps> = ({visible, onClose, referendum}) =>
{
    const [loading, setLoading] = useState(true)

    if (!referendum) return null

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{referendum.title}</Text>
                    <View style={styles.imageContainer}>
                        {loading && (
                            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
                        )}
                        <Image
                            source={typeof referendum.image === 'string' ? {uri: referendum.image} : referendum.image}
                            style={styles.modalImage}
                            onLoadEnd={() => setLoading(false)}
                        />
                    </View>
                    <Text style={styles.modalDescription}>{referendum.description}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 3,
        width: Dimensions.get('window').width * 0.8,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333333',
        marginBottom: 15,
        textAlign: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 200,
        borderRadius: 15,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        position: 'absolute',
        zIndex: 1,
    },
    modalImage: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    modalDescription: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666666',
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#2874A6',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 12,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
})

export default ReferendumModal