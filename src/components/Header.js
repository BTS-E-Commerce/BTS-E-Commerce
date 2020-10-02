import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../api/users';

import './Header.css';

const Header = ({ currentUser, setCurrentUser }) => {
  const logOutUser = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    setCurrentUser({ id: 1, username: 'guest' });
  };

  async function testStuff(event) {
    event.preventDefault();
    console.log('click is working on test button');

    const logAllUsers = await getAllUsers();
    console.log(logAllUsers);
  }

  return (
    <div id='Header'>
      {currentUser.username === 'guest' ? (
        <>
          <NavLink className='homeNav' to='/'>
            <img
              src='https://lh3.googleusercontent.com/BkrxiZgiRXyjVizuYqsVkC6mrPe5tnUGJo5E4lLe2F74JWJkfcyMThP8DTsAmlD1s8BLF7W2zKXrF93RzMoGC8WjpfPiKTpyX2sML1Z4q2DZ9JSr3h3-_KXc2KaIKt5cjN4X8gjPkbLf1UkRHTzAAIZfG8Vf8cZcr3m1ztb9HQhR63Bril0QA-MITbSbdRTm5KFubLoTub1_X4cEpb6GM_hmbmBjHwVI1J8JydrkHjorwuUnLJM5LsSwX3J18QdrsZLqO9DICHyuM8pK18vTesuW-wJg_pEpJVk4dofaLHivWGs0AJbHSzX-QsvAiSb6LQGV7-GR__o_zw7T0caLo2QGvsJVRVBP0Q_Z_D6ezptDsRIqu83h6aqT57mTVyLLxah77FaJcm09VG1YsIMxHB_pZ4S7DpGPqgGqPL9DuObs2hOBSCqMdR1GzIWKJzAW-z-1hxClOTMXRgBGOOW2P38HdcInQxYOcp3RWDDGKQV_TFymk3rWjzwFdF-Y_kc4o6njRugNcwhGeMkl0Qvfh14_-f9ZDMEjliIPpJDUP17WZmtMz2H1PABM4sa0wIKYHz1YGYZkBgu1UI5ZdVbA8PSOOldrHd43QhuZ3Mff8PYDkuEth5ZYPa1IvYylyvYIxY4FFw9b8Rp30o5OCwVt1s6930ozpYhYMWhXSJHPIwx1S0-8WwmkFEtSKC_K=w600-h120-no?authuser=0'
              alt="Grandma's Mac Logo"
            />
          </NavLink>
          <div className='navContainer'>
            <h2>
              Current User:
              <NavLink className='accountNav' to='/account'>
                {currentUser.username}
              </NavLink>
            </h2>
            <div className='navBar'>
              <NavLink className='homeNav' to='/'>
                HOME
              </NavLink>
              <NavLink className='accountNav' to='/account'>
                ACCOUNT
              </NavLink>
              <NavLink className='registerNav' to='/register'>
                REGISTER
              </NavLink>
              <NavLink className='loginNav' to='/login'>
                LOGIN{' '}
              </NavLink>
              <NavLink className='cartNav' to='/cart'>
                MY CART{' '}
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        <>
          <NavLink className='homeNav' to='/'>
            <img
              src='https://lh3.googleusercontent.com/BkrxiZgiRXyjVizuYqsVkC6mrPe5tnUGJo5E4lLe2F74JWJkfcyMThP8DTsAmlD1s8BLF7W2zKXrF93RzMoGC8WjpfPiKTpyX2sML1Z4q2DZ9JSr3h3-_KXc2KaIKt5cjN4X8gjPkbLf1UkRHTzAAIZfG8Vf8cZcr3m1ztb9HQhR63Bril0QA-MITbSbdRTm5KFubLoTub1_X4cEpb6GM_hmbmBjHwVI1J8JydrkHjorwuUnLJM5LsSwX3J18QdrsZLqO9DICHyuM8pK18vTesuW-wJg_pEpJVk4dofaLHivWGs0AJbHSzX-QsvAiSb6LQGV7-GR__o_zw7T0caLo2QGvsJVRVBP0Q_Z_D6ezptDsRIqu83h6aqT57mTVyLLxah77FaJcm09VG1YsIMxHB_pZ4S7DpGPqgGqPL9DuObs2hOBSCqMdR1GzIWKJzAW-z-1hxClOTMXRgBGOOW2P38HdcInQxYOcp3RWDDGKQV_TFymk3rWjzwFdF-Y_kc4o6njRugNcwhGeMkl0Qvfh14_-f9ZDMEjliIPpJDUP17WZmtMz2H1PABM4sa0wIKYHz1YGYZkBgu1UI5ZdVbA8PSOOldrHd43QhuZ3Mff8PYDkuEth5ZYPa1IvYylyvYIxY4FFw9b8Rp30o5OCwVt1s6930ozpYhYMWhXSJHPIwx1S0-8WwmkFEtSKC_K=w600-h120-no?authuser=0'
              alt="Grandma's Mac Logo"
            />
          </NavLink>
          <div className='navContainer'>
            <h2>Current User: {currentUser.username}</h2>
            <div className='navBar'>
              <NavLink className='homeNav' to='/'>
                HOME
              </NavLink>
              <NavLink className='accountNav' to='/account'>
                ACCOUNT
              </NavLink>
              <NavLink className='cartNav' to='/cart'>
                MY CART
              </NavLink>
              <button onClick={logOutUser}>Log Out</button>
              <button onClick={testStuff}>TEST JWT</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
