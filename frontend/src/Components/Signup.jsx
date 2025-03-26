import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Name validation: only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = 'Name can only contain letters and spaces.';
    }
  
    // Email validation: basic format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
  
    // Password validation: minimum 8 characters, at least one letter and one number
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }
    // Check if the email is already registered
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExist = existingUsers.some((user) => user.email === email);
    if (isUserExist) {
      newErrors.email = 'This email is already registered. Please use a different email.';
    }
  
    // If there are errors, update the state and return early
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Proceed with user registration
    const newUser = { name, email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('Signup successful!');
    setName('');
    setEmail('');
    setPassword('');
    setErrors({});
    navigate('/login');
  };
  

  return (
    <div className="pt-10 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
      Full Name
    </label>
    <input
      type="text"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      placeholder="Nitin Gojiya"
    />
    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
  </div>
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email Address
    </label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      placeholder="nitingojiya2000@gmail.com"
    />
    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
  </div>
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
      Password
    </label>
    <input
     type={showPassword ? 'text' : 'password'}
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      
      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
      placeholder="*********"
    />
    <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="relative  top-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3C5.454 3 1.73 6.11.458 10c1.272 3.89 4.996 7 9.542 7s8.27-3.11 9.542-7c-1.272-3.89-4.996-7-9.542-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                    <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M.458 10c1.272-3.89 4.996-7 9.542-7s8.27 3.11 9.542 7c-1.272 3.89-4.996 7-9.542 7s-8.27-3.11-9.542-7zm9.542 5a5 5 0 100-10 5 5 0 000 10z"
                      clipRule="evenodd"
                    />
                    <path d="M10 7a3 3 0 110 6 3 3 0 010-6z" />
                  </svg>
                )}
  </button>
    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
  </div>
  <div>
 
  </div>
  <div>
    <button
      type="submit"
      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Sign Up
    </button>
  </div>
  <div>
    <a href='/login' className="link link-accent">Already have an account? Login</a>
  </div>
</form>

      </div>
    </div>
  );
};

export default Signup;
