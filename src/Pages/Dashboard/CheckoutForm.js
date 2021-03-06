import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';

const CheckoutForm = ({order}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
   

  const {price,quantity,userName,userEmail,_id} = order
  const totalPrice = price * parseInt(quantity)


   useEffect(()=>{
       fetch('https://thawing-island-69083.herokuapp.com/create-payment-intent',{
           method:'POST',
           headers:{
               'content-type':'application/json'
           },
           body:JSON.stringify({totalPrice})
       })
       .then(res=>res.json())
       .then(data=>{
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
      }
       })
   },[totalPrice])

   
   if(processing){
    return <Loading></Loading>
  }
    const handleSubmit = async (event) =>{
     event.preventDefault()
    

     if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card
    });
    setCardError(error?.message || '')
    setSuccess('');
    setProcessing(true);
    //
    const {paymentIntent, error:intentError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email:userEmail
          },
        },
      },
    );

    //

    if(intentError){
      setCardError(intentError?.message)
      setProcessing(false);
    }
    else{
      setSuccess('Congratulations!Your Payment is completed')
      setCardError('')
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent)

      const payment = {
        order: _id,
        transactionId: paymentIntent.id
    }
    fetch(`https://thawing-island-69083.herokuapp.com/order/${_id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            
        },
        body: JSON.stringify(payment)
    }).then(res=>res.json())
    .then(data => {
        setProcessing(false);
        console.log(data);
    })
    }
  }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className=' btn my-2 btn-primary btn-xs' type="submit" disabled={!stripe || !clientSecret }>
        Pay
      </button>
    </form>
            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
             {
                success && <div className='text-green-500'>
                    <p>{success}  </p>
                    <p>Your transaction Id: <span className="text-orange-500 font-bold">{transactionId}</span> </p>
                </div>
            }
    </>
  );
};

export default CheckoutForm;