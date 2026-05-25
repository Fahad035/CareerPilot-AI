import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Validate email format
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Enforce minimum password length for Firebase
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // After signup, redirect user to login page so they can sign in
      navigate("/login", { state: { message: "Account created. Please sign in." } });
    } catch (err) {
      console.error("Firebase signup error:", err.code, err.message, err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // Basic password strength heuristic (weak/fair/strong)
  function passwordStrength(pw) {
    let score = 0;
    if (!pw) return { score: 0, label: "" };
    if (pw.length >= 6) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;

    let label = "Weak";
    if (score >= 3) label = "Strong";
    else if (score === 2) label = "Fair";
    return { score, label };
  }
  // compute current password strength to avoid unused-var lint error
  const pwStrength = passwordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="text-sm text-gray-500">Join CareerPilot AI — get personalized career guidance</p>
        </div>

        {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-200 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-400"
              placeholder="Create a strong password"
            />

            {/* Password strength meter */}
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium">Strength: {pwStrength.label || '—'}</span>
                <span className="text-xs text-gray-400">{password ? `${password.length} chars` : ''}</span>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded mt-1 overflow-hidden">
                <div
                  aria-hidden
                  className={`h-full transition-all duration-200 ${
                    pwStrength.score === 0 ? 'w-0' :
                    pwStrength.score === 1 ? 'w-1/4 bg-red-500' :
                    pwStrength.score === 2 ? 'w-1/2 bg-yellow-400' :
                    pwStrength.score === 3 ? 'w-3/4 bg-green-400' :
                    'w-full bg-green-600'
                  }`}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-green-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}