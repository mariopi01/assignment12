// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';
// import { Search } from 'lucide-react';
// import api from '../lib/axios';

// // Hook Debounce sederhana
// function useDebounce(value: string, delay: number) {
//   const [debouncedValue, setDebouncedValue] = useState(value);
//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);
//   return debouncedValue;
// }

// export default function SearchUsers() {
//   const [query, setQuery] = useState('');
//   const debouncedQuery = useDebounce(query, 500); // Tunggu 500ms

//   const { data, isLoading } = useQuery({
//     queryKey: ['search', debouncedQuery],
//     queryFn: async () => {
//       if (!debouncedQuery) return { users: [] };
//       const res = await api.get(`/api/users/search?q=${debouncedQuery}&limit=20`); // [cite: 170]
//       return res.data.data;
//     },
//     enabled: debouncedQuery.length > 0,
//   });

//   return (
//     <div className="p-4">
//       <div className="relative mb-6">
//         <Search className="absolute left-3 top-3 text-gray-400" size={20} />
//         <input 
//           type="text" 
//           placeholder="Cari user..." 
//           className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//       </div>

//       {isLoading && <p className="text-center text-gray-500">Mencari...</p>}

//       <div className="space-y-4">
//         {data?.users?.map((user: any) => (
//           <Link key={user.id} to={`/users/${user.username}`} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
//              <img 
//                src={user.avatarUrl || "https://via.placeholder.com/40"} 
//                className="w-12 h-12 rounded-full bg-gray-200 object-cover" 
//              />
//              <div>
//                <p className="font-bold">{user.username}</p>
//                <p className="text-sm text-gray-500">{user.name}</p>
//              </div>
//           </Link>
//         ))}
//         {debouncedQuery && data?.users?.length === 0 && (
//            <p className="text-center text-gray-400">User tidak ditemukan.</p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../lib/axios';

// Interface untuk struktur data User
interface SearchUser {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
}

// Interface untuk struktur respons API
interface SearchResponse {
  users: SearchUser[];
}

// Hook Debounce sederhana
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchUsers() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // Tunggu 500ms

  const { data, isLoading } = useQuery<SearchResponse>({
    queryKey: ['search', debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return { users: [] };
      const res = await api.get(`/api/users/search?q=${debouncedQuery}&limit=20`);
      return res.data.data;
    },
    enabled: debouncedQuery.length > 0,
  });

  return (
    <div className="p-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Cari user..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading && <p className="text-center text-gray-500">Mencari...</p>}

      <div className="space-y-4">
        {/* Fix: Menggunakan tipe SearchUser daripada any */}
        {data?.users?.map((user: SearchUser) => (
          <Link key={user.id} to={`/users/${user.username}`} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
             <img 
               src={user.avatarUrl || "https://via.placeholder.com/40"} 
               alt={user.username}
               className="w-12 h-12 rounded-full bg-gray-200 object-cover" 
             />
             <div>
               <p className="font-bold">{user.username}</p>
               <p className="text-sm text-gray-500">{user.name}</p>
             </div>
          </Link>
        ))}
        {debouncedQuery && data?.users?.length === 0 && (
           <p className="text-center text-gray-400">User tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}