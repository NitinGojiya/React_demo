import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { login, selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const user = useSelector(selectUser);
  if(user)
  {
    navigate('/details');
  }
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
 const dispatch=useDispatch();
 const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
  
      // Retrieve the stored users array from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  
      // Find the user with the matching email
      const user = storedUsers.find((user) => user.email === email);
  
      if (user) {
        // Check if the entered password matches the stored password
        if (password === user.password) {
          dispatch(
            login({
              name:user.name,
              email:user.email,
              password:user.password,
              loggedIn:true,
            })
          )
          navigate('/details');
          // Proceed with authenticated user actions (e.g., redirecting)
        } else {
          setError('Invalid email or password.');
        }
      } else {
        setError('No user found with this email. Please sign up first.');
      }
    };

  return (
    <div className="pt-10 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="nitingojiya2000@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="******"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
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
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </div>
          <div>
          <a href='/signup' className="link link-accent">dont have account ?signup</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
