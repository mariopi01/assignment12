
// import { useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector, useDispatch } from 'react-redux';
// import { Grid, Heart, Bookmark, LogOut } from 'lucide-react';
// import api from '../lib/axios';
// import EditProfileModal from '../components/EditProfileModal';
// import { logout } from '../store/authSlice';
// // Fix 1: Menggunakan type-only import untuk RootState
// import type { RootState } from '../store';

// // Fix 4: Update ProfileData agar kompatibel dengan tipe 'User' di EditProfileModal (punya id & email)
// interface ProfileData {
//   id: number;
//   username: string;
//   email: string; // Wajib ada untuk tipe User, kita default-kan kosong untuk publik
//   name: string;
//   avatarUrl: string | null;
//   bio: string | null;
//   isFollowedByMe: boolean;
//   stats: {
//     posts: number;
//     followers: number;
//     following: number;
//   };
// }

// // Fix 3: Interface untuk Post item di Grid agar tidak 'any'
// interface PostGridItem {
//   id: number;
//   imageUrl: string;
//   likeCount: number;
//   commentCount: number;
// }

// export default function Profile() {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
  
//   const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'saved'>('posts');
//   const [isEditModalOpen, setEditModalOpen] = useState(false);

//   const { user: authUser } = useSelector((state: RootState) => state.auth);
//   const isMe = !username || (authUser && username === authUser.username);

//   // 1. Fetch Profile Data
//   const { data: profile, isLoading: isLoadingProfile } = useQuery<ProfileData>({
//     queryKey: ['profile', username || 'me'],
//     queryFn: async () => {
//       const endpoint = isMe ? '/api/me' : `/api/users/${username}`;
//       const res = await api.get(endpoint);
      
//       let finalData;
//       if (isMe) {
//         finalData = {
//           ...res.data.data.profile,
//           stats: res.data.data.stats
//         };
//       } else {
//         // Normalisasi data user publik agar sesuai interface ProfileData
//         finalData = {
//           ...res.data.data,
//           // Publik API mungkin tidak return email/id/stats lengkap, kita beri nilai default aman
//           email: '', 
//           id: res.data.data.id || 0,
//           stats: res.data.data.stats || { posts: 0, followers: 0, following: 0 }
//         };
//       }
//       return finalData as ProfileData;
//     },
//     enabled: isMe || !!username, 
//   });

//   // 2. Fetch Posts Grid
//   const { data: postsData, isLoading: isLoadingPosts } = useQuery({
//     queryKey: ['profile-posts', username || 'me', activeTab],
//     queryFn: async () => {
//       if (!profile?.username && !isMe) return [];
      
//       const targetUser = isMe ? authUser?.username : username;
      
//       let endpoint = '';
//       if (activeTab === 'posts') {
//         endpoint = `/api/users/${targetUser}/posts`;
//       } else if (activeTab === 'likes') {
//         endpoint = isMe ? '/api/me/likes' : `/api/users/${targetUser}/likes`;
//       } else if (activeTab === 'saved') {
//         endpoint = '/api/me/saved';
//       }

//       const res = await api.get(endpoint + '?limit=20');
//       // Pastikan return array
//       return (res.data.data.items || res.data.data.posts || []) as PostGridItem[];
//     },
//     enabled: !!profile, 
//   });

//   // 3. Follow/Unfollow Logic
//   const followMutation = useMutation({
//     mutationFn: async () => {
//       // Fix 2: Guard clause untuk memastikan profile tidak undefined
//       if (!profile) return;

//       if (profile.isFollowedByMe) {
//         return api.delete(`/api/follow/${profile.username}`);
//       } else {
//         return api.post(`/api/follow/${profile.username}`);
//       }
//     },
//     onMutate: async () => {
//       if (!profile) return;
//       await queryClient.cancelQueries({ queryKey: ['profile', username] });
//       const previousProfile = queryClient.getQueryData(['profile', username]);

//       queryClient.setQueryData(['profile', username], (old: ProfileData | undefined) => {
//         if (!old) return old;
//         return {
//           ...old,
//           isFollowedByMe: !old.isFollowedByMe,
//           stats: {
//             ...old.stats,
//             followers: old.isFollowedByMe 
//               ? old.stats.followers - 1 
//               : old.stats.followers + 1
//           }
//         };
//       });

//       return { previousProfile };
//     },
//     onError: (_err, _new, context) => {
//       queryClient.setQueryData(['profile', username], context?.previousProfile);
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ['profile', username] });
//     }
//   });

