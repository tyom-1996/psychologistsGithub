import { useState } from 'react';
import { purchaseCertificates2 } from '../utils/api/authApi'; // Import the API function


export const usePurchaseCertificates = () => {
    const [loading, setLoading] = useState(false);
    const [purchaseCertificatesData, setPurchaseCertificatesData] = useState(null);


    const purchaseCertificates = async (userId, selectedCertificateId) => {
        setLoading(true);

        try {
            const data = await purchaseCertificates2(userId, selectedCertificateId); // Call the API function
            setPurchaseCertificatesData(data);
        } catch (error) {
            // if (error == 'Old password is incorrect') {
            // }
        } finally {
            setLoading(false);
        }
    };

    return {
        purchaseCertificates,
        purchaseCertificatesData,
        loading,
    };
};
