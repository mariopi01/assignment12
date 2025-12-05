// // import { Search, Menu } from 'lucide-react';
// // import { useSelector } from 'react-redux';
// // import { Link } from 'react-router-dom';
// // import type { RootState } from '../store';

// // export default function Header() {
// //   // Mengambil state auth dari Redux
// //   const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

// //   return (
// //     <header 
// //       className="w-full h-20 flex justify-between items-center bg-black border-b border-[#181D27] sticky top-0 z-50"
// //       style={{
// //         // Menggunakan style spesifik sesuai request, namun responsif
// //         maxWidth: '1440px',
// //         margin: '0 auto',
// //       }}
// //     >
// //       {/* Padding container diatur responsif: default px-6, desktop md:px-[120px] */}
// //       <div className="w-full h-full flex justify-between items-center px-6 md:px-[120px]">
        
// //         {/* 1. LOGO & TEXT (Left) */}
// //         <Link to="/" className="flex items-center gap-3">
// //           <img 
// //             src="/logo_sociality.png" 
// //             alt="Sociality" 
// //             className="w-8 h-8 object-contain"
// //             onError={(e) => { e.currentTarget.style.display = 'none'; }} 
// //           />
// //           <span className="text-[#FDFDFD] font-bold text-xl tracking-tight font-sans">
// //             Sociality
// //           </span>
// //         </Link>

// //         {/* 2. SEARCH BOX (Center) */}
// //         {/* Desktop View: Search Box Lengkap */}
// //         <div className="hidden md:flex items-center w-[491px] h-12 bg-[#0A0D12] border border-[#181D27] rounded-full px-4 gap-2">
// //           <Search className="text-gray-500" size={20} />
// //           <input 
// //             type="text" 
// //             placeholder="Search" 
// //             className="bg-transparent border-none outline-none text-[#FDFDFD] placeholder-gray-500 w-full text-sm"
// //           />
// //         </div>
// //         {/* Mobile View: Hanya Icon */}
// //         <button className="md:hidden text-[#FDFDFD]">
// //           <Search size={24} />
// //         </button>

// //         {/* 3, 4, 5. RIGHT SIDE ACTIONS */}
// //         <div className="flex items-center gap-4">
// //           {isAuthenticated && user ? (
// //             // 5. SETELAH LOGIN: Avatar + Username
// //             <Link to={`/users/${user.username}`} className="flex items-center gap-3">
// //               <img 
// //                 src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username}&background=random`} 
// //                 alt={user.username}
// //                 className="w-10 h-10 rounded-full border border-[#181D27] object-cover" 
// //               />
// //               <span className="text-[#FDFDFD] font-bold text-sm hidden md:block">
// //                 {user.name || user.username}
// //               </span>
// //             </Link>
// //           ) : (
// //             // SEBELUM LOGIN
// //             <>
// //               {/* Desktop View: Login & Register Buttons */}
// //               <div className="hidden md:flex gap-4">
// //                 {/* 3. Login Button */}
// //                 <Link 
// //                   to="/login"
// //                   className="w-[130px] h-11 flex items-center justify-center rounded-full border border-[#181D27] text-[#FDFDFD] font-bold text-sm hover:bg-[#181D27] transition-colors"
// //                 >
// //                   Login
// //                 </Link>
// //                 {/* 4. Register Button */}
// //                 <Link 
// //                   to="/register"
// //                   className="w-[130px] h-11 flex items-center justify-center rounded-full bg-[#6936F2] text-[#FDFDFD] font-bold text-sm hover:bg-[#5b2ed1] transition-colors"
// //                 >
// //                   Register
// //                 </Link>
// //               </div>
              
// //               {/* Mobile View: Burger Icon */}
// //               <button className="md:hidden text-[#FDFDFD]">
// //                 <Menu size={24} />
// //               </button>
// //             </>
// //           )}
// //         </div>

// //       </div>
// //     </header>
// //   );
// // }


// import { Search, Menu, LogOut, User } from 'lucide-react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useRef, useEffect } from 'react';
// import type { RootState } from '../store';
// import { logout } from '../store/authSlice';

// export default function Header() {
//   const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // State untuk dropdown
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Tutup dropdown jika klik di luar area
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [dropdownRef]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//     setIsDropdownOpen(false);
//   };

//   return (
//     <header 
//       className="w-full h-20 flex justify-between items-center bg-black border-b border-[#181D27] sticky top-0 z-50"
//       style={{
//         maxWidth: '1440px',
//         margin: '0 auto',
//       }}
//     >
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
//         <div className="hidden md:flex items-center w-[491px] h-12 bg-[#0A0D12] border border-[#181D27] rounded-full px-4 gap-2">
//           <Search className="text-gray-500" size={20} />
//           <input 
//             type="text" 
//             placeholder="Search" 
//             className="bg-transparent border-none outline-none text-[#FDFDFD] placeholder-gray-500 w-full text-sm"
//           />
//         </div>
//         <button className="md:hidden text-[#FDFDFD]">
//           <Search size={24} />
//         </button>

//         {/* 3, 4, 5. RIGHT SIDE ACTIONS */}
//         <div className="flex items-center gap-4">
//           {isAuthenticated && user ? (
//             // 5. SETELAH LOGIN: Avatar + Username dengan Dropdown
//             <div className="relative" ref={dropdownRef}>
//               <button 
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center gap-3 focus:outline-none"
//               >
//                 <img 
//                   src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username}&background=random`} 
//                   alt={user.username}
//                   className="w-10 h-10 rounded-full border border-[#181D27] object-cover" 
//                 />
//                 <span className="text-[#FDFDFD] font-bold text-sm hidden md:block">
//                   {user.name || user.username}
//                 </span>
//               </button>

