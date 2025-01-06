import { useState, useEffect } from 'react';
import { getProfileInfo2 } from '../utils/api/authApi'; // Import the API function

export const useGetProfileInfo = () => {
    const [loadingUserInfo, setLoadingUserInfo] = useState(false);
    const [profileInfoData, setProfileInfoData] = useState(null);
    const [errorText, setErrorText] = useState('');

    useEffect(()=>{
        getProfileInfo();
    }, [])
    const getProfileInfo = async () => {
        setLoadingUserInfo(true);
        setErrorText('');

        try {
            // Call the API function to fetch profile info
            const data = await getProfileInfo2();
            setProfileInfoData(data);
            console.log(data, 'profile_data___');
        } catch (error) {
            // Handle error: set an appropriate error message
            setErrorText(error.message || 'Error fetching profile info');
        } finally {
            // Always stop loading after the request completes
            setLoadingUserInfo(false);
        }
    };

    // Return the necessary values and functions from the hook
    return { getProfileInfo, loadingUserInfo, profileInfoData, errorText };
};
