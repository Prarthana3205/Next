"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

export default function Home() {
  const [todos, setTodos] = useState([
    "Plan your day",
    "Finish React project",
    "Read a book",
  ]);
  const [input, setInput] = useState("");
  const router = useRouter();

  const [abstractRef, abstractInView] = useInView();
  const [todoRef, todoInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  const handleAdd = () => {
    if (input.trim()) {
      setTodos([input, ...todos]);
      setInput("");
    }
  };

  const handleDelete = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-100 to-yellow-50 overflow-x-hidden snap-y snap-mandatory h-screen">
      {/* Animated SVG Background Shapes */}
      <svg className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] opacity-40 animate-float-slow z-0" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="200" fill="#a78bfa" />
      </svg>
      <svg className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] opacity-30 animate-float z-0" viewBox="0 0 500 500">
        <rect width="500" height="500" rx="250" fill="#facc15" />
      </svg>
      <svg className="absolute top-1/2 left-[-80px] w-[200px] h-[200px] opacity-20 animate-float-fast z-0" viewBox="0 0 200 200">
        <ellipse cx="100" cy="100" rx="100" ry="80" fill="#f472b6" />
      </svg>

      {/* Top right login/register */}
      <div className="absolute top-6 right-8 flex gap-4 z-10">
        <Link
          href="/login"
          className="bg-purple-600 text-white px-5 py-2 rounded font-semibold shadow hover:bg-purple-800 transition-all duration-300 transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-white text-purple-700 border border-purple-600 px-5 py-2 rounded font-semibold shadow hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
        >
          Register
        </Link>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 snap-start">
        <span className="font-serif text-4xl md:text-6xl font-bold text-purple-800 mb-4 tracking-wide drop-shadow-lg">
          SAP To-Do
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 mb-4 text-center leading-tight drop-shadow">
          Make Every Day <span className="text-yellow-400">Productive</span>
        </h1>
        <p className="text-purple-700 text-xl mb-10 text-center font-medium max-w-xl">
          Organize, track, and accomplish your goals with style.
        </p>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-purple-400 text-3xl">&#8595;</span>
          <span className="text-purple-400 text-sm">Scroll down</span>
        </div>
      </section>

      {/* Abstract Section */}
      <section
        ref={abstractRef}
        className={`flex flex-col items-center justify-center min-h-[60vh] px-4 transition-all duration-700 snap-start ${
          abstractInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ transitionProperty: "opacity, transform" }}
      >
        <div className="max-w-2xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4 text-center">Why SAP To-Do?</h2>
          <p className="text-lg text-purple-900 text-center">
            In an era of digital overload, managing tasks effectively is critical for personal productivity and mental clarity.
            <br /><br />
            <span className="font-semibold text-purple-700">SAP To-Do</span> is a visually engaging, responsive, and interactive task management web application built using Next.js, React, and Tailwind CSS. Designed with simplicity and elegance in mind, it offers users a minimal yet powerful interface to plan, organize, and track daily activities.
          </p>
        </div>
      </section>

      {/* To-Do Preview Section */}
      <section
        ref={todoRef}
        className={`flex flex-col items-center justify-center min-h-[60vh] px-4 transition-all duration-700 snap-start ${
          todoInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ transitionProperty: "opacity, transform" }}
      >
        <div className="max-w-lg w-full bg-white/80 rounded-2xl shadow-2xl p-8 border border-purple-100">
          <h3 className="text-2xl font-bold text-purple-800 mb-4 text-center">How it works</h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:border-purple-500 bg-white/80 text-lg"
              placeholder="Add a to-do..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAdd()}
            />
            <button
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition font-semibold"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {todos.slice(0, 4).map((todo, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 bg-purple-50 rounded-lg px-4 py-2 shadow-sm animate-fade-in"
                style={{ animationDelay: `${idx * 80}ms` } as any}
              >
                <span className="w-3 h-3 rounded-full bg-purple-300 inline-block"></span>
                <span className="flex-1 text-purple-900 font-medium">{todo}</span>
                <button
                  className="text-red-400 hover:text-red-600 transition text-xl font-bold"
                  aria-label="Delete"
                  onClick={() => handleDelete(idx)}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className={`flex flex-col items-center justify-center min-h-[40vh] px-4 transition-all duration-700 snap-start ${
          ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{ transitionProperty: "opacity, transform" }}
      >
        <div className="max-w-xl w-full bg-white/80 rounded-2xl shadow-xl p-10 flex flex-col items-center">
          <h4 className="text-2xl font-bold text-purple-800 mb-4 text-center">Ready to get started?</h4>
          <p className="text-lg text-purple-900 mb-6 text-center">
            Log in to start organizing your day with SAP To-Do!
          </p>
          <Link
            href="/login"
            className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow hover:bg-purple-800 transition-all duration-300 text-xl"
            scroll={false}
          >
            Login
          </Link>
        </div>
      </section>

      {/* Global CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-30px);}
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-15px);}
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px);}
          50% { transform: translateY(-50px);}
        }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.5s both;
        }

        @keyframes cta-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(168, 139, 250, 0.7), 0 0 0 0 rgba(250, 204, 21, 0.5);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(168, 139, 250, 0), 0 0 0 20px rgba(250, 204, 21, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(168, 139, 250, 0.7), 0 0 0 0 rgba(250, 204, 21, 0.5);
          }
        }
        .animate-cta-pulse {
          animation: cta-pulse 4s infinite;
        }
      `}</style>
    </div>
  );
}
