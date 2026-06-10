import axios from 'axios';

export function getErrorMessage(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return 'Сталася помилка';
  }

  if (error.response?.status === 401) {
    return 'Невірний email або пароль';
  }

  if (error.response?.status === 409) {
    return 'Користувач з таким email вже існує';
  }

  if (error.response?.status === 400) {
    return 'Перевірте введені дані';
  }

  return 'Сталася помилка';
}
