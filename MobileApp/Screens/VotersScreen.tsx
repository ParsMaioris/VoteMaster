import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {fetchUsers} from '../Redux/UserSlice'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../Infra/Navigation'
import {Ionicons} from '@expo/vector-icons'
import SearchBar from '../Components/SearchBar'

const VotersScreen: React.FC = () =>
{
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const dispatch = useDispatch<AppDispatch>()
  const {users, status, error} = useSelector((state: RootState) => state.user)
  const userId = useSelector((state: RootState) => state.user.id)
  const voters = users.filter((user) => user.id !== userId) as {id: string; name: string}[]

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() =>
  {
    dispatch(fetchUsers())
  }, [dispatch])

  const onSelectUser = (user: any) =>
  {
    navigation.navigate('VoterDetail', {id: user.id, name: user.name})
  }

  const filteredVoters = voters
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((voter) => voter.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const colors = [
    '#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF3B30',
    '#5856D6', '#FFCC00', '#FF2D55', '#5AC8FA', '#4CD964',
    '#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF',
    '#5856D6', '#AF52DE', '#FF2D55', '#5AC8FA', '#4CD964'
  ]

  const getColor = (index: number) => colors[index % colors.length]

  if (status === 'loading')
  {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  if (error)
  {
    return <Text style={styles.errorText}>{error}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Participants</Text>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={filteredVoters}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => (
          <TouchableOpacity style={styles.userContainer} onPress={() => onSelectUser(item)}>
            <View style={styles.userInfo}>
              <Ionicons name="person-circle-outline" size={40} color={getColor(index)} />
              <Text style={styles.userText}>{item.name}</Text>
            </View>
            <Ionicons name="arrow-forward-circle-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 20,
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
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

export default VotersScreen