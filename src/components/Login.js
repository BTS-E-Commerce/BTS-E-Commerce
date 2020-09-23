import React from 'react';

const Login = () => {
  //

  return (
    <form>
      <h1>Login Here:</h1>
      <div>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' placeholder='username' />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='text' name='password' placeholder='password' />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
