import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
      {/* Left Side - Form */}
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 flex flex-col'>
        {/* Logo & Brand */}
        <div className='flex items-center gap-3 mb-8'>
          <div className='w-10 h-10 bg-[#875cf5] rounded-xl flex items-center justify-center shadow-lg'>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className='text-lg font-medium text-black'>Velto</h2>
        </div>

        {/* Content */}
        <div className='flex-1 flex items-center'>
          <div className='w-full max-w-md'>
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className='text-center text-sm text-gray-500 mt-auto'>
          © 2025 Velto. Your financial journey, simplified.
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className='hidden md:flex md:w-[40vw] bg-[#875cf5]/80 relative overflow-hidden'>
        {/* Decorative circles */}
        <div className='absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl'></div>
        
        {/* Content */}
        <div className='relative z-10 flex flex-col justify-center px-16 text-white'>
          <h2 className='text-4xl font-bold mb-6 leading-tight'>
            Take Control of Your Finances
          </h2>
          <p className='text-lg text-white/90 mb-8 leading-relaxed'>
            Track expenses, manage budgets, and achieve your financial goals with Velto's intuitive platform.
          </p>
          
          {/* Feature list */}
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className='text-white/90'>Real-time expense tracking</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className='text-white/90'>Smart budget insights</span>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className='text-white/90'>Secure & encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout