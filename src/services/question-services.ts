import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';

export const fetchQuestionsService = async (token: string) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.get(`${BASE_URL}/questions`, options);
    console.log('Question api call succeeded!');
    // console.log('response in service', JSON.stringify(response))
    // console.log('response.data in service',response.data)
    return response.data;
  } catch (error) {
    console.log('Question api call failed!', error);
    // console.log('stringify error', JSON.stringify(error))
    // console.log('error', error)
    let errorMessage = 'An unexpected error occurred';
    if (axios.isAxiosError(error)) {
      errorMessage = error.message || errorMessage;
    }
    return errorMessage;
  }
};
