import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 shadow mx-4 rounded-lg"> {/* Corrected background color class, assuming a dark theme */}
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8"> {/* Completed class name */}
        <div className="sm:flex sm:items-center sm:justify-between"> {/* Completed class name */}
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse" // Completed class name
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Swift Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white"> {/* Completed class name and added text color */}
              SwiftChat
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0"> {/* Completed class name */}
            <li>
              <a href="#" className="hover:underline me-4 md:me-6"> {/* Completed class name */}
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6"> {/* Completed class name */}
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6"> {/* Completed class name */}
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" /> {/* Completed class name */}
        <span className="block text-sm sm:text-center text-gray-500"> {/* Completed class name */}
          © 2023{" "}
          <a href="https://swiftchat.com/" className="hover:underline"> {/* Added a placeholder href */}
            SwiftChat
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;