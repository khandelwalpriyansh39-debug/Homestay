import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import Navbar from "../componets/Navbar";

export default function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmpassword: "",
    userType: "guest",
    terms: false,
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    if (formData.password !== formData.confirmpassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/SignUp",
        formData
      );

      if (res.data.success) {
        setSuccess(true);
        setMessage(res.data.msg || "Signup successful! Redirecting...");
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setMessage(res.data.msg || "Signup failed.");
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="signup-bg">
        <div className="circle-pink"></div>
        <div className="circle-purple"></div>

        <div className="signup-card">
          <h2>Join Homestay</h2>
          <p>Create your account and start your journey 🏡</p>

          {message && (
            <div className={success ? "message success" : "message error"}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="input-field"
              required
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="input-field"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-field"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input-field"
              required
            />
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="input-field"
              required
            />

            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="guest">Guest</option>
              <option value="host">Host</option>
            </select>

            <div className="terms-row">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms">I agree to the terms and conditions</label>
            </div>

            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>

          <p className="signup-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     confirmpassword: "",
//     userType: "guest", // ✅ Default value to avoid empty userType
//     terms: false,
//   });

//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       console.log("Data sent to backend:", formData); // ✅ Debugging
//       const res = await axios.post("http://localhost:5000/api/auth/SignUp", formData);

//       if (res.data.success) {
//         setMessage(res.data.msg || "Signup successful!");
//         navigate("/home");
//       } else {
//         setMessage(res.data.msg || "Signup failed.");
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.msg || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
//           Signup Page
//         </h1>

//         {message && (
//           <p className="text-center mb-4 text-red-500 font-medium">{message}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* First Name */}
//           <div>
//             <label className="block text-gray-600">First Name</label>
//             <input
//               type="text"
//               name="first_name"
//               value={formData.first_name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="block text-gray-600">Last Name</label>
//             <input
//               type="text"
//               name="last_name"
//               value={formData.last_name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-600">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-600">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-gray-600">Confirm Password</label>
//             <input
//               type="password"
//               name="confirmpassword"
//               value={formData.confirmpassword}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>

//           {/* User Type */}
//           <div>
//             <label className="block text-gray-600">User Type</label>
//             <select
//               name="userType"
//               value={formData.userType}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               required
//             >
//               <option value="guest">Guest</option>
//               <option value="host">Host</option>
//             </select>
//           </div>

//           {/* Terms and Conditions */}
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="terms"
//               checked={formData.terms}
//               onChange={handleChange}
//               className="mr-2"
//               required
//             />
//             <span className="text-gray-600 text-sm">
//               I agree to the terms and conditions
//             </span>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Signup
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
