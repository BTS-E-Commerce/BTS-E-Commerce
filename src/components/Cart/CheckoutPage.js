//~~~~~~~~~~~~~~~~~~~
//~~~~~ IMPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom'

const CheckoutPage = () => {
    const history = useHistory();
    const location = useLocation();
    //~~~~~~~~~~~~~~~~~~~
    //~~~~~ EFFECTS ~~~~~
    //~~~~~~~~~~~~~~~~~~~
    console.log(location.state.totalPrice);
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
        <div>
            <h1>CHECKOUT PAGE</h1>
            <h3>Congratulations! You just checked out!</h3>
            <p>You spent : ${(location.state.totalPrice / 100).toFixed(2)}</p>
            <p>You can review your order inside your "Order History" on your "Account".</p>
            <button onClick={onReturnStore}>Return to Store</button>
        </div>
    );
};

//~~~~~~~~~~~~~~~~~~~
//~~~~~ EXPORTS ~~~~~
//~~~~~~~~~~~~~~~~~~~

export default CheckoutPage;
