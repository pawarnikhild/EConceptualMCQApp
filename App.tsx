import React, { useState } from 'react'
import AuthContext from './src/context/AuthContext';

import StackNavigation from './src/routes/StackNavigation';

const App = () => {
  const [token, setToken] = useState('');
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}>
      <StackNavigation />
    </AuthContext.Provider>
  );
};

export default App;
