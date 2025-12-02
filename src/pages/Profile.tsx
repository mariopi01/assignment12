// // // // import { useParams } from 'react-router-dom';
// // // // import { useQuery } from '@tanstack/react-query';
// // // // import api from '../lib/axios';
// // // // import { useSelector } from 'react-redux';
// // // // import PostCard from '../components/PostCard'; // Bisa dimodifikasi jadi versi Grid kecil

// // // // export default function Profile() {
// // // //   const { username } = useParams(); // Jika null, berarti akses '/me'
// // // //   const { user: authUser } = useSelector((state: any) => state.auth);

// // // //   // 1. Fetch Profile Data
// // // //   const { data: profileData, isLoading } = useQuery({
// // // //     queryKey: ['profile', username || 'me'],
// // // //     queryFn: async () => {
// // // //       // Jika ada param username, panggil api user public, jika tidak panggil api me
// // // //       const endpoint = username ? `/api/users/${username}` : '/api/me';
// // // //       const res = await api.get(endpoint);
// // // //       // Struktur respons '/me' ada di dalam data.data.profile, '/users' langsung di data.data
// // // //       return username ? res.data.data : res.data.data.profile; 
// // // //     },
// // // //   });

// // // //   // 2. Fetch User Stats (Khusus /me return object stats terpisah, users public mungkin perlu logic lain)
// // // //   // Untuk simplifikasi, kita asumsikan object profileData sudah membawa stats atau kita fetch terpisah.
// // // //   // Berdasarkan doc[cite: 121], endpoint /me mengembalikan object "stats".

// // // //   // 3. Fetch Posts User
// // // //   const targetUsername = username || authUser?.username;
// // // //   const { data: postsData } = useQuery({
// // // //     queryKey: ['posts', targetUsername],
// // // //     queryFn: async () => {
// // // //       if (!targetUsername) return { items: [] };
// // // //       // [cite: 212] GET /api/users/{username}/posts
// // // //       const res = await api.get(`/api/users/${targetUsername}/posts?limit=20`);
// // // //       return res.data.data; // array posts biasanya
// // // //     },
// // // //     enabled: !!targetUsername,
// // // //   });

// // // //   if (isLoading) return <div className="p-8 text-center">Loading Profile...</div>;

// // // //   const user = profileData; 

// // // //   return (
// // // //     <div className="pb-20 md:pb-0">
// // // //       {/* Header Profile */}
// // // //       <div className="bg-white p-6 mb-2 border-b">
// // // //         <div className="flex flex-col items-center">
// // // //           <img 
// // // //             src={user?.avatarUrl || "https://via.placeholder.com/100"} 
// // // //             alt={user?.username} 
// // // //             className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-100"
// // // //           />
// // // //           <h1 className="text-xl font-bold">{user?.name}</h1>
// // // //           <p className="text-gray-500">@{user?.username}</p>
// // // //           <p className="mt-2 text-center text-sm">{user?.bio || "Belum ada bio."}</p>

// // // //           {/* Stats Bar (Mockup based on [cite: 121]) */}
// // // //           <div className="flex gap-6 mt-6 text-center">
// // // //             <div><span className="font-bold block">0</span> Posts</div>
// // // //             <div><span className="font-bold block">0</span> Followers</div>
// // // //             <div><span className="font-bold block">0</span> Following</div>
// // // //           </div>

// // // //           {/* Action Button */}
// // // //           <div className="mt-6 w-full flex justify-center">
// // // //             {username && username !== authUser?.username ? (
// // // //                <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold">
// // // //                  Follow
// // // //                </button>
// // // //             ) : (
// // // //                <button className="border border-gray-300 px-6 py-2 rounded-full font-semibold">
// // // //                  Edit Profile
// // // //                </button>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Tabs */}
// // // //       <div className="flex border-b bg-white sticky top-0 z-10">
// // // //         <button className="flex-1 py-3 font-semibold border-b-2 border-black">Posts</button>
// // // //         <button className="flex-1 py-3 text-gray-500">Likes</button>
// // // //         {!username && <button className="flex-1 py-3 text-gray-500">Saved</button>} 
// // // //       </div>

// // // //       {/* Posts Grid */}
// // // //       <div className="grid grid-cols-3 gap-1 md:gap-4 p-1 md:p-4">
// // // //         {postsData?.items?.map((post: any) => (
// // // //            <div key={post.id} className="aspect-square bg-gray-200 relative group cursor-pointer">
// // // //               <img src={post.imageUrl} className="w-full h-full object-cover" />
// // // //               {/* Hover Overlay for Desktop */}
// // // //               <div className="hidden group-hover:flex absolute inset-0 bg-black/30 items-center justify-center text-white font-bold">
// // // //                  {post.likeCount} Likes
// // // //               </div>
// // // //            </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState } from 'react';
// // // import { useParams, useNavigate } from 'react-router-dom';
// // // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // // import { useSelector } from 'react-redux';
// // // import { Settings, Grid, Heart, Bookmark, LogOut } from 'lucide-react';
// // // import api from '../lib/axios';
// // // import EditProfileModal from '../components/EditProfileModal'; // Pastikan component ini ada
// // // import { useDispatch } from 'react-redux';
// // // import { logout } from '../store/authSlice';

