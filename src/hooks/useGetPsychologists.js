// useGetPsychologists.js
import { useState } from 'react';
import { getPsychologists2 } from '@/utils/api/authApi'; // Your axios wrapper or fetch call

export const useGetPsychologists = () => {
    const [loading, setLoading] = useState(false);
    const [psychologistsData, setPsychologistsData] = useState(null);

    /**
     * @param {object} filters - e.g. { service_ids: [1, 2, 3] }
     * @param {number} page    - e.g. 1, 2, 3
     */
    const getPsychologists = async (filters = {}, page = 1) => {
        setLoading(true);
        try {
            // Pass both page and filters to the API
            const data = await getPsychologists2(page, filters);
            setPsychologistsData(data);
        } catch (error) {
            console.error('Error fetching psychologists:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        getPsychologists,
        psychologistsData,
        loading,
    };
};
