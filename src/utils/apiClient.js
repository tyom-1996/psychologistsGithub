import axios from 'axios';

// Базовый URL для API
const baseURL = 'https://api.menspsychology.ru/api';

// Создание экземпляра axios с базовой конфигурацией
const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 600000, // Увеличиваем таймаут до 60 секунд

});

// Функция для обновления токена
const refreshAuthToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        throw new Error('No refresh token found');
    }

    try {
        // Отправляем запрос на обновление токена
        const response = await axios.post(`${baseURL}/auth/refresh-token`, {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
            },
        });

        const { token, refresh_token: newRefreshToken } = response.data.data;

        // Сохраняем новый токен и refresh токен в localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', newRefreshToken);

        return token;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};

// Интерцептор для добавления токена из localStorage в заголовки каждого запроса
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Если запрос вернул ошибку 401 (Unauthorized) и это не запрос на обновление токена
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshAuthToken();

                // Обновляем заголовок с новым токеном
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                // Повторяем оригинальный запрос с новым токеном
                return apiClient(originalRequest);
            } catch (err) {
                console.error('Failed to refresh token:', err);
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
