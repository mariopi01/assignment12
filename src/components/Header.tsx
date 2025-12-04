// import { Search, Menu } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import type { RootState } from '../store';

// export default function Header() {
//   // Mengambil state auth dari Redux
//   const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

//   return (
//     <header 
//       className="w-full h-20 flex justify-between items-center bg-black border-b border-[#181D27] sticky top-0 z-50"
//       style={{
//         // Menggunakan style spesifik sesuai request, namun responsif
//         maxWidth: '1440px',
//         margin: '0 auto',
//       }}
//     >
//       {/* Padding container diatur responsif: default px-6, desktop md:px-[120px] */}
//       <div className="w-full h-full flex justify-between items-center px-6 md:px-[120px]">
        
//         {/* 1. LOGO & TEXT (Left) */}
//         <Link to="/" className="flex items-center gap-3">
//           <img 
//             src="/logo_sociality.png" 
//             alt="Sociality" 
//             className="w-8 h-8 object-contain"
//             onError={(e) => { e.currentTarget.style.display = 'none'; }} 
//           />
//           <span className="text-[#FDFDFD] font-bold text-xl tracking-tight font-sans">
//             Sociality
//           </span>
//         </Link>

//         {/* 2. SEARCH BOX (Center) */}
//         {/* Desktop View: Search Box Lengkap */}
//         <div className="hidden md:flex items-center w-[491px] h-12 bg-[#0A0D12] border border-[#181D27] rounded-full px-4 gap-2">
//           <Search className="text-gray-500" size={20} />
//           <input 
//             type="text" 
//             placeholder="Search" 
//             className="bg-transparent border-none outline-none text-[#FDFDFD] placeholder-gray-500 w-full text-sm"
//           />
//         </div>
//         {/* Mobile View: Hanya Icon */}
//         <button className="md:hidden text-[#FDFDFD]">
//           <Search size={24} />
//         </button>

//         {/* 3, 4, 5. RIGHT SIDE ACTIONS */}
//         <div className="flex items-center gap-4">
//           {isAuthenticated && user ? (
//             // 5. SETELAH LOGIN: Avatar + Username
//             <Link to={`/users/${user.username}`} className="flex items-center gap-3">
//               <img 
//                 src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username}&background=random`} 
//                 alt={user.username}
//                 className="w-10 h-10 rounded-full border border-[#181D27] object-cover" 
//               />
//               <span className="text-[#FDFDFD] font-bold text-sm hidden md:block">
//                 {user.name || user.username}
//               </span>
//             </Link>
//           ) : (
//             // SEBELUM LOGIN
//             <>
//               {/* Desktop View: Login & Register Buttons */}
//               <div className="hidden md:flex gap-4">
//                 {/* 3. Login Button */}
//                 <Link 
//                   to="/login"
//                   className="w-[130px] h-11 flex items-center justify-center rounded-full border border-[#181D27] text-[#FDFDFD] font-bold text-sm hover:bg-[#181D27] transition-colors"
//                 >
//                   Login
//                 </Link>
//                 {/* 4. Register Button */}
//                 <Link 
//                   to="/register"
//                   className="w-[130px] h-11 flex items-center justify-center rounded-full bg-[#6936F2] text-[#FDFDFD] font-bold text-sm hover:bg-[#5b2ed1] transition-colors"
//                 >
//                   Register
//                 </Link>
//               </div>
              
//               {/* Mobile View: Burger Icon */}
//               <button className="md:hidden text-[#FDFDFD]">
//                 <Menu size={24} />
//               </button>
//             </>
//           )}
//         </div>

//       </div>
//     </header>
//   );
// }


import { Search, Menu, LogOut, User } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';

export default function Header() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State untuk dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsDropdownOpen(false);
  };

  return (
    <header 
      className="w-full h-20 flex justify-between items-center bg-black border-b border-[#181D27] sticky top-0 z-50"
      style={{
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <div className="w-full h-full flex justify-between items-center px-6 md:px-[120px]">
        
        {/* 1. LOGO & TEXT (Left) */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/logo_sociality.png" 
            alt="Sociality" 
            className="w-8 h-8 object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <span className="text-[#FDFDFD] font-bold text-xl tracking-tight font-sans">
            Sociality
          </span>
        </Link>

        {/* 2. SEARCH BOX (Center) */}
        <div className="hidden md:flex items-center w-[491px] h-12 bg-[#0A0D12] border border-[#181D27] rounded-full px-4 gap-2">
          <Search className="text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-[#FDFDFD] placeholder-gray-500 w-full text-sm"
          />
        </div>
        <button className="md:hidden text-[#FDFDFD]">
          <Search size={24} />
        </button>

        {/* 3, 4, 5. RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            // 5. SETELAH LOGIN: Avatar + Username dengan Dropdown
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 focus:outline-none"
              >
                <img 
                  src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username}&background=random`} 
                  alt={user.username}
                  className="w-10 h-10 rounded-full border border-[#181D27] object-cover" 
                />
                <span className="text-[#FDFDFD] font-bold text-sm hidden md:block">
                  {user.name || user.username}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0A0D12] border border-[#181D27] rounded-xl shadow-lg py-1 z-50">
                  <Link 
                    to="/me" 
                    className="flex items-center gap-2 px-4 py-3 text-sm text-[#FDFDFD] hover:bg-[#181D27] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User size={16} />
                    My Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-[#181D27] transition-colors text-left"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // SEBELUM LOGIN
            <>
              <div className="hidden md:flex gap-4">
                <Link 
                  to="/login"
                  className="w-[130px] h-11 flex items-center justify-center rounded-full border border-[#181D27] text-[#FDFDFD] font-bold text-sm hover:bg-[#181D27] transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="w-[130px] h-11 flex items-center justify-center rounded-full bg-[#6936F2] text-[#FDFDFD] font-bold text-sm hover:bg-[#5b2ed1] transition-colors"
                >
                  Register
                </Link>
              </div>
              
              <button className="md:hidden text-[#FDFDFD]">
                <Menu size={24} />
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}