// // // export default function Profile() {
// // //   const { username } = useParams();
// // //   const navigate = useNavigate();
// // //   const dispatch = useDispatch();
// // //   const queryClient = useQueryClient();
  
// // //   // State Lokal
// // //   const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'saved'>('posts');
// // //   const [isEditModalOpen, setEditModalOpen] = useState(false);

// // //   // Ambil data user yang sedang login dari Redux
// // //   const { user: authUser } = useSelector((state: any) => state.auth);

// // //   // Tentukan apakah kita sedang melihat profil sendiri
// // //   // Kondisi: URL tidak ada username ATAU username di URL sama dengan username login
// // //   const isMe = !username || (authUser && username === authUser.username);

// // //   // -------------------------------------------------------------------------
// // //   // 1. FETCH PROFILE DATA
// // //   // -------------------------------------------------------------------------
// // //   const { data: profile, isLoading: isLoadingProfile } = useQuery({
// // //     queryKey: ['profile', username || 'me'],
// // //     queryFn: async () => {
// // //       const endpoint = isMe ? '/api/me' : `/api/users/${username}`;
// // //       const res = await api.get(endpoint);
      
// // //       // Normalisasi data karena struktur response /me dan /users/{id} mungkin sedikit beda
// // //       // Di doc: /api/me returns { data: { profile: ..., stats: ... } }
// // //       // Asumsi /api/users/{username} returns { data: { ...user info..., stats: ... } }
// // //       if (isMe) {
// // //         return {
// // //           ...res.data.data.profile,
// // //           stats: res.data.data.stats
// // //         };
// // //       } else {
// // //         return res.data.data;
// // //       }
// // //     },
// // //     // Jangan fetch jika username di URL belum ready
// // //     enabled: isMe || !!username, 
// // //   });

// // //   // -------------------------------------------------------------------------
// // //   // 2. FETCH POSTS (Grid)
// // //   // -------------------------------------------------------------------------
// // //   // Tentukan endpoint berdasarkan tab aktif
// // //   let postsEndpoint = '';
// // //   if (isMe) {
// // //     if (activeTab === 'posts') postsEndpoint = `/api/users/${authUser?.username}/posts`; 
// // //     // Catatan: Doc tidak sebut /api/me/posts secara eksplisit, biasanya pakai user endpoint
// // //     // Tapi jika backend support, bisa sesuaikan. Kita pakai logic aman: get by username.
// // //     else if (activeTab === 'likes') postsEndpoint = '/api/me/likes';
// // //     else if (activeTab === 'saved') postsEndpoint = '/api/me/saved';
// // //   } else {
// // //     // Profil Orang Lain
// // //     if (activeTab === 'posts') postsEndpoint = `/api/users/${username}/posts`;
// // //     else if (activeTab === 'likes') postsEndpoint = `/api/users/${username}/likes`;
// // //     // Orang lain tidak bisa lihat tab 'saved'
// // //   }

// // //   const { data: postsData, isLoading: isLoadingPosts } = useQuery({
// // //     queryKey: ['profile-posts', username || 'me', activeTab],
// // //     queryFn: async () => {
// // //       if (!profile?.username && !isMe) return { items: [] };
// // //       // Pastikan username profile sudah terload untuk endpoint yang butuh username
      
// // //       // Jika tab posts dan kita tahu username target (baik me atau orang lain)
// // //       const targetUser = isMe ? authUser?.username : username;
      
// // //       // Override endpoint logic sedikit untuk memastikan username terisi
// // //       let finalEndpoint = postsEndpoint;
// // //       if (activeTab === 'posts') finalEndpoint = `/api/users/${targetUser}/posts`;

// // //       const res = await api.get(finalEndpoint + '?limit=20'); // Pagination limit
      
// // //       // Struktur response list biasanya { data: { items: [], pagination: {} } } atau { data: { posts: [] } }
// // //       // Sesuaikan dengan response API. Doc source 451: /me/likes return { posts: [] }
// // //       return res.data.data.items || res.data.data.posts || [];
// // //     },
// // //     enabled: !!profile, // Tunggu profil loaded
// // //   });

