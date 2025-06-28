"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const router = useRouter();

  const validateEmailFormat = (email: string): boolean => {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  };

  const getPasswordStrength = (pw: string) => {
    if (pw.length < 8) return "Weak";
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(pw)) return "Strong";
    if (/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(pw)) return "Medium";
    return "Weak";
  };

  const validate = () => {
    if (!validateEmailFormat(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (name.trim().length === 0) {
      setError("Name is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="w-[400px] bg-purple-50 rounded-lg shadow-lg p-10">
        <div className="mb-8 text-center">
          <span className="font-serif text-2xl font-bold text-purple-800">SAP</span>
        </div>
        <h2 className="text-3xl font-serif font-semibold mb-2 text-purple-800 text-center">
          Create your account
        </h2>
        <p className="text-purple-600 mb-8 text-center">Sign up to get started</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block font-medium mb-1 text-purple-800">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:border-purple-600 text-black"
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1 text-purple-800">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:border-purple-600 text-black"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium mb-1 text-purple-800">Password</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:border-purple-600 text-black"
              required
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setPasswordStrength(getPasswordStrength(e.target.value));
              }}
            />
            {password && (
              <div
                className={`text-sm mt-1 ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Password strength: {passwordStrength}
              </div>
            )}
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded font-semibold transition hover:bg-purple-800"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-8 text-center text-purple-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-800 font-medium hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
