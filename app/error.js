'use client';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Error Icon */}
      <div className="text-indigo-600 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 mx-auto animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
      </div>

      {/* Error Text */}
      <h1 className="text-4xl lg:text-5xl font-bold text-indigo-900 mb-4 text-center">
        Oops! Something went wrong
      </h1>
      <p className="text-indigo-700 mb-6 text-center max-w-md">
        {error?.message || 'An unexpected error occurred. Please try again.'}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition font-semibold text-center"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
