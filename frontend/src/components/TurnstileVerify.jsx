import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api";

const TurnstileVerify = ({ onSuccess }) => {
  const [verified, setVerified] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ✅ Track if component is mounted
  const navigate = useNavigate();
  const turnstileRef = useRef(null); // ✅ Reference for Turnstile container

  useEffect(() => {
    setIsMounted(true); // ✅ Mark component as mounted
  }, []);

  useEffect(() => {
    if (!isMounted) return; // ✅ Ensure component is fully mounted before loading Turnstile

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ Cloudflare Turnstile script loaded.");

      if (turnstileRef.current) {
        console.log("🔹 Rendering Turnstile...");
        window.turnstile.render(turnstileRef.current, { // ✅ Pass actual element, not string
          sitekey: "0x4AAAAAABB0uHYRf43VPEkE",
          callback: async (token) => {
            console.log("🔹 Turnstile token received:", token);
            handleVerify(token);
          },
          errorCallback: () => console.log("❌ Turnstile verification error"),
        });
      } else {
        console.error("🚨 Turnstile container not found!");
      }
    };

    document.body.appendChild(script);
  }, [isMounted]); // ✅ Only run when component is mounted

  const handleVerify = async (token) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/verify-turnstile`, { token });

      if (response.data.verified) {
        console.log("✅ Verification successful! Redirecting to Home...");
        setVerified(true);
        localStorage.setItem("turnstile_verified", "true");

        if (onSuccess) onSuccess();

        setTimeout(() => {
          window.location.href = "/";
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
          <div ref={turnstileRef}></div> {/* ✅ Uses ref instead of string selector */}
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
