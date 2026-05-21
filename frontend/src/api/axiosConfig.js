// frontend/src/api/axiosConfig.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', // عنوان الـ API الأساسي
    withCredentials: true, // مهم جداً لـ Laravel Sanctum والكوكيز
    headers: {
        // 'Content-Type': 'application/json', // يمكن إزالته، Axios يضيفه تلقائياً لـ JSON
        // 'Accept': 'application/json', // يمكن إزالته، المتصفح يضيفه تلقائياً
        'X-Requested-With': 'XMLHttpRequest', // يخبر Laravel بأن هذا طلب AJAX
    },
});

// لا حاجة لـ Interceptor لجلب الـ CSRF token هنا
// Axios سيتولى إرسال X-XSRF-TOKEN تلقائياً إذا كان withCredentials: true
// وكنت قد استدعيت /sanctum/csrf-cookie مرة واحدة.

export default apiClient;