import React from "react";
import { FEATURES } from "../../utils/data";

const Features = () => {
  return (
    <section id="features" className="relative py-24 lg:py-32  bg-gradient-to-b from-violet-50 via-purple-100 to-purple/20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-400/25 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-violet-100 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-violet-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-violet-900">Smart Features</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Stay In Control of Your
            <span className="block mt-2 bg-gradient-to-r from-violet-700 to-violet-500 bg-clip-text text-transparent">
              Finances Effortlessly
            </span>
          </h2>

          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Velto combines clarity and insight to help you manage, visualize, and grow your finances smarter.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-8 border border-violet-100 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 to-violet-100/0 group-hover:from-violet-50/70 group-hover:to-violet-100/40 rounded-2xl transition-all duration-300"></div>

                <div className="relative space-y-4">
                  <div
                    className="w-14 h-12 bg-gradient-to-br from-violet-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Ready to make sense of your spending?</p>
          <a
            href="/signup"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-700 to-violet-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
          >
            <span>Get Started Now</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
