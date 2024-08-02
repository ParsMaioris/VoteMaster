import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../Redux/Store'
import {fetchUsers} from '../Redux/UserSlice'
import {NavigationProp, useNavigation} from '@react-navigation/native'
import {RootStackParamList} from '../Infra/Navigation'
import {Ionicons} from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import SearchBar from '../Components/SearchBar'

const VotersScreen: React.FC = () =>
{
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const dispatch = useDispatch<AppDispatch>()
  const {users, status, error} = useSelector((state: RootState) => state.user)
  const userId = useSelector((state: RootState) => state.user.id)
  const voters = users.filter((user) => user.id !== userId) as {id: string; name: string; avatar?: string}[]

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      try
      {
        await dispatch(fetchUsers()).unwrap()
      } catch (err)
      {
        console.error('Failed to fetch users:', err)
      }
    }
    fetchData()
  }, [dispatch])

  const onSelectUser = (user: any) =>
  {
    navigation.navigate('VoterDetail', {id: user.id, name: user.name})
  }

  const getLast12Digits = (guid: string) => guid.slice(-12)

  const filteredVoters = voters
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((voter) =>
      voter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLast12Digits(voter.id).includes(searchQuery)
    )

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

  if (status === 'failed' && error)
  {
    return <Text style={styles.errorText}>{error}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Participants</Text>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FlatList
        data={filteredVoters}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => (
          <Animatable.View animation="fadeInUp" duration={800} delay={index * 100}>
            <TouchableOpacity style={styles.userContainer} onPress={() => onSelectUser(item)}>
              <View style={styles.userInfo}>
                {item.avatar ? (
                  <Image source={{uri: item.avatar}} style={styles.avatar} />
                ) : (
                  <Ionicons name="person-circle-outline" size={40} color={getColor(index)} />
                )}
                <View style={styles.userDetails}>
                  <Text style={styles.userText}>{item.name}</Text>
                  <Text style={styles.userIdText}>{getLast12Digits(item.id)}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
            </TouchableOpacity>
          </Animatable.View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F7',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userDetails: {
    marginLeft: 12,
  },
  userText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  userIdText: {
    fontSize: 14,
    color: '#8E8E93',
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
    color: '#8E8E93',
  },
})

export default VotersScreen