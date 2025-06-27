"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifiedParam = searchParams.get("verified");

  const validate = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
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

  function getPasswordStrength(pw: string) {
    if (pw.length < 8) return "Weak";
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(pw)) return "Strong";
    if (/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(pw)) return "Medium";
    return "Weak";
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setSuccess("Registration successful! Redirecting to login...");
      setName("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  async function handleVerifyEmail() {
    setVerifying(true);
    setVerifyMsg("");
    setError("");
    const res = await fetch("/api/send-verification-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setVerifyMsg("Verification link sent! Please check your email and click the link to verify.");
    } else {
      setError(data.error || "Failed to send verification link.");
    }
    setVerifying(false);
  }

  // Polling for email verification (optional, simple approach)
  async function checkEmailVerified() {
    const res = await fetch(`/api/check-email-verified?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (data.verified) setEmailVerified(true);
  }

  function validateEmailFormat(email: string) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="w-[400px] bg-purple-50 rounded-lg shadow-lg p-10">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="font-serif text-2xl font-bold text-purple-800">SAP</span>
        </div>
        {/* Welcome */}
        <h2 className="text-3xl font-serif font-semibold mb-2 text-purple-800 text-center">Create your account</h2>
        <p className="text-purple-600 mb-8 text-center">
          Sign up to get started
        </p>
        {/* Verification Message */}
        {verifiedParam === "1" && (
          <div className="text-green-700 text-sm text-center mb-4">Email verified! You can now complete your registration.</div>
        )}
        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1 text-purple-800" htmlFor="name">
              Name
            </label>
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
            <label className="block font-medium mb-1 text-purple-800" htmlFor="email">
              Email
            </label>
            <div className="flex gap-2">
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:border-purple-600 text-black"
                required
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setEmailVerified(false);
                  setVerifyMsg("");
                  setEmailValid(validateEmailFormat(e.target.value));
                }}
                onBlur={checkEmailVerified}
              />
              <button
                type="button"
                className="bg-purple-600 text-white px-3 py-1 rounded font-semibold hover:bg-purple-800 disabled:opacity-50"
                onClick={handleVerifyEmail}
                disabled={verifying || !emailValid}
              >
                {verifying ? "Sending..." : "Verify Email"}
              </button>
            </div>
            {!emailValid && email && (
              <div className="text-red-600 text-sm mt-1">Please enter a valid email address.</div>
            )}
            {verifyMsg && <div className="text-green-600 text-sm mt-1">{verifyMsg}</div>}
            {emailVerified && <div className="text-green-700 text-sm mt-1">Email verified!</div>}
          </div>
          <div>
            <label className="block font-medium mb-1 text-purple-800" htmlFor="password">
              Password
            </label>
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
              <div className={
                passwordStrength === "Strong"
                  ? "text-green-600 text-sm mt-1"
                  : passwordStrength === "Medium"
                  ? "text-yellow-600 text-sm mt-1"
                  : "text-red-600 text-sm mt-1"
              }>
                Password strength: {passwordStrength}
              </div>
            )}
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded font-semibold transition hover:bg-purple-800"
            disabled={loading || !emailVerified}
          >
            {loading ? "Signing Up..." : "Sign Up"}
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