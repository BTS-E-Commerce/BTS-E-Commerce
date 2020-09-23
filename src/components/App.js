import React from 'react';

import Content from './Content.js';
import Register from './Register';
import Login from './Login';

const App = () => {
  return (
    <div className='App'>
      <h1>Hello, World!</h1>
      <Content />
      <Register />
      <Login />
    </div>
  );
};

export default App;
