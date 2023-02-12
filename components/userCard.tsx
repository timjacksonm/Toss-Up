import { DefaultSession } from 'next-auth';

export function UserCard({ user }: { user: DefaultSession['user'] }) {
  return (
    <div>
      <div>
        <p>Current Logged In User</p>
        <h5 className="text-5xl text-purple-300">User Name {user?.name}</h5>
        <p>Users Email {user?.email}</p>
      </div>
    </div>
  );
}
