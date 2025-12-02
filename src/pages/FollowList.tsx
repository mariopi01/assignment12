import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../lib/axios';

export default function FollowList() {
  const { username } = useParams();
  const location = useLocation();
  
  // Tentukan mode berdasarkan URL (followers atau following)
  const isFollowers = location.pathname.includes('followers');
  const type = isFollowers ? 'followers' : 'following';

  const { data, isLoading } = useQuery({
    queryKey: [type, username],
    queryFn: async () => {
      // Endpoint: /api/users/{username}/followers atau /api/users/{username}/following
      // Jika username 'me' (dari link profile sendiri), API mungkin support /api/me/followers
      // Tapi code di Profile.tsx menggunakan param username untuk me juga (jika di-set).
      
      const endpoint = username === 'me' 
        ? `/api/me/${type}` 
        : `/api/users/${username}/${type}`;

      [cite_start]const res = await api.get(`${endpoint}?limit=50`); // [cite: 588, 601]
      return res.data.data.users;
    }
  });

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 capitalize">
        {username === 'me' ? 'My' : username} {type}
      </h1>
      <div className="space-y-4">
        {data?.length === 0 && <p className="text-gray-500">Belum ada user.</p>}
        {data?.map((user: any) => (
          <Link key={user.id} to={`/users/${user.username}`} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
             <img 
               src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username}`} 
               className="w-12 h-12 rounded-full bg-gray-200 object-cover" 
             />
             <div>
               <p className="font-bold">{user.username}</p>
               <p className="text-sm text-gray-500">{user.name}</p>
             </div>
             {/* Tombol follow/unfollow bisa ditambahkan disini jika ingin lebih lengkap */}
          </Link>
        ))}
      </div>
    </div>
  );
}