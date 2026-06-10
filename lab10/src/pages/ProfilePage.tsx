import { useAuthStore } from '../store/useAuthStore';

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <main className="profile-page">
      <section className="profile-card">
        <h1>Профіль</h1>
        <p>
          <strong>ID:</strong> {user?.id}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </section>
    </main>
  );
}