// // //   // -------------------------------------------------------------------------
// // //   // 3. FOLLOW / UNFOLLOW LOGIC
// // //   // -------------------------------------------------------------------------
// // //   const followMutation = useMutation({
// // //     mutationFn: async () => {
// // //       if (profile.isFollowedByMe) {
// // //         [cite_start]return api.delete(`/api/follow/${profile.username}`); // [cite: 572]
// // //       } else {
// // //         return api.post(`/api/follow/${profile.username}`); [cite_start]// [cite: 555]
// // //       }
// // //     },
// // //     onMutate: async () => {
// // //       // Optimistic Update
// // //       await queryClient.cancelQueries({ queryKey: ['profile', username] });
// // //       const previousProfile = queryClient.getQueryData(['profile', username]);

// // //       queryClient.setQueryData(['profile', username], (old: any) => ({
// // //         ...old,
// // //         isFollowedByMe: !old.isFollowedByMe,
// // //         stats: {
// // //           ...old.stats,
// // //           followers: old.isFollowedByMe 
// // //             ? old.stats.followers - 1 
// // //             : old.stats.followers + 1
// // //         }
// // //       }));

// // //       return { previousProfile };
// // //     },
// // //     onError: (_err, _new, context) => {
// // //       queryClient.setQueryData(['profile', username], context?.previousProfile);
// // //     },
// // //     onSettled: () => {
// // //       queryClient.invalidateQueries({ queryKey: ['profile', username] });
// // //     }
// // //   });

// // //   // -------------------------------------------------------------------------
// // //   // RENDER UI
// // //   // -------------------------------------------------------------------------
// // //   if (isLoadingProfile) return <div className="p-10 text-center">Loading Profile...</div>;
// // //   if (!profile) return <div className="p-10 text-center">User not found.</div>;

// // //   return (
// // //     <div className="pb-20 md:pb-0 min-h-screen bg-white">
// // //       {/* 1. HEADER PROFILE */}
// // //       <div className="px-6 pt-8 pb-4">
// // //         <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
// // //           {/* Avatar */}
// // //           <div className="shrink-0">
// // //             <img 
// // //               src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username}&background=random`} 
// // //               alt={profile.username} 
// // //               className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
// // //             />
// // //           </div>

// // //           {/* Info & Stats */}
// // //           <div className="flex-1 text-center md:text-left w-full">
// // //             <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
// // //               <h1 className="text-2xl font-light">{profile.username}</h1>
              
// // //               {/* Action Buttons */}
// // //               <div className="flex gap-2">
// // //                 {isMe ? (
// // //                   <>
// // //                     <button 
// // //                       onClick={() => setEditModalOpen(true)}
// // //                       className="px-4 py-1.5 bg-gray-100 font-semibold rounded-lg text-sm hover:bg-gray-200"
// // //                     >
// // //                       Edit Profile
// // //                     </button>
// // //                     <button 
// // //                       onClick={() => { dispatch(logout()); navigate('/login'); }}
// // //                       className="p-1.5 text-gray-600 hover:text-red-500"
// // //                       title="Logout"
// // //                     >
// // //                       <LogOut size={20} />
// // //                     </button>
// // //                   </>
// // //                 ) : (
// // //                   <button 
// // //                     onClick={() => followMutation.mutate()}
// // //                     disabled={followMutation.isPending}
// // //                     className={`px-6 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
// // //                       profile.isFollowedByMe
// // //                         ? 'bg-gray-200 text-black hover:bg-red-50'
// // //                         : 'bg-blue-600 text-white hover:bg-blue-700'
// // //                     }`}
// // //                   >
// // //                     {profile.isFollowedByMe ? 'Following' : 'Follow'}
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Stats Row */}
// // //             <div className="flex justify-center md:justify-start gap-8 mb-4 text-sm md:text-base">
// // //               <div className="text-center md:text-left">
// // //                 <span className="font-bold block md:inline md:mr-1">{profile.stats?.posts || 0}</span>
// // //                 <span className="text-gray-600">posts</span>
// // //               </div>
// // //               <div className="text-center md:text-left">
// // //                 <span className="font-bold block md:inline md:mr-1">{profile.stats?.followers || 0}</span>
// // //                 <span className="text-gray-600">followers</span>
// // //               </div>
// // //               <div className="text-center md:text-left">
// // //                 <span className="font-bold block md:inline md:mr-1">{profile.stats?.following || 0}</span>
// // //                 <span className="text-gray-600">following</span>
// // //               </div>
// // //             </div>

// // //             {/* Bio & Fullname */}
// // //             <div className="text-sm leading-tight">
// // //               <div className="font-bold">{profile.name}</div>
// // //               <div className="whitespace-pre-wrap text-gray-700 mt-1">{profile.bio}</div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* 2. TAB NAVIGATION */}
// // //       <div className="border-t border-b mt-6 flex justify-around">
// // //         <button 
// // //           onClick={() => setActiveTab('posts')}
// // //           className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
// // //             activeTab === 'posts' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
// // //           }`}
// // //         >
// // //           <Grid size={16} /> Posts
// // //         </button>
        