//   if (isLoadingProfile) return <div className="p-10 text-center">Loading Profile...</div>;
//   if (!profile) return <div className="p-10 text-center">User not found.</div>;

//   return (
//     <div className="pb-20 md:pb-0 min-h-screen bg-white">
//       <div className="px-6 pt-8 pb-4">
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
//           <div className="shrink-0">
//             <img 
//               src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username}&background=random`} 
//               alt={profile.username} 
//               className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
//             />
//           </div>

//           <div className="flex-1 text-center md:text-left w-full">
//             <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
//               <h1 className="text-2xl font-light">{profile.username}</h1>
              
//               <div className="flex gap-2">
//                 {isMe ? (
//                   <>
//                     <button 
//                       onClick={() => setEditModalOpen(true)}
//                       className="px-4 py-1.5 bg-gray-100 font-semibold rounded-lg text-sm hover:bg-gray-200"
//                     >
//                       Edit Profile
//                     </button>
//                     <button 
//                       onClick={() => { dispatch(logout()); navigate('/login'); }}
//                       className="p-1.5 text-gray-600 hover:text-red-500"
//                       title="Logout"
//                     >
//                       <LogOut size={20} />
//                     </button>
//                   </>
//                 ) : (
//                   <button 
//                     onClick={() => followMutation.mutate()}
//                     disabled={followMutation.isPending}
//                     className={`px-6 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
//                       profile.isFollowedByMe
//                         ? 'bg-gray-200 text-black hover:bg-red-50'
//                         : 'bg-blue-600 text-white hover:bg-blue-700'
//                     }`}
//                   >
//                     {profile.isFollowedByMe ? 'Following' : 'Follow'}
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-center md:justify-start gap-8 mb-4 text-sm md:text-base">
//               <div className="text-center md:text-left">
//                 <span className="font-bold block md:inline md:mr-1">{profile.stats?.posts || 0}</span>
//                 <span className="text-gray-600">posts</span>
//               </div>
              
//               <Link to={isMe ? '/me/followers' : `/users/${profile.username}/followers`} className="text-center md:text-left hover:underline cursor-pointer group">
//                 <span className="font-bold block md:inline md:mr-1 group-hover:text-blue-600">{profile.stats?.followers || 0}</span>
//                 <span className="text-gray-600">followers</span>
//               </Link>
              
//               <Link to={isMe ? '/me/following' : `/users/${profile.username}/following`} className="text-center md:text-left hover:underline cursor-pointer group">
//                 <span className="font-bold block md:inline md:mr-1 group-hover:text-blue-600">{profile.stats?.following || 0}</span>
//                 <span className="text-gray-600">following</span>
//               </Link>
//             </div>

//             <div className="text-sm leading-tight">
//               <div className="font-bold">{profile.name}</div>
//               <div className="whitespace-pre-wrap text-gray-700 mt-1">{profile.bio}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-b mt-6 flex justify-around">
//         <button 
//           onClick={() => setActiveTab('posts')}
//           className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
//             activeTab === 'posts' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
//           }`}
//         >
//           <Grid size={16} /> Posts
//         </button>
        
//         <button 
//           onClick={() => setActiveTab('likes')}
//           className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
//             activeTab === 'likes' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
//           }`}
//         >
//           <Heart size={16} /> Likes
//         </button>

//         {isMe && (
//           <button 
//             onClick={() => setActiveTab('saved')}
//             className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
//               activeTab === 'saved' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
//             }`}
//           >
//             <Bookmark size={16} /> Saved
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-3 gap-1 md:gap-6 md:p-6">
//         {isLoadingPosts ? (
//           [...Array(6)].map((_, i) => (
//             <div key={i} className="aspect-square bg-gray-200 animate-pulse md:rounded-lg" />
//           ))
//         ) : postsData && postsData.length > 0 ? (
//           // Fix 3: Mapping dengan tipe PostGridItem agar tidak any
//           postsData.map((post: PostGridItem) => (
//             <div 
//               key={post.id} 
//               onClick={() => navigate(`/posts/${post.id}`)}
//               className="group relative aspect-square bg-gray-100 cursor-pointer overflow-hidden md:rounded-lg"
//             >
//               <img 
//                 src={post.imageUrl} 
//                 alt="Post" 
//                 className="w-full h-full object-cover"
//               />
//               <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity justify-center items-center gap-6 text-white font-bold">
//                  <div className="flex items-center gap-2">
//                    <Heart className="fill-white" size={24} /> {post.likeCount}
//                  </div>
//                  <div className="flex items-center gap-2">
//                    <Bookmark className="fill-white" size={24} /> {post.commentCount}
//                  </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-3 py-20 text-center text-gray-500">
//             <h3 className="text-xl font-bold">Belum ada Postingan</h3>
//           </div>
//         )}
//       </div>

