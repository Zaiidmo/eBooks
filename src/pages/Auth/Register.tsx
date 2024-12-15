import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";


export default function Login() {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4 w-screen">
      <div className="w-full max-w-md space-y-8 p-8 rounded-xl shadow-lg sm:max-w-[425px] md:max-w-screen-md md:mx-auto backdrop-filter backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Get started now
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join the community and start your adventure today!
          </p>
        </div>
        <RegisterForm/>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
          </span>
          <Link 
            to="/login" 
            className="text-sm font-medium text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary transition-colors"
          >
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
}
