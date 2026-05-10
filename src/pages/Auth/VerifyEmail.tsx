import OTP from '@/components/auth/OtpConfirmation'



export default function VerifyEmail() {
  return (
    <div className="h-[93vh] flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 w-screen">
      <div className="w-full max-w-md space-y-8 p-8 rounded-xl shadow-lg sm:max-w-[425px] md:max-w-screen-md md:mx-auto backdrop-filter backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Verify Email
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter the six-digits otp received in your email
          </p>
        </div>
        <OTP/>
      </div>
    </div>
  )
}