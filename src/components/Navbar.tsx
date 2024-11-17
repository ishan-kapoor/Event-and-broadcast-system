import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, LogOut } from 'lucide-react';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl">College Events</span>
          </Link>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <div className="space-x-2">
                  <Link
                    to="/student/login"
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Student Login
                  </Link>
                  <Link
                    to="/faculty/login"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Faculty Login
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;