// // //         <button 
// // //           onClick={() => setActiveTab('likes')}
// // //           className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
// // //             activeTab === 'likes' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
// // //           }`}
// // //         >
// // //           <Heart size={16} /> Likes
// // //         </button>

// // //         {isMe && (
// // //           <button 
// // //             onClick={() => setActiveTab('saved')}
// // //             className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
// // //               activeTab === 'saved' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
// // //             }`}
// // //           >
// // //             <Bookmark size={16} /> Saved
// // //           </button>
// // //         )}
// // //       </div>

// // //       {/* 3. POST GRID */}
// // //       <div className="grid grid-cols-3 gap-1 md:gap-6 md:p-6">
// // //         {isLoadingPosts ? (
// // //           // Skeleton Loading Sederhana
// // //           [...Array(6)].map((_, i) => (
// // //             <div key={i} className="aspect-square bg-gray-200 animate-pulse md:rounded-lg" />
// // //           ))
// // //         ) : postsData?.length > 0 ? (
// // //           postsData.map((post: any) => (
// // //             <div 
// // //               key={post.id} 
// // //               onClick={() => navigate(`/posts/${post.id}`)}
// // //               className="group relative aspect-square bg-gray-100 cursor-pointer overflow-hidden md:rounded-lg"
// // //             >
// // //               <img 
// // //                 src={post.imageUrl} 
// // //                 alt="Post" 
// // //                 className="w-full h-full object-cover"
// // //               />
// // //               {/* Overlay Hover (Desktop) */}
// // //               <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity justify-center items-center gap-6 text-white font-bold">
// // //                  <div className="flex items-center gap-2">
// // //                    <Heart className="fill-white" size={24} /> {post.likeCount}
// // //                  </div>
// // //                  <div className="flex items-center gap-2">
// // //                    <Bookmark className="fill-white" size={24} /> {post.commentCount}
// // //                  </div>
// // //               </div>
// // //             </div>
// // //           ))
// // //         ) : (
// // //           <div className="col-span-3 py-20 text-center text-gray-500">
// // //             <div className="flex justify-center mb-4">
// // //               <div className="p-4 rounded-full border-2 border-black">
// // //                  {activeTab === 'posts' && <Grid size={32} />}
// // //                  {activeTab === 'likes' && <Heart size={32} />}
// // //                  {activeTab === 'saved' && <Bookmark size={32} />}
// // //               </div>
// // //             </div>
// // //             <h3 className="text-xl font-bold">
// // //               {activeTab === 'posts' ? 'Belum ada Postingan' : 
// // //                activeTab === 'likes' ? 'Belum ada Like' : 'Belum ada yang Disimpan'}
// // //             </h3>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Edit Profile Modal */}
// // //       {isEditModalOpen && (
// // //         <EditProfileModal user={profile} onClose={() => setEditModalOpen(false)} />
// // //       )}
// // //     </div>
// // //   );
// // // }


// // import { useState } from 'react';
// // import { useParams, useNavigate, Link } from 'react-router-dom';
// // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { Settings, Grid, Heart, Bookmark, LogOut } from 'lucide-react';
// // import api from '../lib/axios';
// // import EditProfileModal from '../components/EditProfileModal';
// // import { logout } from '../store/authSlice';

// // export default function Profile() {
// //   const { username } = useParams();
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const queryClient = useQueryClient();
  
// //   // State Lokal
// //   const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'saved'>('posts');
// //   const [isEditModalOpen, setEditModalOpen] = useState(false);

// //   // Ambil data user yang sedang login dari Redux
// //   const { user: authUser } = useSelector((state: any) => state.auth);

// //   // Tentukan apakah kita sedang melihat profil sendiri
// //   // Kondisi: URL tidak ada username ATAU username di URL sama dengan username login
// //   const isMe = !username || (authUser && username === authUser.username);

// //   // -------------------------------------------------------------------------
// //   // 1. FETCH PROFILE DATA
// //   // -------------------------------------------------------------------------
// //   const { data: profile, isLoading: isLoadingProfile } = useQuery({
// //     queryKey: ['profile', username || 'me'],
// //     queryFn: async () => {
// //       const endpoint = isMe ? '/api/me' : `/api/users/${username}`;
// //       const res = await api.get(endpoint);
      
// //       // Normalisasi data karena struktur response /me dan /users/{id} sedikit beda
// //       if (isMe) {
// //         return {
// //           ...res.data.data.profile,
// //           stats: res.data.data.stats
// //         };
// //       } else {
// //         return res.data.data;
// //       }
// //     },
// //     // Jangan fetch jika username di URL belum ready (kecuali mode /me)
// //     enabled: isMe || !!username, 
// //   });

