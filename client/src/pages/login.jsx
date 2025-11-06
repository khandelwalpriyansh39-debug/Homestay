import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(res.data.msg);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Failed to login");
    }
  };

  return (
    <>
      <style>{`
        .auth-wrapper {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(239, 232, 228);
          font-family: "Poppins", sans-serif;
        }

        .auth-card {
          background: rgba(255,255,255,0.95);
          padding: 2rem 1.8rem;
          border-radius: 1.5rem;
          box-shadow:
            0 4px 12px rgba(210,180,140,0.15),
            0 8px 24px rgba(210,180,140,0.15),
            0 12px 32px rgba(210,180,140,0.2);
          width: 95%;
          max-width: 400px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.8s ease;
        }

        .auth-card h2 {
          color: #896c6c;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .auth-card p {
          color: #6b7280;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }

        .message {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1rem;
          color: #e63946;
        }

        .input-field {
          padding: 0.7rem;
          border: 1px solid #e5beb5;
          border-radius: 1rem;
          outline: none;
          transition: all 0.3s ease;
          width: 100%;
          font-size: 1rem;
          background: #fdfcfb;
          color: #1a1a1a; /* ✅ visible text */
          margin-bottom: 1rem;
        }

        .input-field:focus {
          border-color: #896c6c;
          box-shadow: 0 0 6px rgba(137,108,108,0.3);
        }

        .submit-btn {
          padding: 0.8rem;
          background: linear-gradient(to right, #896c6c, #e5beb5);
          color: #fff;
          font-weight: 600;
          border-radius: 1rem;
          box-shadow: 0 4px 14px rgba(137,108,108,0.2);
          transition: transform 0.3s, background 0.3s;
          width: 100%;
          font-size: 1rem;
          border: none;
          cursor: pointer;
        }

        .submit-btn:hover {
          transform: scale(1.05);
          background: linear-gradient(to right, #eee6ca, #896c6c);
        }


        .footer-row a {
          color: #4f46e5;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-row a:hover {
          text-decoration: underline;
        }

        .footer-right {
          color: #6b7280;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* 🌙 Dark mode fix */
        @media (prefers-color-scheme: dark) {
          body, .auth-wrapper {
            background: rgb(239, 232, 228) !important;
            color: #1a1a1a !important;
          }
          .auth-card {
            background: rgba(255,255,255,0.97) !important;
            color: #1a1a1a !important;
          }
          .input-field {
            background: #fdfcfb !important;
            color: #1a1a1a !important;
          }
          .auth-card h2 {
            color: #896c6c !important;
          }
          .footer-row a {
            color: #4f46e5 !important;
          }
        }
      `}</style>

      <div className="auth-wrapper">
        <form onSubmit={handleLogin} className="auth-card">
          <h2>Login</h2>
          <p>Welcome back! Please log in to continue.</p>

          {message && <div className="message">{message}</div>}

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
            placeholder="Enter your password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="submit-btn">Login</button>

          <div className="footer-row">
            <a href="/reset-password">Forgot Password?</a>
            <span className="footer-right">
              New User? <a href="/signup">Sign Up</a>
            </span>
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

axios.defaults.withCredentials = true; // ✅ allow cookies

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      if (res.data.success) {
        navigate("/home");
      } else {
        setErrors([res.data.msg || "Login failed"]);
      }
    } catch (err) {
      console.error(err);
      setErrors([err.response?.data?.msg || "Something went wrong!"]);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-600 p-2 mb-3 rounded">
            {errors.map((err, i) => <p key={i}>{err}</p>)}
          </div>
        )}

        <input type="email" placeholder="Email" className="w-full border p-2 mb-3 rounded focus:ring-2 focus:ring-blue-400"
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" className="w-full border p-2 mb-3 rounded focus:ring-2 focus:ring-blue-400"
          value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Login
        </button>

        <div className="flex justify-between mt-3 text-sm">
          <a href="/reset-password" className="text-blue-500 hover:underline">Forgot Password?</a>
          <a href="/signup" className="text-blue-500 hover:underline">New User? Sign Up</a>
        </div>
      </form>
    </div>
  );
}*/
