import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // First useEffect for authentication check and redirection
  useEffect(() => {
    checkAuth();
    // Only navigate if isAuthenticated is true *after* checkAuth has run
    // This addresses potential race conditions or initial state issues
  }, [checkAuth]); // Add checkAuth to dependency array

  useEffect(() => {
    // Only proceed with verification if not already authenticated
    if (isAuthenticated) {
      navigate("/");
      return; // Exit if already authenticated
    }

    const fetchData = async () => {
      try {
        setLoading(true); // Ensure loading is true when starting fetch
        const response = await axios.get(`/api/user/${id}/verify/${token}`); // Completed URL
        toast.success(response.data.message);
        // console.log("Verification successful:", response.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred during verification.");
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data if id and token are available
    if (id && token) {
      fetchData();
    } else {
      // If id or token are missing from params, set loading to false
      // and potentially show an error or redirect
      setLoading(false);
      toast.error("Verification link is invalid or incomplete.");
    }
  }, [id, token, isAuthenticated, navigate]); // Added isAuthenticated and navigate to dependency array

  return (
    <div className="bg-dark min-h-screen text-white flex flex-col justify-center items-center p-4"> {/* Completed class names */}
      {loading && (
        <div className="mb-10 flex flex-col items-center" role="status"> {/* Completed role */}
          <svg
            aria-hidden="true"
            className="w-20 h-20 animate-spin fill-primarySecond text-gray-200" // Completed class and added text color
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7231 75.2124 7.41289C69.5422 4.10264 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0872 9.04874 41.579 10.5182 43.9503 10.081C48.3344 9.38924 52.8105 9.47171 57.1706 10.2854C61.5307 11.099 65.7483 12.6309 69.6482 14.8878C73.548 17.1446 77.0628 20.0055 80.0573 23.3619C82.4042 26.0465 84.1561 28.9897 85.2974 32.1465Z"
              fill="currentFill"
            />
          </svg>
          <span className="my-4 text-lg">Loading...</span>
        </div>
      )}
      {!loading && (
        <span className="my-4 text-xl font-medium text-green-500">Verification Complete!</span> // Completed class name, added text color
      )}
      {!loading && !isAuthenticated && (
        <Link
          to={"/login"}
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 mt-4" // Completed class names and added styling
        >
          Login
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" // Corrected d attribute for arrow
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      )}
    </div>
  );
};

export default VerifyEmail;