// //   // -------------------------------------------------------------------------
// //   // 2. FETCH POSTS (Grid)
// //   // -------------------------------------------------------------------------
// //   const { data: postsData, isLoading: isLoadingPosts } = useQuery({
// //     queryKey: ['profile-posts', username || 'me', activeTab],
// //     queryFn: async () => {
// //       if (!profile?.username && !isMe) return [];
      
// //       // Tentukan username target (baik me atau orang lain)
// //       const targetUser = isMe ? authUser?.username : username;
      
// //       let endpoint = '';
// //       if (activeTab === 'posts') {
// //         endpoint = `/api/users/${targetUser}/posts`;
// //       } else if (activeTab === 'likes') {
// //         endpoint = isMe ? '/api/me/likes' : `/api/users/${targetUser}/likes`;
// //       } else if (activeTab === 'saved') {
// //         endpoint = '/api/me/saved';
// //       }

// //       const res = await api.get(endpoint + '?limit=20'); // Pagination limit simple
      
// //       // Struktur response list bisa bervariasi: { data: { items: [] } } atau { data: { posts: [] } }
// //       return res.data.data.items || res.data.data.posts || [];
// //     },
// //     enabled: !!profile, // Tunggu profil loaded
// //   });

// //   // -------------------------------------------------------------------------
// //   // 3. FOLLOW / UNFOLLOW LOGIC
// //   // -------------------------------------------------------------------------
// //   const followMutation = useMutation({
// //     mutationFn: async () => {
// //       if (profile.isFollowedByMe) {
// //         return api.delete(`/api/follow/${profile.username}`);
// //       } else {
// //         return api.post(`/api/follow/${profile.username}`);
// //       }
// //     },
// //     onMutate: async () => {
// //       // Optimistic Update: Langsung update UI sebelum server response
// //       await queryClient.cancelQueries({ queryKey: ['profile', username] });
// //       const previousProfile = queryClient.getQueryData(['profile', username]);

// //       queryClient.setQueryData(['profile', username], (old: any) => ({
// //         ...old,
// //         isFollowedByMe: !old.isFollowedByMe,
// //         stats: {
// //           ...old.stats,
// //           followers: old.isFollowedByMe 
// //             ? old.stats.followers - 1 
// //             : old.stats.followers + 1
// //         }
// //       }));

// //       return { previousProfile };
// //     },
// //     onError: (_err, _new, context) => {
// //       // Rollback jika error
// //       queryClient.setQueryData(['profile', username], context?.previousProfile);
// //     },
// //     onSettled: () => {
// //       // Refresh data asli dari server
// //       queryClient.invalidateQueries({ queryKey: ['profile', username] });
// //     }
// //   });

// //   // -------------------------------------------------------------------------
// //   // RENDER UI
// //   // -------------------------------------------------------------------------
// //   if (isLoadingProfile) return <div className="p-10 text-center">Loading Profile...</div>;
// //   if (!profile) return <div className="p-10 text-center">User not found.</div>;

// //   return (
// //     <div className="pb-20 md:pb-0 min-h-screen bg-white">
// //       {/* 1. HEADER PROFILE */}
// //       <div className="px-6 pt-8 pb-4">
// //         <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
// //           {/* Avatar */}
// //           <div className="shrink-0">
// //             <img 
// //               src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username}&background=random`} 
// //               alt={profile.username} 
// //               className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
// //             />
// //           </div>

// //           {/* Info & Stats */}
// //           <div className="flex-1 text-center md:text-left w-full">
// //             <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
// //               <h1 className="text-2xl font-light">{profile.username}</h1>
              
// //               {/* Action Buttons */}
// //               <div className="flex gap-2">
// //                 {isMe ? (
// //                   <>
// //                     <button 
// //                       onClick={() => setEditModalOpen(true)}
// //                       className="px-4 py-1.5 bg-gray-100 font-semibold rounded-lg text-sm hover:bg-gray-200"
// //                     >
// //                       Edit Profile
// //                     </button>
// //                     <button 
// //                       onClick={() => { dispatch(logout()); navigate('/login'); }}
// //                       className="p-1.5 text-gray-600 hover:text-red-500"
// //                       title="Logout"
// //                     >
// //                       <LogOut size={20} />
// //                     </button>
// //                   </>
// //                 ) : (
// //                   <button 
// //                     onClick={() => followMutation.mutate()}
// //                     disabled={followMutation.isPending}
// //                     className={`px-6 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
// //                       profile.isFollowedByMe
// //                         ? 'bg-gray-200 text-black hover:bg-red-50'
// //                         : 'bg-blue-600 text-white hover:bg-blue-700'
// //                     }`}
// //                   >
// //                     {profile.isFollowedByMe ? 'Following' : 'Follow'}
// //                   </button>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Stats Row (Sekarang clickable) */}
// //             <div className="flex justify-center md:justify-start gap-8 mb-4 text-sm md:text-base">
// //               <div className="text-center md:text-left">
// //                 <span className="font-bold block md:inline md:mr-1">{profile.stats?.posts || 0}</span>
// //                 <span className="text-gray-600">posts</span>
// //               </div>
              
