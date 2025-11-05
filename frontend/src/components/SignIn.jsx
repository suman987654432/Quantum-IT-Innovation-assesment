import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://quantum-it-innovation-assesment-1.onrender.com/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        alert('Login successful!');
        navigate('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#04b6c9] px-4 sm:px-0">
      <div className="w-full max-w-[450px] sm:w-[450px] rounded-xl overflow-hidden shadow-2xl">
        
        <div className="bg-[#00e3fc] text-[#2a3441] font-bold text-lg sm:text-xl py-4 sm:py-5 text-center">
          SIGN IN
        </div>

        <div className="bg-[#202a3c] px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 bg-[#303A50] border-gray-600 rounded-full flex items-center justify-center">
              <FaUser className="text-4xl sm:text-6xl text-gray-400" />
            </div>
          </div>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="relative mb-5 sm:mb-6">
              <FaUser className="absolute top-3.5 left-4 text-gray-400 text-sm" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-[#364159] text-white pl-12 pr-4 py-3 rounded-md outline-none placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            <div className="relative mb-5 sm:mb-6">
              <FaLock className="absolute top-3.5 left-4 text-gray-400 text-sm" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full bg-[#364159] text-white pl-12 pr-4 py-3 rounded-md outline-none placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 text-xs sm:text-sm mb-6 sm:mb-8">
              <label className="flex items-center text-cyan-400">
                <input
                  type="checkbox"
                  className="mr-2 w-3 h-3 sm:w-4 sm:h-4 accent-cyan-400"
                />
                Remember me
              </label>
              <a href="#" className="text-cyan-400 hover:underline">
                Forgot your password?
              </a>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-400 hover:bg-cyan-500 disabled:bg-gray-500 text-[#2a3441] font-bold py-3 rounded-md transition duration-200 text-sm sm:text-base"
            >
              {loading ? 'SIGNING IN...' : 'LOGIN'}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-400 text-sm">Don't have an account? </span>
            <button 
              onClick={() => navigate('/signup')}
              className="text-cyan-400 hover:underline text-sm font-semibold bg-transparent border-none cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
