import {useAuthStore} from "@/stores/authStore";

export default function UserInfo() {
  const { user, logout } = useAuthStore();

  return (
    <div>
      <p>Logged in as: {user?.firstName + ' ' + user?.lastName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}