//       {isEditModalOpen && profile && (
//         <EditProfileModal user={profile} onClose={() => setEditModalOpen(false)} />
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import api from '../lib/axios';
import EditProfileModal from '../components/EditProfileModal';
import Header from '../components/Header';
import type { RootState } from '../store';

// Interface Data sesuai API Response
interface ProfileData {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string | null;
  email: string;
  phone: string;
  counts: {
    post: number;
    followers: number;
    following: number;
    likes: number;
  };
  isFollowing: boolean;
  isMe: boolean;
}

interface PostGridItem {
  id: number;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
}

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  
  // State Lokal
  const [activeTab, setActiveTab] = useState<'gallery' | 'saved'>('gallery');
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  // Auth State (untuk fallback cek isMe jika API belum ready)
  const { user: authUser } = useSelector((state: RootState) => state.auth);

  // 1. FETCH PROFILE DATA
  const { data: profile, isLoading: isLoadingProfile } = useQuery<ProfileData>({
    queryKey: ['profile', username || 'me'],
    queryFn: async () => {
      // Jika tidak ada username di URL, gunakan endpoint /me, jika ada gunakan /users/:username
      // (Sesuai CURL di prompt, kita pakai /users/:username jika tersedia)
      const targetUsername = username || authUser?.username;
      if (!targetUsername) throw new Error("No username");

      const res = await api.get(`/api/users/${targetUsername}`);
      return res.data.data;
    },
    enabled: !!(username || authUser?.username),
  });

  // 2. FETCH POSTS / SAVED (Grid)
  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['profile-posts', profile?.username, activeTab],
    queryFn: async () => {
      if (!profile?.username) return [];
      
      let endpoint = '';
      if (activeTab === 'gallery') {
        endpoint = `/api/users/${profile.username}/posts`;
      } else {
        // Tab Saved (Hanya bisa diakses owner)
        endpoint = '/api/me/saved';
      }

      try {
        const res = await api.get(endpoint + '?limit=20');
        // Handle struktur response yang mungkin berbeda (items vs posts)
        return (res.data.data.items || res.data.data.posts || []) as PostGridItem[];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        return [];
      }
    },
    enabled: !!profile, 
  });

  if (isLoadingProfile) return <div className="min-h-screen bg-[#242424] text-white p-10 text-center">Loading Profile...</div>;
  if (!profile) return <div className="min-h-screen bg-[#242424] text-white p-10 text-center">User not found.</div>;

  // Cek apakah ini profil sendiri (dari API atau Auth state)
  const isMe = profile.isMe || (authUser?.username === profile.username);

  return (
    <div className="min-h-screen bg-[#000000] pb-20">
      <Header />

      {/* CONTAINER UTAMA */}
      <div 
        className="relative flex flex-col mx-auto"
        style={{
            width: '100%',
            maxWidth: '812px',
            marginTop: '40px', // top 120px - header 80px
            gap: '16px'
        }}
      >
        {/* BARIS 1: Avatar + Info & Buttons */}
        <div className="flex justify-between items-start px-4 md:px-0">
            {/* Kiri: Avatar + Nama */}
            <div className="flex items-center gap-4">
                <img 
                    src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username}&background=random`} 
                    alt={profile.username} 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-[#181D27]"
                />
                <div className="flex flex-col">
                    <h1 className="text-[#FDFDFD] font-bold text-2xl md:text-3xl">
                        {profile.name}
                    </h1>
                    <p className="text-[#A4A7AE] text-base">@{profile.username}</p>
                </div>
            </div>

            {/* Kanan: Edit Profile & Share (Hanya jika isMe) */}
            {isMe && (
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setEditModalOpen(true)}
                        className="w-[130px] h-12 rounded-full border border-[#181D27] text-white font-bold text-sm hover:bg-[#181D27] transition-colors"
                    >
                        Edit Profile
                    </button>
                    <button className="w-12 h-12 rounded-full border border-[#181D27] flex items-center justify-center hover:bg-[#181D27] transition-colors">
                        <img src="/Share_icon.png" alt="Share" className="w-6 h-6 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </button>
                </div>
            )}
        </div>

        {/* BARIS 2: Bio */}
        <div className="px-4 md:px-0">
            <p className="text-[#FDFDFD] text-md font-normal leading-6 tracking-tight whitespace-pre-wrap">
                {profile.bio || "No bio yet."}
            </p>
        </div>

        {/* BARIS 3: Stats */}
        <div className="flex items-center gap-8 px-4 md:px-0 text-[#FDFDFD]">
            <div className="flex items-center gap-1">
                <span className="font-bold">{profile.counts?.post || 0}</span>
                <span className="text-[#A4A7AE]">post</span>
            </div>
            <Link to={`/users/${profile.username}/followers`} className="flex items-center gap-1 hover:underline">
                <span className="font-bold">{profile.counts?.followers || 0}</span>
                <span className="text-[#A4A7AE]">followers</span>
            </Link>
            <Link to={`/users/${profile.username}/following`} className="flex items-center gap-1 hover:underline">
                <span className="font-bold">{profile.counts?.following || 0}</span>
                <span className="text-[#A4A7AE]">following</span>
            </Link>
            <div className="flex items-center gap-1">
                <span className="font-bold">{profile.counts?.likes || 0}</span>
                <span className="text-[#A4A7AE]">likes</span>
            </div>
        </div>

        {/* BARIS 4: Tabs (Gallery | Saved) */}
        <div className="flex items-center gap-8 mt-4 px-4 md:px-0 border-b border-[#181D27]">
            <button 
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 pb-4 transition-colors ${
                    activeTab === 'gallery' 
                    ? 'border-b-2 border-[#FDFDFD] text-[#FDFDFD]' 
                    : 'text-[#A4A7AE] hover:text-[#FDFDFD]'
                }`}
            >
                <img 
                    src="/Gallery_icon.png" 
                    alt="Gallery" 
                    className={`w-5 h-5 ${activeTab === 'gallery' ? 'opacity-100' : 'opacity-50'}`} 
                />
                <span className="font-bold text-md">Gallery</span>
            </button>

            {isMe && (
                <button 
                    onClick={() => setActiveTab('saved')}
                    className={`flex items-center gap-2 pb-4 transition-colors ${
                        activeTab === 'saved' 
                        ? 'border-b-2 border-[#FDFDFD] text-[#FDFDFD]' 
                        : 'text-[#A4A7AE] hover:text-[#FDFDFD]'
                    }`}
                >
                    <img 
                        src="/Save_icon.png" 
                        alt="Saved" 
                        className={`w-5 h-5 ${activeTab === 'saved' ? 'opacity-100' : 'opacity-50'}`} 
                    />
                    <span className="font-bold text-md">Saved</span>
                </button>
            )}
        </div>

        {/* BARIS 5: Grid Content / Empty State */}
        <div className="min-h-[300px] w-full px-4 md:px-0">
            {isLoadingPosts ? (
                <div className="text-center text-[#A4A7AE] py-10">Loading posts...</div>
            ) : postsData && postsData.length > 0 ? (
                // GRID 3 KOLOM
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                    {postsData.map((post: PostGridItem) => (
                        <div 
                            key={post.id} 
                            className="aspect-square bg-[#0A0D12] cursor-pointer overflow-hidden rounded-md relative group"
                            onClick={() => navigate(`/posts/${post.id}`)}
                        >
                            <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold gap-4">
                                <span>❤️ {post.likeCount}</span>
                                <span>💬 {post.commentCount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // EMPTY STATE (Tengah Layar)
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                    <h3 className="text-[#FDFDFD] font-bold text-lg tracking-tight">
                        Your story starts here
                    </h3>
                    <p className="text-[#A4A7AE] text-md max-w-[400px] leading-6">
                        Share your first post and let the world see your moments, passions, and memories. Make this space truly yours.
                    </p>
                    {isMe && (
                        <button 
                            onClick={() => navigate('/create')}
                            className="w-[259px] h-12 rounded-full bg-[#6936F2] text-white font-bold text-md hover:bg-[#5b2ed1] transition-colors mt-4"
                        >
                            Upload My First Post
                        </button>
                    )}
                </div>
            )}
        </div>

      </div>

      {/* Edit Profile Modal (Jika ada) */}
      {isEditModalOpen && (
        <EditProfileModal user={profile} onClose={() => setEditModalOpen(false)} />
      )}
    </div>
  );
}