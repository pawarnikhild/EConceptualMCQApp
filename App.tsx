import React, { useState } from 'react'
import { Provider } from 'react-redux';

import { store } from './src/redux-toolkit/store';

import StackNavigation from './src/routes/StackNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
};

export default App;
