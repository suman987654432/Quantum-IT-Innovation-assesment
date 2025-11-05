import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: ''
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
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Account created successfully!');
        navigate('/');
      } else {
        setError(data.message || 'Signup failed');
      }
    
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    navigate('/signin');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#04b6c9] px-4 sm:px-0">
      <div className="w-full max-w-[450px] sm:w-[450px] rounded-xl overflow-hidden shadow-2xl">
        
        <div className="bg-[#00e3fc] text-[#2a3441] font-bold text-lg sm:text-xl py-4 sm:py-5 text-center">
          SIGN UP
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
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-[#364159] text-white pl-12 pr-4 py-3 rounded-md outline-none placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            <div className="relative mb-5 sm:mb-6">
              <FaCalendarAlt className="absolute top-3.5 left-4 text-gray-400 text-sm" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
                className="w-full bg-[#364159] text-white pl-12 pr-4 py-3 rounded-md outline-none placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            <div className="relative mb-5 sm:mb-6">
              <FaEnvelope className="absolute top-3.5 left-4 text-gray-400 text-sm" />
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
                minLength="6"
                className="w-full bg-[#364159] text-white pl-12 pr-4 py-3 rounded-md outline-none placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-400 hover:bg-cyan-500 disabled:bg-gray-500 text-[#2a3441] font-bold py-3 rounded-md transition duration-200 text-sm sm:text-base"
            >
              {loading ? 'SIGNING UP...' : 'SIGN UP'}
            </button>
          </form>

         
          <div className="text-center mt-6">
            <span className="text-gray-400 text-sm">Already have an account? </span>
            <button 
              onClick={handleSignInClick}
              className="text-cyan-400 hover:underline text-sm font-semibold bg-transparent border-none cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