//               {/* Dropdown Menu */}
//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-[#0A0D12] border border-[#181D27] rounded-xl shadow-lg py-1 z-50">
//                   <Link 
//                     to="/me" 
//                     className="flex items-center gap-2 px-4 py-3 text-sm text-[#FDFDFD] hover:bg-[#181D27] transition-colors"
//                     onClick={() => setIsDropdownOpen(false)}
//                   >
//                     <User size={16} />
//                     My Profile
//                   </Link>
//                   <button 
//                     onClick={handleLogout}
//                     className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-[#181D27] transition-colors text-left"
//                   >
//                     <LogOut size={16} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             // SEBELUM LOGIN
//             <>
//               <div className="hidden md:flex gap-4">
//                 <Link 
//                   to="/login"
//                   className="w-[130px] h-11 flex items-center justify-center rounded-full border border-[#181D27] text-[#FDFDFD] font-bold text-sm hover:bg-[#181D27] transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   to="/register"
//                   className="w-[130px] h-11 flex items-center justify-center rounded-full bg-[#6936F2] text-[#FDFDFD] font-bold text-sm hover:bg-[#5b2ed1] transition-colors"
//                 >
//                   Register
//                 </Link>
//               </div>
              
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
import { useQuery } from '@tanstack/react-query';
import type { RootState } from '../store';
import { logout } from '../store/authSlice';
import api from '../lib/axios';

// Hook Debounce sederhana
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

interface SearchUser {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
}

export default function Header() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State untuk dropdown profil
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // State untuk Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch User Profile Data (untuk Avatar & Name yang up-to-date)
  const { data: userData } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      if (!isAuthenticated) return null;
      const res = await api.get('/api/me');
      return res.data.data.profile;
    },
    enabled: isAuthenticated, // Hanya fetch jika login
  });

  // 2. Fetch Search Results (Live Search)
  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) return [];
      const res = await api.get(`/api/users/search?q=${debouncedSearch}&page=1&limit=5`);
      return res.data.data.users as SearchUser[];
    },
    enabled: debouncedSearch.length > 0,
  });

  // Handler Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsProfileDropdownOpen(false);
  };

  // Click Outside Handler (untuk menutup dropdown search & profile)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Tutup Profile Dropdown
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      // Tutup Search Dropdown
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img 
            src="/logo_sociality.png" 
            alt="Sociality" 
            className="w-8 h-8 object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          />
          <span className="text-[#FDFDFD] font-bold text-xl tracking-tight font-sans hidden sm:block">
            Sociality
          </span>
        </Link>

        {/* 2. SEARCH BOX (Center) */}
        <div className="flex-1 flex justify-center px-4 relative" ref={searchContainerRef}>
            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center w-full max-w-[491px] h-12 bg-[#0A0D12] border border-[#181D27] rounded-full px-4 gap-2 relative z-20">
              <Search className="text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none outline-none text-[#FDFDFD] placeholder-gray-500 w-full text-sm"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
              />
            </div>

            {/* Mobile Search Icon (Bisa dikembangkan jadi modal/expand search jika perlu, saat ini simpel) */}
            <button className="md:hidden text-[#FDFDFD]">
              <Search size={24} />
            </button>

            {/* Search Results Dropdown */}
            {isSearchOpen && searchQuery && (
                <div className="absolute top-14 w-full max-w-[491px] bg-[#0A0D12] border border-[#181D27] rounded-xl shadow-2xl overflow-hidden z-10">
                    {isSearching ? (
                        <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                    ) : searchResults && searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((user) => (
                                <li key={user.id}>
                                    <Link 
                                        to={`/users/${user.username}`}
                                        className="flex items-center gap-3 p-3 hover:bg-[#181D27] transition-colors border-b border-[#181D27] last:border-none"
                                        onClick={() => {
                                            setIsSearchOpen(false);
                                            setSearchQuery('');
                                        }}
                                    >
                                        <img 
                                            src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username}&background=random`} 
                                            alt={user.username}
                                            className="w-10 h-10 rounded-full border border-[#181D27] object-cover"
                                        />
                                        <div>
                                            <p className="text-[#FDFDFD] font-bold text-sm">{user.username}</p>
                                            <p className="text-gray-500 text-xs">{user.name}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">User not found</div>
                    )}
                </div>
            )}
        </div>

        {/* 3, 4, 5. RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-4 shrink-0">
          {isAuthenticated && userData ? (
            // 5. SETELAH LOGIN: Avatar + Username dengan Dropdown
            <div className="relative" ref={profileDropdownRef}>
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 focus:outline-none"
              >
                <img 
                  src={userData.avatarUrl || `https://ui-avatars.com/api/?name=${userData.username}&background=random`} 
                  alt={userData.username}
                  className="w-10 h-10 rounded-full border border-[#181D27] object-cover" 
                />
                <span className="text-[#FDFDFD] font-bold text-sm hidden md:block">
                  {userData.name || userData.username}
                </span>
              </button>

              {/* Dropdown Menu Profile */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0A0D12] border border-[#181D27] rounded-xl shadow-lg py-1 z-50">
                  <Link 
                    to="/me" 
                    className="flex items-center gap-2 px-4 py-3 text-sm text-[#FDFDFD] hover:bg-[#181D27] transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
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