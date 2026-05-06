// --- Libraries
import { useEffect } from "react";
import { Link, useParams } from "react-router";

// --- React Icons
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

// --- RTK
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { verifyEmail } from "@features/auth/authSlice";

// --- Components
import Spinner from "@components/spinner/Spinner";

// --- Main Component
const VerifyEmail = () => {
  // --- Params
  const { id, token } = useParams();

  // --- RTK
  const { loading, error, isVerified } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // --- Verify Logic
  useEffect(() => {
    if (id && token) {
      dispatch(verifyEmail({ userId: id, token }));
    }
  }, [dispatch, id, token]);

  // --- Return JSX
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-10 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-strong max-w-md w-full flex flex-col items-center">
        {/* --- Loading State */}
        {loading && (
          <>
            <Spinner className="w-16 h-16 mb-5" />
            <h1 className="text-2xl font-bold text-primary font-jetbrains">Verifying Your Email...</h1>
            <p className="text-gray-500 mt-2">Please wait while we secure your account.</p>
          </>
        )}

        {/* --- Success State */}
        {!loading && isVerified && (
          <>
            <FaCheckCircle className="text-secondary text-7xl mb-5" />
            <h1 className="text-2xl font-bold text-primary font-jetbrains">Email Verified!</h1>
            <p className="text-gray-500 mt-2 mb-8">
              Your account has been successfully verified. You can now access all features.
            </p>
            <Link
              to="/login"
              className="bg-warning text-primary font-bold py-3 px-8 rounded-md hover:bg-amber-400 transition-all w-full"
            >
              Go to Login
            </Link>
          </>
        )}

        {/* --- Error State */}
        {!loading && error && !isVerified && (
          <>
            <MdError className="text-offer text-7xl mb-5" />
            <h1 className="text-2xl font-bold text-primary font-jetbrains">Verification Failed</h1>
            <p className="text-red-500 mt-2 mb-8">{error}</p>
            <Link
              to="/register"
              className="border-2 border-primary text-primary font-bold py-3 px-8 rounded-md hover:bg-primary hover:text-white transition-all w-full"
            >
              Back to Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
