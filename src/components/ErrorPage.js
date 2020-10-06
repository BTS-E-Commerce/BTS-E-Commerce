//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import errorImgOne from './images/granmac4041.png'
import errorImgTwo from './images/granmac4042.png'

import './ErrorPage.css'

const ErrorPage = () => {
    const history = useHistory();
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ STATE ~~~~~~
    //~~~~~~~~~~~~~~~~~~~

    //~~~~~~~~~~~~~~~~~~~
    //~~~~~ EFFECTS ~~~~~
    //~~~~~~~~~~~~~~~~~~~

    //~~~~~~~~~~~~~~~~~~~
    //~~~~ FUNCTIONS ~~~~
    //~~~~~~~~~~~~~~~~~~~
    const onReturn = () => {
        history.push('/home');
    }
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ JSX ~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    return (
        <div id='errorPage'>
            {/* <img
                className='errorImg'
                src={errorImgOne}
                alt='The numbers 404 in macaroni.'
            /> */}
            <img
                className='errorImg'
                src={errorImgTwo}
                alt='The numbers 404 in macaroni.'
            />
            <h1 id='errorHeading'>Uh oh! Looks like you got lost in Grandma's kitchen.</h1>
            <h3 id='errorSubHeading'>We're real sorry about that.</h3>
            <p id='errorParagraph'>We weren't able to find what you were looking for. Maybe Grandma just hasn't made it yet!</p>
            <button id='errorReturn' onClick={onReturn}>Return to Home</button>

        </div>

    );
};
//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
export default ErrorPage;