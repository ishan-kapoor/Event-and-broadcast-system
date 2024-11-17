import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRound, Mail, Lock, BookOpen } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  password: string;
  rollNumber: string;
  department: string;
}

function StudentLogin() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    rollNumber: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Directly navigate to dashboard on submission
      navigate('/student/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {isSignup ? 'Student Registration' : 'Student Login'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isSignup ? 'Create your student account' : 'Welcome back, student!'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="space-y-4">
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="rollNumber"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Roll Number"
                  onChange={handleChange}
                  value={formData.rollNumber}
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="department"
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Department"
                  onChange={handleChange}
                  value={formData.department}
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
              setFormData({
                name: '',
                email: '',
                password: '',
                rollNumber: '',
                department: ''
              });
            }}
            className="text-sm text-blue-600 hover:text-blue-500"
            disabled={isLoading}
          >
            {isSignup
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
