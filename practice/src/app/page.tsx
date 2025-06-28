"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/homepage.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Login button at top right */}
      <div className="absolute top-6 right-8">
        <Link
          href="/login"
          className="bg-purple-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-purple-800 transition"
        >
          Login
        </Link>
      </div>
      <div className="w-[400px] bg-white/80 rounded-lg shadow-lg p-10">
        <div className="mb-8 text-center">
          <span className="font-serif text-2xl font-bold text-purple-800">SAP</span>
        </div>
        <h2 className="text-3xl font-serif font-semibold mb-2 text-purple-800 text-center">
          Welcome to the Homepage
        </h2>
        <p className="text-purple-600 mb-8 text-center">
          FINALLY
        </p>
        <div className="text-center">
          <Link href="/register" className="text-purple-800 font-medium hover:underline">
            Register another account
          </Link>
        </div>
      </div>
    </div>
  );
}
