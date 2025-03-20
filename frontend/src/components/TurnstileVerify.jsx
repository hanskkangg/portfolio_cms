import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Get backend URL from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api";


const TurnstileVerify = ({ onSuccess }) => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.onload = () => {
      if (window.turnstile) {
        console.log("✅ Cloudflare Turnstile loaded.");
        window.turnstile.render("#turnstile-container", {
          sitekey: "0x4AAAAAABB0uHYRf43VPEkE",
          callback: async (token) => {
            console.log("🔹 Turnstile token received:", token);
            handleVerify(token);
          },
          errorCallback: () => console.log("❌ Turnstile verification error"),
        });
      }
    };
    document.body.appendChild(script);
  }, []);
  const handleVerify = async (token) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/verify-turnstile`, { token }); // ✅ Correct



      if (response.data.verified) {
        console.log("✅ Verification successful! Redirecting to Home...");

        setVerified(true);
        localStorage.setItem("turnstile_verified", "true");

        if (onSuccess) {
          onSuccess();
        }

        // ✅ Navigate to Home Page after 2 seconds
        setTimeout(() => {
          window.location.href = "/";  // 🔄 Hard refresh to load Home
        }, 2000);
      } else {
        console.log("❌ Verification failed");
      }
    } catch (error) {
      console.error("🚨 Error verifying Turnstile token:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {!verified ? (
        <div className="text-center bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Cloudflare Protection
          </h2>
          <div id="turnstile-container"></div> {/* ✅ Renders Turnstile correctly */}
        </div>
      ) : (
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          ✅ Verification successful! Redirecting to Home...
        </h2>
      )}
    </div>
  );
};

export default TurnstileVerify;