// //               <Link to={isMe ? '/me/followers' : `/users/${profile.username}/followers`} className="text-center md:text-left hover:underline cursor-pointer group">
// //                 <span className="font-bold block md:inline md:mr-1 group-hover:text-blue-600">{profile.stats?.followers || 0}</span>
// //                 <span className="text-gray-600">followers</span>
// //               </Link>
              
// //               <Link to={isMe ? '/me/following' : `/users/${profile.username}/following`} className="text-center md:text-left hover:underline cursor-pointer group">
// //                 <span className="font-bold block md:inline md:mr-1 group-hover:text-blue-600">{profile.stats?.following || 0}</span>
// //                 <span className="text-gray-600">following</span>
// //               </Link>
// //             </div>

// //             {/* Bio & Fullname */}
// //             <div className="text-sm leading-tight">
// //               <div className="font-bold">{profile.name}</div>
// //               <div className="whitespace-pre-wrap text-gray-700 mt-1">{profile.bio}</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* 2. TAB NAVIGATION */}
// //       <div className="border-t border-b mt-6 flex justify-around">
// //         <button 
// //           onClick={() => setActiveTab('posts')}
// //           className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
// //             activeTab === 'posts' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
// //           }`}
// //         >
// //           <Grid size={16} /> Posts
// //         </button>
        
// //         <button 
// //           onClick={() => setActiveTab('likes')}
// //           className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
// //             activeTab === 'likes' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
// //           }`}
// //         >
// //           <Heart size={16} /> Likes
// //         </button>

// //         {isMe && (
// //           <button 
// //             onClick={() => setActiveTab('saved')}
// //             className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
// //               activeTab === 'saved' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
// //             }`}
// //           >
// //             <Bookmark size={16} /> Saved
// //           </button>
// //         )}
// //       </div>

// //       {/* 3. POST GRID */}
// //       <div className="grid grid-cols-3 gap-1 md:gap-6 md:p-6">
// //         {isLoadingPosts ? (
// //           // Skeleton Loading Sederhana
// //           [...Array(6)].map((_, i) => (
// //             <div key={i} className="aspect-square bg-gray-200 animate-pulse md:rounded-lg" />
// //           ))
// //         ) : postsData?.length > 0 ? (
// //           postsData.map((post: any) => (
// //             <div 
// //               key={post.id} 
// //               onClick={() => navigate(`/posts/${post.id}`)}
// //               className="group relative aspect-square bg-gray-100 cursor-pointer overflow-hidden md:rounded-lg"
// //             >
// //               <img 
// //                 src={post.imageUrl} 
// //                 alt="Post" 
// //                 className="w-full h-full object-cover"
// //               />
// //               {/* Overlay Hover (Desktop) */}
// //               <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity justify-center items-center gap-6 text-white font-bold">
// //                  <div className="flex items-center gap-2">
// //                    <Heart className="fill-white" size={24} /> {post.likeCount}
// //                  </div>
// //                  <div className="flex items-center gap-2">
// //                    <Bookmark className="fill-white" size={24} /> {post.commentCount}
// //                  </div>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="col-span-3 py-20 text-center text-gray-500">
// //             <div className="flex justify-center mb-4">
// //               <div className="p-4 rounded-full border-2 border-black">
// //                  {activeTab === 'posts' && <Grid size={32} />}
// //                  {activeTab === 'likes' && <Heart size={32} />}
// //                  {activeTab === 'saved' && <Bookmark size={32} />}
// //               </div>
// //             </div>
// //             <h3 className="text-xl font-bold">
// //               {activeTab === 'posts' ? 'Belum ada Postingan' : 
// //                activeTab === 'likes' ? 'Belum ada Like' : 'Belum ada yang Disimpan'}
// //             </h3>
// //           </div>
// //         )}
// //       </div>

// //       {/* Edit Profile Modal */}
// //       {isEditModalOpen && (
// //         <EditProfileModal user={profile} onClose={() => setEditModalOpen(false)} />
// //       )}
// //     </div>
// //   );
// // }


// import { useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useSelector, useDispatch } from 'react-redux';
// import { Grid, Heart, Bookmark, LogOut } from 'lucide-react';
// import api from '../lib/axios';
// import EditProfileModal from '../components/EditProfileModal';
// import { logout } from '../store/authSlice';
// import { RootState } from '../store';

