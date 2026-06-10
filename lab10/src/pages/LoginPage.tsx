import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { authSchema, type AuthFormData } from '../schemas/authSchema';
import { useAuthStore } from '../store/useAuthStore';
import { getErrorMessage } from '../utils/getErrorMessage';

export function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => navigate('/profile'),
  });

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <h1>Вхід</h1>

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
          {mutation.isPending ? 'Вхід...' : 'Увійти'}
        </button>

        <p>
          Немає акаунта? <Link to="/register">Зареєструватися</Link>
        </p>
      </form>
    </main>
  );
}
