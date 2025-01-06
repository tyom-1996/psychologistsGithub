
import { useState } from 'react';
import {getPsychologistSingle2  } from '../utils/api/authApi';

export const useGetPsychologistSingle = () => {
    const [loading, setLoading] = useState(false);
    const [psychologistSingleData, setPsychologistSingleData] = useState(null);


    const getPsychologistSingle = async (id) => {
        setLoading(true);
        try {
            const data = await getPsychologistSingle2(id); // Call the API function
            setPsychologistSingleData(data);

        } catch (error) {
            // if (error == 'Old password is incorrect') {
            // }
        } finally {
            setLoading(false);
        }
    };

    return {
        getPsychologistSingle,
        psychologistSingleData,
        loading,
    };
};
