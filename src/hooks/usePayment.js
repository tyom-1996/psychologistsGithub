import { useState } from 'react';
import { payment2 } from '../utils/api/authApi'; // Import the API function


export const usePayment = () => {
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [errorPaymentData, setErrorPaymentData] = useState(null);
    const [balanceErrorText, setBalanceErrorText] = useState('');

    const validateInputs = (amount) => {
        let isValid = true;
        if (!amount) {
            setBalanceErrorText('Поле является обязательным.');
            isValid = false;
        }

        return isValid;
    };

    const payment = async (amount) => {
        setLoading(true);
        setBalanceErrorText('')

        const isValid = validateInputs(amount);
        if (!isValid) {
            setLoading(false);
            return false;
        }
        try {
            const data = await payment2(amount); // Call the API function
            setPaymentData(data);
        } catch (error) {
           setErrorPaymentData(error)
        } finally {
            setLoading(false);
        }
    };

    return {
        payment,
        errorPaymentData,
        paymentData,
        loading,
        balanceErrorText
    };
};
