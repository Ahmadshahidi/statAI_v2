import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { User, LogOut, BarChart2, BookOpen, Calendar, Settings } from 'lucide-react';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { signOut, profile, isAdmin } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <BarChart2 size={18} />
    },
    {
      label: 'My Courses',
      path: '/my-courses',
      icon: <BookOpen size={18} />
    },
    {
      label: 'Consultations',
      path: '/consultations',
      icon: <Calendar size={18} />
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: <User size={18} />
    }
  ];

  // Add admin menu items if user is admin
  if (isAdmin) {
    menuItems.push({
      label: 'Admin Panel',
      path: '/admin',
      icon: <Settings size={18} />,
      isAdmin: true
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User size={16} />
          )}
        </div>
        <span className="font-medium text-primary-900">
          {profile?.first_name || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900 truncate">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {profile?.email}
              </p>
            </div>

            <div className="py-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    item.isAdmin ? 'text-secondary-600 font-medium' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut size={18} className="mr-2" />
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;