// // Interface untuk Profile State
// interface ProfileData {
//   username: string;
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

// export default function Profile() {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const queryClient = useQueryClient();
  
//   const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'saved'>('posts');
//   const [isEditModalOpen, setEditModalOpen] = useState(false);

//   const { user: authUser } = useSelector((state: RootState) => state.auth);
//   const isMe = !username || (authUser && username === authUser.username);

//   const { data: profile, isLoading: isLoadingProfile } = useQuery({
//     queryKey: ['profile', username || 'me'],
//     queryFn: async () => {
//       const endpoint = isMe ? '/api/me' : `/api/users/${username}`;
//       const res = await api.get(endpoint);
      
//       if (isMe) {
//         return {
//           ...res.data.data.profile,
//           stats: res.data.data.stats
//         } as ProfileData;
//       } else {
//         return res.data.data as ProfileData;
//       }
//     },
//     enabled: isMe || !!username, 
//   });

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
//       return res.data.data.items || res.data.data.posts || [];
//     },
//     enabled: !!profile, 
//   });

//   const followMutation = useMutation({
//     mutationFn: async () => {
//       if (profile?.isFollowedByMe) {
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
//         ) : postsData?.length > 0 ? (
//           postsData.map((post: any) => (
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Heart, Bookmark, LogOut } from 'lucide-react';
import api from '../lib/axios';
import EditProfileModal from '../components/EditProfileModal';
import { logout } from '../store/authSlice';
// Fix 1: Menggunakan type-only import untuk RootState
import type { RootState } from '../store';

// Fix 4: Update ProfileData agar kompatibel dengan tipe 'User' di EditProfileModal (punya id & email)
interface ProfileData {
  id: number;
  username: string;
  email: string; // Wajib ada untuk tipe User, kita default-kan kosong untuk publik
  name: string;
  avatarUrl: string | null;
  bio: string | null;
  isFollowedByMe: boolean;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

// Fix 3: Interface untuk Post item di Grid agar tidak 'any'
interface PostGridItem {
  id: number;
  imageUrl: string;
  likeCount: number;
  commentCount: number;
}

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'saved'>('posts');
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { user: authUser } = useSelector((state: RootState) => state.auth);
  const isMe = !username || (authUser && username === authUser.username);

  // 1. Fetch Profile Data
  const { data: profile, isLoading: isLoadingProfile } = useQuery<ProfileData>({
    queryKey: ['profile', username || 'me'],
    queryFn: async () => {
      const endpoint = isMe ? '/api/me' : `/api/users/${username}`;
      const res = await api.get(endpoint);
      
      let finalData;
      if (isMe) {
        finalData = {
          ...res.data.data.profile,
          stats: res.data.data.stats
        };
      } else {
        // Normalisasi data user publik agar sesuai interface ProfileData
        finalData = {
          ...res.data.data,
          // Publik API mungkin tidak return email/id/stats lengkap, kita beri nilai default aman
          email: '', 
          id: res.data.data.id || 0,
          stats: res.data.data.stats || { posts: 0, followers: 0, following: 0 }
        };
      }
      return finalData as ProfileData;
    },
    enabled: isMe || !!username, 
  });

