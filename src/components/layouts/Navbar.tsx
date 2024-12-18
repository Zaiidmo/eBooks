"use client";

import { useState, useEffect } from "react";
import {
  LogOut,
  Moon,
  Sun,
  LayoutDashboard,
  Book,
  Menu,
  LogIn,
  DoorOpen,
  BookA,
  BookOpen,
} from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { logoutUser } from "@/helpers/cognito";
import { toastNotifier } from "@/utils/toastNotifier";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 justify-between h-16">
          <div className="flex items-center mr-4">
            <Link
              to="/"
              className="text-2xl mr-10 font-semibold text-gray-800 dark:text-white text-shadow flex items-center"
            >
              {/* <BookOpen className="h-8 w-8" /> */}
              <img
                src="./logo.png"
                className=" w-7  hidden md:block"
                alt="Logo"
              />
              <p className="ml-2 font-monoton tracking-widest font-extrabold hidden md:block">
                eBooks
              </p>
            </Link>
          </div>
          <div className="w-fit md:w-full flex justify-between">
            <div className="hidden md:flex  items-center space-x-8">
              <NavLink to="/books" icon={<Book className="mr-2 h-4 w-4" />}>
                Books
              </NavLink>
              {isAuth && (
                <>
                  <NavLink
                    to="/dashboard"
                    icon={<LayoutDashboard className="mr-2 h-4 w-4" />}
                  >
                    Dashboard
                  </NavLink>
                </>
              )}
            </div>
            <div className="w-fit flex gap-4">
              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {!isAuth ? (
                  <>
                    <NavLink
                      to="/login"
                      icon={<LogIn className="mr-2 h-4 w-4" />}
                    >
                      Login
                    </NavLink>{" "}
                    <NavLink
                      to="/register"
                      icon={<DoorOpen className="mr-2 h-4 w-4" />}
                    >
                      Register
                    </NavLink>{" "}
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    className="rounded-full bg-white/40 dark:bg-gray-700/40 text-gray-800 dark:text-white hover:bg-white/60 dark:hover:bg-gray-600/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-300 ease-in-out backdrop-blur-md"
                  >
                    <LogOut className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                )}
              </div>
              {/* Navigation Buttons */}
              <div className="flex items-center space-x-4">
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
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden rounded-full bg-white/40 dark:bg-gray-700/40 text-gray-800 dark:text-white hover:bg-white/60 dark:hover:bg-gray-600/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-300 ease-in-out backdrop-blur-md"
                    >
                      <Menu className="h-[1.2rem] w-[1.2rem]" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[300px] bg-transparent sm:w-[400px]"
                  >
                    <nav className="flex flex-col space-y-4 mt-8">
                      <>
                        <NavLink
                          to="/books"
                          icon={<Book className="mr-2 h-4 w-4" />}
                        >
                          Books
                        </NavLink>
                      </>
                      {isAuth && (
                        <>
                          <NavLink
                            to="/dashboard"
                            icon={<LayoutDashboard className="mr-2 h-4 w-4" />}
                          >
                            Dashboard
                          </NavLink>
                        </>
                      )}
                      {!isAuth ? (
                        <>
                          <NavLink
                            to="/login"
                            icon={<LogIn className="mr-2 h-4 w-4" />}
                          >
                            Login
                          </NavLink>{" "}
                          <NavLink
                            to="/register"
                            icon={<DoorOpen className="mr-2 h-4 w-4" />}
                          >
                            Register
                          </NavLink>{" "}
                        </>
                      ) : (
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300 ease-in-out backdrop-blur-md"
                        >
                          <LogOut />
                          Logout
                        </Button>
                      )}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  to,
  children,
  icon,
}: {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300 relative group"
    >
      <span className="flex items-center">
        {icon}
        {children}
      </span>
      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-800 dark:bg-white transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
    </Link>
  );
}
