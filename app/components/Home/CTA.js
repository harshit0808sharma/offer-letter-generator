'use client'
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 text-white overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative max-w-4xl mx-auto text-center px-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 shadow-2xl border border-white/20 hover:scale-105 transform transition duration-500">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Create your first offer letter in just a few clicks. No setup, no hassle.
          </p>

          <Link
            href="/generator"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-indigo-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
