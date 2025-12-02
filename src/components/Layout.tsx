import { Outlet, NavLink } from 'react-router-dom';
import { Home, Search, PlusSquare, User, LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

export default function Layout() {
  const dispatch = useDispatch();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: PlusSquare, label: 'Create', path: '/create' }, // Modal trigger biasanya
    { icon: User, label: 'Profile', path: '/me' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row justify-center">
      {/* DESKTOP SIDEBAR (Hidden on Mobile, Visible on MD) */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r bg-white p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-8">Sociality</h1>
        <nav className="flex-1 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <item.icon size={24} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button onClick={() => dispatch(logout())} className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-lg mt-auto">
           <LogOut size={24} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-xl w-full pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* MOBILE BOTTOM BAR (Visible on Mobile, Hidden on MD) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around p-3 z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`
            }
          >
            <item.icon size={24} />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}