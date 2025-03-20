import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Get backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const TurnstileVerify = ({ onSuccess }) => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleVerify = async (token) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/verify-turnstile`, { token });
      if (response.data.verified) {
        setVerified(true);
        localStorage.setItem("turnstile_verified", "true");

        if (onSuccess) {
          onSuccess();
        }
      } else {
        console.log("Verification failed");
      }
    } catch (error) {
      console.error("Error verifying Turnstile token", error);
    }
  };

  // ✅ Use `useEffect` to redirect after verification
  useEffect(() => {
    if (verified) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [verified, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {!verified ? (
        <div className="text-center bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Cloudflare Protection
          </h2>
          <div
            className="cf-turnstile"
            data-sitekey="0x4AAAAAABB0uHYRf43VPEkE"
            data-callback={handleVerify}
          ></div>
        </div>
      ) : (
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          ✅ Verification successful! Redirecting...
        </h2>
      )}
    </div>
  );
};

export default TurnstileVerify;
