import React from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../utils/data";

const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-32 pb-0 bg-gradient-to-b from-violet-50 via-purple-100 to-[#6e5cab]/20 overflow-hidden"
    >
      {/* Background Blurs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-400/25 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-5 py-2 rounded-full border border-violet-200 shadow-sm">
            <Star className="w-4 h-4 text-purple-600 fill-purple-500" />
            <span className="text-sm font-semibold text-gray-800">
              What Our Users Say
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4">
            Stories from the
            <span className="block bg-gradient-to-r from-purple-700 via-violet-700 to-indigo-600 bg-clip-text text-transparent">
              Velto Community
            </span>
          </h2>

          <p className="text-gray-700 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
            Honest words from people who made finance tracking a daily habit with Velto.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="relative bg-gradient-to-br from-white to-violet-50/70 rounded-3xl p-8 border border-violet-100 shadow-md hover:shadow-2xl hover:shadow-violet-400/20 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Floating Icon */}
              <div className="absolute -top-5 -left-5 w-12 h-12 bg-gradient-to-br from-purple-600 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-400/30 rotate-6 group-hover:rotate-12 transition-transform duration-300">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Stars */}
              <div className="flex items-center mb-4 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-purple-500 fill-purple-500" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-800 mb-8 leading-relaxed text-base italic">
                “{t.feedback}”
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-200 shadow-md"
                  src={t.photo}
                  alt={t.name}
                />
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto pb-24">
          <div className="text-center bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-violet-100 shadow-md">
            <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
              10K+
            </p>
            <p className="text-gray-700 font-medium">Active Users</p>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-violet-100 shadow-md">
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              4.9/5
            </p>
            <p className="text-gray-700 font-medium">Average Rating</p>
          </div>
          <div className="text-center bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-violet-100 shadow-md">
            <p className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-violet-700 bg-clip-text text-transparent mb-2">
              ₹5Cr+
            </p>
            <p className="text-gray-700 font-medium">Tracked Transactions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
