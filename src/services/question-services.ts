import axios from 'axios';

const BASE_URL = 'https://econceptual-interview-mock.vercel.app/api';

export const fetchQuestions = async (token: string) => {
    try {
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }

        }
        const response = await axios.get(`${BASE_URL}/questions`, options);
        console.log('Question api call succeeded!')
        // console.log('response in service', JSON.stringify(response))
        // console.log('response.data in service',response.data)
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        console.log('Question api call failed!', error)
        // console.log('stringify error', JSON.stringify(error))
        // console.log('error', error)
        let errorMessage = 'An unexpected error occurred';
        if (axios.isAxiosError(error)) {
            errorMessage = error.message || errorMessage
        }
        return {
            success: false,
            error: errorMessage
        }
    }
};
