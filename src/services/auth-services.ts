import axios from "axios";

const BASE_URL = 'https://econceptual-interview-mock.vercel.app/api';

export const loginService = async (email: string, password: string) => {
  try {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      email,
      password,
    };
    const response = await axios.post(`${BASE_URL}/login`, body, options);
    console.log('Login api call succeeded!')
    // console.log('response in service', JSON.stringify(response));
    // console.log('response.data in service', response.data);
    return response.data
  } catch (error) {
    console.log('Login api call failed!', error)
    // console.log('stringify error', JSON.stringify(error))
    // console.log('error', error)
    let errorMessage = 'An unexpected error occurred';
    if (axios.isAxiosError(error)) {
      errorMessage = error.message || errorMessage
    }
    return errorMessage
  }
};
