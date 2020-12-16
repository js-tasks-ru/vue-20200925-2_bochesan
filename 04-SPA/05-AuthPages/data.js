/** URL адрес API */
export const API_URL = 'https://course-vue.javascript.ru/api';

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными пользователя
 */
export async function login(email, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}

/**
 * Выполняет авторизацию по логину и паролю и возвращает результат
 * @param {string} email - email пользователя
 * @param {string} fullname - полное имя пользователя
 * @param {string} password - пароль пользователя
 * @return {Promise} - объект с данными зарегистрированного пользователя
 */
export async function register(email, fullname, password) {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, fullname, password }),
  }).then((res) => res.json());
}
