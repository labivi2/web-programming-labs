import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { api } from '../api/api';
import { useAuthStore } from '../store/useAuthStore';
import type { User } from '../types/auth';

export function AuthLoader() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const token = localStorage.getItem('token');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await api.get<User>('/auth/me');
      return response.data;
    },
    enabled: Boolean(token),
    retry: false,
  });

  useEffect(() => {
    setUser(data ?? null);
    setLoading(Boolean(token) && isLoading);
  }, [data, isError, isLoading, setLoading, setUser, token]);

  return null;
}
