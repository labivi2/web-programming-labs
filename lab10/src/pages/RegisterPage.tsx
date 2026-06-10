import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authSchema, type AuthFormData } from '../schemas/authSchema';
import { useAuthStore } from '../store/useAuthStore';
import { getErrorMessage } from '../utils/getErrorMessage';

export function RegisterPage() {
  const registerUser = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert('Акаунт створено');
      navigate('/login');
    },
  });

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <h1>Реєстрація</h1>

        <label>
          Email
          <input type="email" {...register('email')} />
        </label>
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label>
          Пароль
          <input type="password" {...register('password')} />
        </label>
        {errors.password && <p className="error">{errors.password.message}</p>}

        {mutation.isError && (
          <p className="error">{getErrorMessage(mutation.error)}</p>
        )}

        <button disabled={mutation.isPending}>
          {mutation.isPending ? 'Реєстрація...' : 'Зареєструватися'}
        </button>

        <p>
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </form>
    </main>
  );
}
