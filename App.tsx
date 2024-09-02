import React, { useState } from 'react'
import { Provider } from 'react-redux';

import AuthContext from './src/context/AuthContext';
import { store } from './src/redux-toolkit/store';

import StackNavigation from './src/routes/StackNavigation';

const App = () => {
  const [token, setToken] = useState('');
  return (
    <Provider store={store}>
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}>
      <StackNavigation />
    </AuthContext.Provider>
    </Provider>
  );
};

export default App;