  // 2. Fetch Posts Grid
  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['profile-posts', username || 'me', activeTab],
    queryFn: async () => {
      if (!profile?.username && !isMe) return [];
      
      const targetUser = isMe ? authUser?.username : username;
      
      let endpoint = '';
      if (activeTab === 'posts') {
        endpoint = `/api/users/${targetUser}/posts`;
      } else if (activeTab === 'likes') {
        endpoint = isMe ? '/api/me/likes' : `/api/users/${targetUser}/likes`;
      } else if (activeTab === 'saved') {
        endpoint = '/api/me/saved';
      }

      const res = await api.get(endpoint + '?limit=20');
      // Pastikan return array
      return (res.data.data.items || res.data.data.posts || []) as PostGridItem[];
    },
    enabled: !!profile, 
  });

  // 3. Follow/Unfollow Logic
  const followMutation = useMutation({
    mutationFn: async () => {
      // Fix 2: Guard clause untuk memastikan profile tidak undefined
      if (!profile) return;

      if (profile.isFollowedByMe) {
        return api.delete(`/api/follow/${profile.username}`);
      } else {
        return api.post(`/api/follow/${profile.username}`);
      }
    },
    onMutate: async () => {
      if (!profile) return;
      await queryClient.cancelQueries({ queryKey: ['profile', username] });
      const previousProfile = queryClient.getQueryData(['profile', username]);

      queryClient.setQueryData(['profile', username], (old: ProfileData | undefined) => {
        if (!old) return old;
        return {
          ...old,
          isFollowedByMe: !old.isFollowedByMe,
          stats: {
            ...old.stats,
            followers: old.isFollowedByMe 
              ? old.stats.followers - 1 
              : old.stats.followers + 1
          }
        };
      });

      return { previousProfile };
    },
    onError: (_err, _new, context) => {
      queryClient.setQueryData(['profile', username], context?.previousProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', username] });
    }
  });

  if (isLoadingProfile) return <div className="p-10 text-center">Loading Profile...</div>;
  if (!profile) return <div className="p-10 text-center">User not found.</div>;

  return (
    <div className="pb-20 md:pb-0 min-h-screen bg-white">
      <div className="px-6 pt-8 pb-4">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          <div className="shrink-0">
            <img 
              src={profile.avatarUrl || `https://ui-avatars.com/api/?name=${profile.username}&background=random`} 
              alt={profile.username} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
            />
          </div>

          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h1 className="text-2xl font-light">{profile.username}</h1>
              
              <div className="flex gap-2">
                {isMe ? (
                  <>
                    <button 
                      onClick={() => setEditModalOpen(true)}
                      className="px-4 py-1.5 bg-gray-100 font-semibold rounded-lg text-sm hover:bg-gray-200"
                    >
                      Edit Profile
                    </button>
                    <button 
                      onClick={() => { dispatch(logout()); navigate('/login'); }}
                      className="p-1.5 text-gray-600 hover:text-red-500"
                      title="Logout"
                    >
                      <LogOut size={20} />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => followMutation.mutate()}
                    disabled={followMutation.isPending}
                    className={`px-6 py-1.5 rounded-lg font-semibold text-sm transition-colors ${
                      profile.isFollowedByMe
                        ? 'bg-gray-200 text-black hover:bg-red-50'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {profile.isFollowedByMe ? 'Following' : 'Follow'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-8 mb-4 text-sm md:text-base">
              <div className="text-center md:text-left">
                <span className="font-bold block md:inline md:mr-1">{profile.stats?.posts || 0}</span>
                <span className="text-gray-600">posts</span>
              </div>
              
              <Link to={isMe ? '/me/followers' : `/users/${profile.username}/followers`} className="text-center md:text-left hover:underline cursor-pointer group">
                <span className="font-bold block md:inline md:mr-1 group-hover:text-blue-600">{profile.stats?.followers || 0}</span>
                <span className="text-gray-600">followers</span>
              </Link>
              
              <Link to={isMe ? '/me/following' : `/users/${profile.username}/following`} className="text-center md:text-left hover:underline cursor-pointer group">
                <span className="font-bold block md:inline md:mr-1 group-hover:text-blue-600">{profile.stats?.following || 0}</span>
                <span className="text-gray-600">following</span>
              </Link>
            </div>

            <div className="text-sm leading-tight">
              <div className="font-bold">{profile.name}</div>
              <div className="whitespace-pre-wrap text-gray-700 mt-1">{profile.bio}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-b mt-6 flex justify-around">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
            activeTab === 'posts' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
          }`}
        >
          <Grid size={16} /> Posts
        </button>
        
        <button 
          onClick={() => setActiveTab('likes')}
          className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
            activeTab === 'likes' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
          }`}
        >
          <Heart size={16} /> Likes
        </button>

        {isMe && (
          <button 
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 py-3 text-sm tracking-widest uppercase transition-colors ${
              activeTab === 'saved' ? 'border-t border-black text-black font-semibold -mt-px' : 'text-gray-400'
            }`}
          >
            <Bookmark size={16} /> Saved
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-1 md:gap-6 md:p-6">
        {isLoadingPosts ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 animate-pulse md:rounded-lg" />
          ))
        ) : postsData && postsData.length > 0 ? (
          // Fix 3: Mapping dengan tipe PostGridItem agar tidak any
          postsData.map((post: PostGridItem) => (
            <div 
              key={post.id} 
              onClick={() => navigate(`/posts/${post.id}`)}
              className="group relative aspect-square bg-gray-100 cursor-pointer overflow-hidden md:rounded-lg"
            >
              <img 
                src={post.imageUrl} 
                alt="Post" 
                className="w-full h-full object-cover"
              />
              <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity justify-center items-center gap-6 text-white font-bold">
                 <div className="flex items-center gap-2">
                   <Heart className="fill-white" size={24} /> {post.likeCount}
                 </div>
                 <div className="flex items-center gap-2">
                   <Bookmark className="fill-white" size={24} /> {post.commentCount}
                 </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-20 text-center text-gray-500">
            <h3 className="text-xl font-bold">Belum ada Postingan</h3>
          </div>
        )}
      </div>

      {isEditModalOpen && profile && (
        <EditProfileModal user={profile} onClose={() => setEditModalOpen(false)} />
      )}
    </div>
  );
}