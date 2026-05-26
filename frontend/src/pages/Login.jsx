import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // basic email format check
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Firebase login error:", err.code, err.message, err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome back</h1>
          <p className="text-sm text-gray-500">Sign in to continue to CareerPilot AI</p>
        </div>

          {/* Show success message from signup redirect */}
          {location?.state?.message && (
            <div className="mb-4 text-green-700 bg-green-100 border border-green-200 p-3 rounded">
              {location.state.message}
            </div>
          )}

          {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-200 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />

            <label className="mt-2 inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              Show password
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}