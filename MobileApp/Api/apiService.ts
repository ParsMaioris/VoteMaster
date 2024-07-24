import axios from 'axios'

const API_URL = 'https://vote-master-api.azurewebsites.net/api'

export const signInUser = async (userId: string) =>
{
  try
  {
    const response = await axios.get(`${API_URL}/user/${userId}`)
    return response.data
  } catch (error)
  {
    throw error
  }
}