"use client"
import React from 'react';
import { usePaystackPayment } from 'react-paystack';

const config = {
    reference: (new Date()).getTime().toString(),
    email: "idasiadiachi@gmail.com",
    amount: 200000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_3d5fd45846d4bb6e53f935e06322ee40d59c0331',
};

// you can call this function anything
const onSuccess = (reference: string) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed')
}

const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button onClick={() => {
              initializePayment(() => onSuccess("ping"), onClose)
          }}>Paystack Hooks Implementation</button>
      </div>
    );
};

export default PaystackHookExample;