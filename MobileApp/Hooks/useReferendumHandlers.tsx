import {useState} from 'react'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {RootStackParamList} from '../Infra/Navigation'
import ReferendumCard from '../Components/ReferendumCard'
import {Referendum} from '../Redux/ReferendumSlice'

const useReferendumHandlers = (
    userId: string,
    eligibilityMap: Record<string, boolean>,
    status: string,
    navigation: NativeStackNavigationProp<RootStackParamList, 'Referendums'>
) =>
{
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedReferendum, setSelectedReferendum] = useState<Referendum | null>(null)

    const handleOpenModal = (referendum: Referendum) =>
    {
        setSelectedReferendum(referendum)
        setModalVisible(true)
    }

    const handleCloseModal = () =>
    {
        setModalVisible(false)
        setSelectedReferendum(null)
    }

    const handleVote = (id: string) =>
    {
        navigation.navigate('ReferendumPrompt', {referendumId: id})
    }

    const handleLearnMore = (id: string) =>
    {
        navigation.navigate('ReferendumDetail', {referendumId: id})
    }

    const renderItem = ({item, index}: {item: Referendum; index: number}) =>
    {
        const eligibilityKey = `${userId}-${item.referendumId}`
        const isEligible = eligibilityMap[eligibilityKey]

        if (!isEligible)
        {
            return null
        }

        return (
            <ReferendumCard
                item={item}
                index={index}
                isEligible={isEligible}
                status={status}
                handleOpenModal={handleOpenModal}
                handleVote={handleVote}
                handleLearnMore={handleLearnMore}
            />
        )
    }

    return {
        modalVisible,
        selectedReferendum,
        handleOpenModal,
        handleCloseModal,
        renderItem
    }
}

export default useReferendumHandlers