import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const handleLogout = async () => {
  await signOut(auth);
  alert("Logged Out");
};


export default function Dashboard() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">
        Welcome to CareerPilot AI Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}