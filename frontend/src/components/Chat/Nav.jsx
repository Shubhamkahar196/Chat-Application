import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="flex fixed bottom-5 right-5 h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white z-50 lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {isMobile && (
        <header className="fixed h-screen w-56 bg-white shadow-lg flex flex-col p-4 z-40 lg:static">
          <Link
            to="/"
            className="flex gap-2 items-center justify-center border-b pb-4"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Swift Logo"
            />
            <span className="font-semibold text-xl mr-2">Swift</span>
          </Link>
          <nav className="h-full flex flex-col my-4 justify-between">
            <div className="flex flex-col gap-5">
              <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Profile</span>
              </Link>

              <Link to="/chathome" className="flex items-center gap-2 text-gray-700 hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.537a5.625 5.625 0 01-1.04-1.04l.537-3.722c.094-1.133.957-1.98 2.193-1.98h4.286zM6.242 16.242a5.625 5.625 0 011.04-1.04l-3.722-.537a2.25 2.25 0 00-2.193 2.193v4.286c0 .97.616 1.813 1.5 2.097L6.242 16.242z"
                  />
                </svg>
                <span>Chats</span>
              </Link>
            </div>
            <button onClick={logout} className="flex items-center gap-2 text-gray-700 hover:text-black mb-14">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H3"
                />
              </svg>
              <span>Logout</span>
            </button>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;