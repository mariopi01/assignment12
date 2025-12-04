// // import { Outlet, NavLink } from 'react-router-dom';
// // import { Home, Search, PlusSquare, User, LogOut } from 'lucide-react';
// // import { useDispatch } from 'react-redux';
// // import { logout } from '../store/authSlice';

// // export default function Layout() {
// //   const dispatch = useDispatch();

// //   const navItems = [
// //     { icon: Home, label: 'Home', path: '/' },
// //     { icon: Search, label: 'Search', path: '/search' },
// //     { icon: PlusSquare, label: 'Create', path: '/create' }, // Modal trigger biasanya
// //     { icon: User, label: 'Profile', path: '/me' },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row justify-center">
// //       {/* DESKTOP SIDEBAR (Hidden on Mobile, Visible on MD) */}
// //       <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r bg-white p-6">
// //         <h1 className="text-2xl font-bold text-blue-600 mb-8">Sociality</h1>
// //         <nav className="flex-1 space-y-4">
// //           {navItems.map((item) => (
// //             <NavLink
// //               key={item.path}
// //               to={item.path}
// //               className={({ isActive }) =>
// //                 `flex items-center gap-3 p-3 rounded-lg transition ${
// //                   isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'
// //                 }`
// //               }
// //             >
// //               <item.icon size={24} />
// //               <span>{item.label}</span>
// //             </NavLink>
// //           ))}
// //         </nav>
// //         <button onClick={() => dispatch(logout())} className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-lg mt-auto">
// //            <LogOut size={24} /> Logout
// //         </button>
// //       </aside>

// //       {/* MAIN CONTENT AREA */}
// //       <main className="flex-1 max-w-xl w-full pb-20 md:pb-0">
// //         <Outlet />
// //       </main>

// //       {/* MOBILE BOTTOM BAR (Visible on Mobile, Hidden on MD) */}
// //       <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around p-3 z-50">
// //         {navItems.map((item) => (
// //           <NavLink
// //             key={item.path}
// //             to={item.path}
// //             className={({ isActive }) =>
// //               `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`
// //             }
// //           >
// //             <item.icon size={24} />
// //             <span className="text-xs">{item.label}</span>
// //           </NavLink>
// //         ))}
// //       </nav>
// //     </div>
// //   );
// // }

// import { Outlet, NavLink } from 'react-router-dom';
// import { Home, Search, PlusSquare, User } from 'lucide-react';

// export default function Layout() {
//   const navItems = [
//     { icon: Home, label: 'Home', path: '/' },
//     { icon: Search, label: 'Search', path: '/search' },
//     { icon: PlusSquare, label: 'Create', path: '/create' }, 
//     { icon: User, label: 'Profile', path: '/me' },
//   ];

//   return (
//     // Container utama: Sidebar dihapus, konten dipusatkan
//     <div className="min-h-screen flex justify-center">
      
//       {/* MAIN CONTENT AREA */}
//       <main className="w-full  pb-20 md:pb-0">
//         <Outlet />
//       </main>

//       {/* MOBILE BOTTOM BAR (Tetap ada untuk navigasi di mobile) */}
//       <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around p-3 z-50">
//         {navItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex flex-col items-center gap-1 ${isActive ? 'text-blue-600' : 'text-gray-500'}`
//             }
//           >
//             <item.icon size={24} />
//             <span className="text-xs">{item.label}</span>
//           </NavLink>
//         ))}
//       </nav>
//     </div>
//   );
// }


import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#000000]">
      
      {/* MAIN CONTENT AREA */}
      {/* Tambahkan padding-bottom (pb-32) agar konten paling bawah tidak tertutup navigation bar */}
      <main className="w-full pb-32">
        <Outlet />
      </main>

      {/* FLOATING NAVIGATION (Bottom Center) */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div 
          className="flex items-center justify-center bg-[#0A0D12] border border-[#181D27] rounded-full shadow-lg"
          style={{
            width: '360px',
            height: '80px',
            gap: '45px'
          }}
        >
            {/* Left: Home */}
            <Link 
              to="/" 
              className="flex items-center justify-center hover:scale-110 transition-transform"
            >
                <img 
                  src="/Home_menu.png" 
                  alt="Home" 
                  className="w-[94px] h-[58px] object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
            </Link>

            {/* Center: Add Post */}
            <Link 
              to="/create" 
              className="flex items-center justify-center hover:scale-110 transition-transform"
            >
                <img 
                  src="/Add_menu.png" 
                  alt="Create" 
                  className="w-[54px] h-[54px] object-contain" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
            </Link>

            {/* Right: Profile */}
            <Link 
              to="/me" 
              className="flex items-center justify-center hover:scale-110 transition-transform"
            >
                <img 
                  src="/Profile_menu.png" 
                  alt="Profile" 
                  className=" w-[94px] h-[58px] object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                />
            </Link>
        </div>
      </div>

    </div>
  );
}