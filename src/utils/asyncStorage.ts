import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (value: string) => {
    try {
        await AsyncStorage.setItem('userToken', value);
        console.log('Stored user token in Async Storage')
    } catch (error) {
        console.log('Error in storing user token in Async Storage:', error);
    }
}

export const retrieveToken = async () => {
    try {
        console.log('Retrieving user token from Async Storage...');
        return await AsyncStorage.getItem('userToken');
    } catch (error) {
        console.log('Error in retrieving user token from Async Storage:', error);
    }
}

export const removeToken = async () => {
    try {
        console.log('Removed user token from Async Storage');
        await AsyncStorage.removeItem('userToken');
    } catch (error) {
        console.log('Error in removing user token from Async Storage:', error);
    }
}

