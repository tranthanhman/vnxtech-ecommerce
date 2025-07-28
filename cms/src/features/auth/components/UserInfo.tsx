// features/auth/components/UserInfo.tsx

import {useAuthStore} from "../store";

export default function UserInfo() {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <p>Logged in as: {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}