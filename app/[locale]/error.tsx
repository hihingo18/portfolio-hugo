"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Error Boundary]", error.message);
  }, [error]);

  return (
    <section className="relative w-full h-screen bg-white flex items-center justify-center">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#f1f1f1]" />

      <div className="px-20 text-center">
        <h1 className="font-bold text-5xl text-black leading-tight tracking-[-0.01em] mb-4">
          Oops! Something went wrong
        </h1>
        <p className="font-light text-2xl text-black leading-relaxed mb-8">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-[#020073] text-white rounded-lg hover:bg-[rgb(0,0,54)] transition-colors duration-200 font-medium"
        >
          Try Again
        </button>

        <p className="font-light text-lg text-gray-500 mt-6">
          Error ID: {error.digest || "unknown"}
        </p>
      </div>
    </section>
  );
}
