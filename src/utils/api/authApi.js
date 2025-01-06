import apiClient from '../apiClient'; // Импортируем axios клиент с настройками


// Функция для регистрации пользователя
export const registerUser = async (body) => {
    try {
        console.log(body, 'bodyhoooo')
        const response = await apiClient.post('/auth/register', body);
        return response.data; // Возвращаем данные от сервера
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const verifyRegisterCode = async (email, code) => {
    const body = {
        code,
        ...(email && { email }), // Add email if it exists
    };

    try {
        // API call to verify the code
        const response = await apiClient.post('/auth/confirm', body);
        return response.data; // Return the API response data
    } catch (error) {
        // Improved error handling with better readability
        const errorMessage = error.response?.data?.message || 'Ошибка при подтверждении кода';
        throw new Error(errorMessage);
    }
};


// Функция для выполнения логина
export const loginUser = async ( email,  password) => {
    const body = {};
        body.email = email;
        body.password = password;


    try {
        // Выполняем запрос с помощью axios
        const response = await apiClient.post('/auth/login', body);
        return response.data; // Возвращаем данные от сервера
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const setResetPassword = async (email) => {
    try {
        let body = {};
        body.email = email;

        // Make the request with axios
        const response = await apiClient.post('/auth/forgot-password', body);

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle and throw the error
        throw error.response?.data?.message || error.message;
    }
};

export const setNewPasswordCode = async (email, code) => {
    try {
        let body = {
            code: code,
            email: email,
        };

        // Make the API call using the axios instance
        const response = await apiClient.post('/auth/confirm-reset-password-code', body);

        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};

export const setNewPassword = async (email, newPassword, confirmPassword) => {
    try {
        let body = {
            email: email,
            new_password: newPassword,
            confirm_new_password: confirmPassword,
        };


        // Make the API call using the axios instance
        const response = await apiClient.post('/auth/reset-password', body);

        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};


export const getProfileInfo2 = async () => {
    try {
        // No need to manually get token; it will be handled by axios interceptors
        const response = await apiClient.get('/profile'); // axios already includes the token

        // Return the profile data from the response
        return response.data;
    } catch (error) {
        // Throw a detailed error message
        throw error.response?.data?.message || error.message;
    }
};

export const editProfile2 = async (name, surname, email, phoneNumber, about) => {
    console.log(about, 'about_edit______')
    try {
        let body = {
            first_name: name,
            last_name: surname,
            email: email,
            phone: phoneNumber,
            image: '',
            about: about
        };


        // Make the API call using the axios instance
        const response = await apiClient.put('/profile', body);

        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};
export const makeAppointmentBook2 = async (id, userId, name, surname, email, phoneNumber, message, selectedTime, selectedDate, promoCode) => {
    try {
        let body = {
            psychologist_id: id,
            user_id: userId,
            first_name: name,
            last_name: surname,
            email: email,
            phone: phoneNumber,
            message: message,
            appointment_date: selectedDate,
            appointment_time: selectedTime,
            promo_code: promoCode ? promoCode : '',

        };


        // Make the API call using the axios instance
        const response = await apiClient.post('/appointment/book', body);

        console.log(response, 'change_password_____')
        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};
export const getPsychologists2 = async (filters) => {
    try {

        // Make the API call using the axios instance
        const response = await apiClient.post('/psychologists', filters);

        console.log(response, 'get_psychologists')
        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};
export const getPsychologistSingle2 = async (id) => {
    try {

        // Make the API call using the axios instance
        const response = await apiClient.get(`/psychologist/${id}`);

        console.log(response, 'get_psychologist_single')
        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};
export const getServices2 = async () => {
    try {
        // Make the API call using the axios instance
        const response = await apiClient.get('/services');

        console.log(response, 'get_services')
        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};
export const getCertificates2 = async () => {
    try {
        // Make the API call using the axios instance
        const response = await apiClient.get('/certificates');

        console.log(response, 'get_certificates')
        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};
export const getAppointmentsSessions2 = async (role, status) => {
    try {
        let body = {
            role: role,
            status: status
        };


        // Make the API call using the axios instance
        const response = await apiClient.post('/appointments/sessions', body);

        console.log(response, 'get_appointments_sessions')
        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};

export const purchaseCertificates2 = async (userId, selectedCertificateId) => {
    try {
        let body = {
            user_id: userId,
            certificate_id: selectedCertificateId
        };

        // Make the API call using the axios instance
        const response = await apiClient.post('/certificates/purchase', body);


        console.log(response, 'buy_certificate___')

        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};
export const makeFeedback2 = async (name, surname, phoneNumber, message) => {
    try {
        let body = {
            first_name: name,
            last_name: surname,
            phone: phoneNumber,
            message: message
        };

        // Make the API call using the axios instance
        const response = await apiClient.post('/feedback', body);


        console.log(response, 'write_feedback')

        // Return the response data
        return response.data;
    } catch (error) {
        // Throw the specific error message or general error
        throw error.response?.data.message || error.message;
    }
};

