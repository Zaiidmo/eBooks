"use client";

import { useState, useEffect } from "react";
import { LogOut, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { logoutUser } from "@/helpers/cognito";
import { toastNotifier } from "@/utils/toastNotifier";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    try {
      const result = logoutUser(dispatch);
      if (result !== null) {
        toastNotifier({
          type: "success",
          message: "Logged out successfully",
          duration: 3000,
        });
      } else {
        toastNotifier({
          type: "error",
          message: "Error logging out",
          duration: 3000,
        });
      }
    } catch (error) {
      toastNotifier({
        type: "error",
        message: "Error logging out",
        duration: 3000,
      });
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 backdrop-filter backdrop-blur-xl bg-gradient-to-b from-white/60 to-white/30 dark:from-gray-900/60 dark:to-gray-900/30 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-semibold text-gray-800 dark:text-white text-shadow"
            >
              <img
                src="./vlpha.png"
                className="w-10 bg-black rounded-full"
                alt="Logo"
              />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {!isAuth ? (
              <>
                <Link to={"login"}>
                  <Button
                    variant="ghost"
                    className="text-gray-800 bg-transparent dark:text-white hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300 ease-in-out backdrop-blur-md"
                  >
                    Login
                  </Button>
                </Link>

                <Link to={"register"}>
                  <Button
                    variant="outline"
                    className="text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300 ease-in-out backdrop-blur-md"
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={"dashboard"}>
                  <Button
                    variant="outline"
                    className="text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300 ease-in-out backdrop-blur-md"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300 ease-in-out backdrop-blur-md"
                >
                  <LogOut />
                  Logout
                </Button>
              </>
            )}

            {/* Dark Mode Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full bg-white/40 dark:bg-gray-700/40 text-gray-800 dark:text-white hover:bg-white/60 dark:hover:bg-gray-600/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-300 ease-in-out backdrop-blur-md"
            >
              {darkMode ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">
                {darkMode ? "Switch to light mode" : "Switch to dark mode"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
