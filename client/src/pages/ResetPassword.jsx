import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset_password", {
        email,
        password,
        confirmPassword,
      });

      if (res.data.success) {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(res.data.msg);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Failed to reset password");
    }
  };

  return (
    <>
      <style>{`
        .reset-wrapper {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(239, 232, 228);
          font-family: "Poppins", sans-serif;
        }

        .reset-card {
          background: rgba(255, 255, 255, 0.95);
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 
            0 4px 12px rgba(210, 180, 140, 0.15),
            0 8px 24px rgba(210, 180, 140, 0.15),
            0 12px 32px rgba(210, 180, 140, 0.2);
          width: 95%;
          max-width: 400px;
          text-align: center;
        }

        .reset-card h2 {
          color: #896c6c;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .input-field {
          padding: 0.7rem;
          border: 1px solid #e5beb5;
          border-radius: 1rem;
          outline: none;
          width: 100%;
          margin-bottom: 1rem;
          background: #fdfcfb;
          color: #1a1a1a;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .input-field:focus {
          border-color: #896c6c;
          box-shadow: 0 0 6px rgba(137, 108, 108, 0.3);
        }

        .submit-btn {
          padding: 0.8rem;
          width: 100%;
          background: linear-gradient(to right, #896c6c, #e5beb5);
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 1rem;
          cursor: pointer;
          transition: transform 0.3s, background 0.3s;
        }

        .submit-btn:hover {
          transform: scale(1.05);
          background: linear-gradient(to right, #eee6ca, #896c6c);
        }

        .msg-box {
          padding: 0.6rem;
          border-radius: 0.8rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .msg-success {
          background: #e6f9ed;
          color: #15803d;
        }

        .msg-error {
          background: #fde2e1;
          color: #dc2626;
        }

        .reset-footer {
          margin-top: 1rem;
          font-size: 0.9rem;
        }

        .reset-footer a {
          color: #896c6c;
          font-weight: 500;
          text-decoration: none;
        }

        .reset-footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="reset-wrapper">
        <form onSubmit={handleResetPassword} className="reset-card">
          <h2>Reset Password</h2>

          {message && (
            <div
              className={`msg-box ${
                message.includes("successfully") ? "msg-success" : "msg-error"
              }`}
            >
              {message}
            </div>
          )}

          <input
            type="email"
            placeholder="Enter your email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">
            Reset Password
          </button>

          <div className="reset-footer">
            <a href="/login">Back to Login</a>
          </div>
        </form>
      </div>
    </>
  );
}


/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true; //  allow cookies

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset_password", {
        email,
        password,
        confirmPassword
      });

      if (res.data.success) {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(res.data.msg);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleResetPassword} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

        {message && (
          <div className={`p-2 mb-3 rounded ${message.includes("successfully")
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"}`}>
            {message}
          </div>
        )}

        <input type="email" placeholder="Enter your email"
          className="w-full border p-2 mb-3 rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="New Password"
          className="w-full border p-2 mb-3 rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} required />

        <input type="password" placeholder="Confirm Password"
          className="w-full border p-2 mb-3 rounded"
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Reset Password
        </button>

        <div className="mt-3 text-sm text-center">
          <a href="/login" className="text-blue-500 hover:underline">Back to Login</a>
        </div>
      </form>
    </div>
  );
}
*/