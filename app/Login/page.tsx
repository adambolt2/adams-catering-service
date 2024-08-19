'use client';
import React, { useState, useEffect } from 'react';
import { useLogin } from '../Context/LoginContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '../api/loginApi';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import { fetchAndStoreAdminToken } from '../api/authApi';

type Props = {};

const Login = (props: Props) => {
  const { isLoggedIn, login } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null); // Store decoded token information
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.back();
      // using back for now, shouldnt break anything as token should be generated anyway
    }
  }, [isLoggedIn, router]);


  useEffect(() => {
    fetchAndStoreAdminToken(); // Call the function to fetch and store the token when the component mounts
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(email, password);
      const decodedToken = jwtDecode(data.token); // Decode the JWT token
      setUserInfo(decodedToken); // Store the decoded token information
      sessionStorage.setItem('UserToken', data.token);
      sessionStorage.setItem('UserInfo', JSON.stringify(decodedToken)); // Store the user info in sessionStorage
      login(); 
      router.push('/');
    } catch (error) {
      setError('Failed to login. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      
      {!isLoggedIn && (
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded-full w-full font-semibold transition duration-300 ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="mt-4 text-center">
            <Link href="/register" className="text-blue-500 hover:underline">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
