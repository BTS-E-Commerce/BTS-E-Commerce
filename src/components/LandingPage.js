//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import landingImg from './images/grandmaclanding.png';

import './LandingPage.css';

const LandingPage = () => {
  let history = useHistory();
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~ EFFECTS ~~~~~
  //~~~~~~~~~~~~~~~~~~~

  //~~~~~~~~~~~~~~~~~~~
  //~~~~ FUNCTIONS ~~~~
  //~~~~~~~~~~~~~~~~~~~
  const onEnterStore = () => {
    history.push('/store');
  };
  //~~~~~~~~~~~~~~~~~~~
  //~~~~~~ JSX ~~~~~~~~
  //~~~~~~~~~~~~~~~~~~~
  return (
    <div className='landingPageContainer'>
      <div className='hook'>
        <h1>Home is where the mac is...</h1>
        <p>
          ...especially when Grandma's home. You know, I know, we all know that
          Grandma makes the best mac. So, come on in! Peruse our selection of
          artisan macaroni products!
        </p>
      </div>
      <img
        src={landingImg}
        alt='A wholesome image of Grandma Mac cooking her favorite food - macaroni.'
      />
      <button onClick={onEnterStore}>ENTER STORE</button>
      <div className='macHistory'>
        <div className='macScrollbar'>
          <p>
            Did you know that Grandma Mac&trade; is the first hybrid
            macaroni-human?
          </p>
          <p>
            {' '}
            First grown in [REDACTED], Wyoming in 2012, Grandma Mac&trade; was
            created to be the premier (and soon to be only) supplier of macaroni
            in the United States of America. Using experimental [REDACTED]
            technology, Grandma Mac&trade; was manufactured by suffusing
            macaroni and the DNA from a recently passed elder found in Rigatoni
            Cemetery in a vat of certified Ceehes.
          </p>
          <p>
            {' '}
            The first successful Grandma Mac&trade; was created after only 12
            failed attempts. It only took 4 attempts to diminish the inherent
            violent instincts! Most hybrids take twice that pacify!
          </p>
          <p>
            {' '}
            With the success of the current iteration of Grandma Mac, we are
            able to create over 20,000 different artisan macaroni products each
            day.
          </p>

          <p>
            We at Grandma's Mac&trade; pride ourselves on our dedication to
            improving our customer's shopping experience and the quality of our
            selection.
          </p>
          <p>
            To this end we are happy to announce that we are hard at work on the
            next iteration of Grandma Mac&trade;! We are incredibly excited to
            debut the new hybrid at MacCon in Winter 2020! Stay tuned for more
            news!
          </p>
        </div>
      </div>
      <div className='macFollow'>
        <h2>Loving Grandma's Mac? Follow Us On Facebook!</h2>
        <a
          id='macFacebook'
          href='https://www.facebook.com/groups/grandmasmac'
          target='_blank'
        >
          <img
            id='facebookImg'
            src='https://cdn0.iconfinder.com/data/icons/popular-social-media-colored/48/JD-04-256.png'
            alt='Facebook Icon'
          />
        </a>
      </div>
    </div>
  );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

export default LandingPage;
