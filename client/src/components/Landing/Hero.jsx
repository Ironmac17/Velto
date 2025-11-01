import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-white to-violet-100 py-24 lg:py-32">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-violet-200/60 to-violet-100/40 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left side text */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center bg-violet-100 text-violet-900 text-sm font-semibold px-4 py-2 rounded-full">
            Smarter Finance, Simpler Life
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
            Manage Your Money
            <span className="block bg-gradient-to-r from-violet-700 to-violet-500 bg-clip-text text-transparent">
              with Clarity and Ease
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            Velto gives you full control of your spending and savings with elegant visuals that make finance feel effortless.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a
              href="/signup"
              className="bg-gradient-to-r from-violet-700 to-violet-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 transition-all duration-200"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="px-8 py-4 rounded-xl font-semibold border border-gray-200 text-gray-800 hover:bg-gray-100 transition-all duration-200"
            >
              Explore Features
            </a>
          </div>
        </div>

        {/* Right side hero “image” (pure JSX, all violet tones) */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-[90%] max-w-lg bg-white rounded-3xl shadow-2xl border border-violet-100 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 p-4 bg-violet-50 border-b border-violet-100">
              <span className="w-3 h-3 rounded-full bg-violet-300"></span>
              <span className="w-3 h-3 rounded-full bg-violet-400"></span>
              <span className="w-3 h-3 rounded-full bg-violet-500"></span>
            </div>

            {/* Chart area */}
            <div className="p-6 space-y-6">
              {/* Income and Expense cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-700/10 border border-violet-100">
                  <p className="text-sm text-gray-600">Income</p>
                  <p className="text-2xl font-bold text-violet-700">$4,200</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-violet-400/10 to-violet-600/10 border border-violet-100">
                  <p className="text-sm text-gray-600">Expenses</p>
                  <p className="text-2xl font-bold text-violet-500">$2,780</p>
                </div>
              </div>

              {/* Bar graph mock */}
              <div className="h-32 flex items-end gap-2">
                {[40, 70, 55, 90, 65, 80, 60].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-violet-500 to-violet-400 rounded-t-lg transition-all duration-300"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>

              {/* Summary box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-violet-700 to-violet-500 text-white flex items-center justify-between shadow-md">
                <p className="font-semibold">Net Savings</p>
                <p className="text-lg font-bold">+$1,420</p>
              </div>
            </div>
          </div>

          {/* Glowing shadow behind image */}
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-violet-500/30 to-violet-700/30 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
