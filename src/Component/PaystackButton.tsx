// components/PaystackButton.jsx
import { PaystackButton } from 'react-paystack';

const PaystackPayment = ({ email, amount, onSuccess, onClose, publicKey }) => {
  
  const componentProps = {
    email,
    amount: amount * 100, // Paystack uses kobo
    currency: 'NGN',
    metadata: {
      custom_fields: [
        {
          display_name: "Mobile Number",
          variable_name: "mobile_number",
          value: "+2348012345678"
        }
      ]
    },
    publicKey,
    text: 'Pay Now',
    onSuccess,
    onClose,
  };

  return <PaystackButton {...componentProps} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700" />;
};

export default PaystackPayment;
