//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom'

const CheckoutPage = () => {
    const history = useHistory();
    const location = useLocation();
    //~~~~~~~~~~~~~~~~~~~
    //~~~~ FUNCTIONS ~~~~
    //~~~~~~~~~~~~~~~~~~~
    const onReturnStore = () => {
        history.push('/store');
    }

    //~~~~~~~~~~~~~~~~~~~
    //~~~~~~ JSX ~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~
    return (
        <div id='checkoutPageContainer'>
            {/* <h1 id='checkoutTitle'>CHECKOUT PAGE</h1> */}
            <h3 id='checkoutHeading'>Congratulations! You just checked out!</h3>
            <p id='checkoutTotal'>You spent : ${(location.state.totalPrice / 100).toFixed(2)}</p>
            <p id='checkoutAccount'>You can review your order inside your "Order History" on your "Account".</p>
            <button id='checkoutReturnButton' onClick={onReturnStore}>Return to Store</button>
        </div>
    );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

export default CheckoutPage;
